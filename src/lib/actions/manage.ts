'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type ReservationDetails = {
  id: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  roomName: string;
  guestName: string;
  guestEmail: string;
  guestTier: string;
  preferences: {
    pillowType: string;
    roomTemp: number;
    dietary: string;
    transferMode: string;
  };
};

/**
 * Retrieve Reservation with unified joins
 */
export async function getReservationById(bookingId: string): Promise<{ success: boolean; data?: ReservationDetails; error?: string }> {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("your-secret-here")) {
    // Return mock data for test/development mode without database configuration
    return {
      success: true,
      data: {
        id: bookingId,
        checkIn: "2026-06-12",
        checkOut: "2026-06-19",
        totalPrice: 2940,
        roomName: "Executive Suite",
        guestName: "M. Alexander Mercer",
        guestEmail: "alex@mercer.com",
        guestTier: "THE CIRCLE",
        preferences: {
          pillowType: "Signature Goose Down (Soft)",
          roomTemp: 21.5,
          dietary: "None",
          transferMode: "MERCEDES_S_CLASS"
        }
      }
    };
  }

  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id: bookingId },
      include: {
        room: true,
        guest: {
          include: {
            preferences: true
          }
        }
      }
    });

    if (!reservation) {
      return { success: false, error: "Reservation ID not found." };
    }

    return {
      success: true,
      data: {
        id: reservation.id,
        checkIn: reservation.checkIn.toISOString().split('T')[0],
        checkOut: reservation.checkOut.toISOString().split('T')[0],
        totalPrice: Number(reservation.totalPrice),
        roomName: reservation.room.name,
        guestName: `${reservation.guest.firstName} ${reservation.guest.lastName}`,
        guestEmail: reservation.guest.email,
        guestTier: reservation.guest.tier.replace('_', ' '),
        preferences: {
          pillowType: reservation.guest.preferences?.pillowType || "Feather",
          roomTemp: reservation.guest.preferences?.roomTemperature || 21.5,
          dietary: reservation.guest.preferences?.dietaryNotes || "None",
          transferMode: reservation.guest.preferences?.transferMode || "MERCEDES_S_CLASS"
        }
      }
    };
  } catch (error) {
    console.error("[Database Error] Failed to fetch reservation:", error);
    return { success: false, error: "Database retrieval error." };
  }
}

/**
 * Update Guest Preference Details
 */
export async function updateGuestPreferences(
  bookingId: string,
  guestEmail: string,
  data: { pillowType: string; roomTemp: number; dietary: string; transferMode: string }
): Promise<{ success: boolean; error?: string }> {
  
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("your-secret-here")) {
    return { success: true };
  }

  try {
    const guest = await prisma.guest.findUnique({
      where: { email: guestEmail },
      include: { preferences: true }
    });

    if (!guest) {
      return { success: false, error: "Guest profile not found." };
    }

    await prisma.preference.update({
      where: { guestId: guest.id },
      data: {
        pillowType: data.pillowType,
        roomTemperature: data.roomTemp,
        dietaryNotes: data.dietary,
        transferMode: data.transferMode
      }
    });

    revalidatePath('/manage');
    return { success: true };
  } catch (error) {
    console.error("[Database Error] Failed to update preferences:", error);
    return { success: false, error: "Failed to persist preferences." };
  }
}
