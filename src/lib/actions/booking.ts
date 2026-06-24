'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { ROOMS } from '@/lib/constants';

// Production-grade validation schema
const BookingSchema = z.object({
  roomId: z.string(),
  checkIn: z.string().datetime(),
  checkOut: z.string().datetime(),
  guests: z.number().min(1).max(10),
  guestEmail: z.string().email(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  specialRequests: z.string().optional().nullable(),
  airportPickup: z.boolean(),
  flightNumber: z.string().optional().nullable(),
  earlyCheckIn: z.boolean(),
  lateCheckout: z.boolean(),
});

export type BookingState = {
  errors?: {
    roomId?: string[];
    checkIn?: string[];
    checkOut?: string[];
    guests?: string[];
    guestEmail?: string[];
    firstName?: string[];
    lastName?: string[];
    phone?: string[];
  };
  message?: string | null;
  success?: boolean;
  bookingId?: string;
};

/**
 * Enterprise-grade Booking Action
 * Handles validation, inventory checking (overlaps), and DB persistence.
 */
export async function finalizeBooking(prevState: BookingState, formData: FormData): Promise<BookingState> {
  // 1. Validate Input
  const validatedFields = BookingSchema.safeParse({
    roomId: formData.get('roomId'),
    checkIn: formData.get('checkIn'),
    checkOut: formData.get('checkOut'),
    guests: Number(formData.get('guests')),
    guestEmail: formData.get('guestEmail'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    phone: formData.get('phone'),
    specialRequests: formData.get('specialRequests'),
    airportPickup: formData.get('airportPickup') === 'true',
    flightNumber: formData.get('flightNumber'),
    earlyCheckIn: formData.get('earlyCheckIn') === 'true',
    lateCheckout: formData.get('lateCheckout') === 'true',
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid booking parameters.',
      success: false
    };
  }

  const { 
    roomId, checkIn, checkOut, guestEmail, guests, 
    firstName, lastName, phone, specialRequests, 
    airportPickup, flightNumber, earlyCheckIn, lateCheckout 
  } = validatedFields.data;
  
  const start = new Date(checkIn);
  const end = new Date(checkOut);

  // Check database URL config
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("your-secret-here")) {
    console.warn("[Database Warning] DATABASE_URL not set. Running simulated transaction.");
    const bookingId = `SKY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    return {
      message: 'Simulated Reservation successfully transmitted to Skylight Hotel Addis Ababa Operations (Offline Mode).',
      success: true,
      bookingId
    };
  }

  try {
    // 2. Auto-Seed Rooms if database is empty
    const roomCount = await prisma.room.count();
    if (roomCount === 0) {
      console.log("[Seeding] Auto-seeding rooms inventory in database...");
      await prisma.room.createMany({
        data: ROOMS.map(r => ({
          id: r.id,
          slug: r.id,
          name: r.name,
          category: r.category.toUpperCase() as any, // VILLA, SUITE, etc.
          basePrice: r.basePrice,
          capacity: r.capacity.includes("Adults") ? parseInt(r.capacity) : 2,
          status: "AVAILABLE"
        }))
      });
    }

    // 3. Database Transactional Availability Lock
    const bookingResult = await prisma.$transaction(async (tx) => {
      // Find room
      const dbRoom = await tx.room.findUnique({
        where: { id: roomId }
      });

      if (!dbRoom) {
        throw new Error('Selected sanctuary does not exist in inventory.');
      }

      // Check for overlapping bookings
      const overlapping = await tx.reservation.findFirst({
        where: {
          roomId,
          status: { in: ['CONFIRMED', 'CHECKED_IN'] },
          OR: [
            {
              checkIn: { lte: start },
              checkOut: { gte: start }
            },
            {
              checkIn: { lte: end },
              checkOut: { gte: end }
            },
            {
              checkIn: { gte: start },
              checkOut: { lte: end }
            }
          ]
        }
      });

      if (overlapping) {
        throw new Error('This room is already reserved for the chosen dates.');
      }

      // Assemble concatenated dietary notes or requests
      const notes = [
        specialRequests ? `Special Requests: ${specialRequests}` : null,
        flightNumber ? `Flight Number: ${flightNumber}` : null,
        earlyCheckIn ? `Early Check-in requested` : null,
        lateCheckout ? `Late Checkout requested` : null
      ].filter(Boolean).join(" | ");

      // Find or create guest
      let guest = await tx.guest.findUnique({
        where: { email: guestEmail }
      });

      if (!guest) {
        guest = await tx.guest.create({
          data: {
            email: guestEmail,
            firstName,
            lastName,
            phone,
            tier: 'CLASSIC',
            preferences: {
              create: {
                pillowType: 'Feather',
                roomTemperature: 22.0,
                transferMode: airportPickup ? 'MERCEDES_S_CLASS' : 'NONE',
                dietaryNotes: notes
              }
            }
          }
        });
      } else {
        await tx.guest.update({
          where: { id: guest.id },
          data: {
            firstName,
            lastName,
            phone
          }
        });
      }

      // Create Reservation
      const reservation = await tx.reservation.create({
        data: {
          guestId: guest.id,
          roomId: dbRoom.id,
          checkIn: start,
          checkOut: end,
          status: 'CONFIRMED',
          totalPrice: dbRoom.basePrice.mul(Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))))
        }
      });

      return reservation.id;
    });

    // 4. Cache Invalidation
    revalidatePath('/booking');
    revalidatePath('/manage');

    return {
      message: 'Reservation successfully locked and transmitted to Skylight Hotel database.',
      success: true,
      bookingId: bookingResult
    };

  } catch (error: any) {
    console.error('[Database Transaction Error] Booking failed:', error);
    return {
      message: error.message || 'A critical database system error occurred.',
      success: false
    };
  }
}
