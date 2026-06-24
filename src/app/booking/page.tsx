'use client';

import { useState, useMemo, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROOMS, BUSINESS_RULES, HOTEL_BRAND } from '@/lib/constants';
import { Check, ChevronRight, Users, Calendar, ArrowLeft, CreditCard, ShieldCheck, Info, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { finalizeBooking, type BookingState as ActionState } from '@/lib/actions/booking';

type LocalState = {
  step: 1 | 2 | 3 | 4;
  dates: { checkIn: string; checkOut: string };
  guests: number;
  selectedRoomId: string | null;
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests: string;
    airportPickup: boolean;
    flightNumber: string;
    earlyCheckIn: boolean;
    lateCheckout: boolean;
  };
};

export default function BookingPage() {
  const [isPending, startTransition] = useTransition();
  const [actionState, setActionState] = useState<ActionState>({ message: null, success: false });
  
  const [state, setState] = useState<LocalState>({
    step: 1,
    dates: { checkIn: '', checkOut: '' },
    guests: 2,
    selectedRoomId: null,
    guestInfo: { 
      firstName: '', 
      lastName: '', 
      email: '', 
      phone: '', 
      specialRequests: '',
      airportPickup: false,
      flightNumber: '',
      earlyCheckIn: false,
      lateCheckout: false
    }
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const today = new Date().toISOString().split('T')[0];

  const selectedRoom = useMemo(() => 
    ROOMS.find(r => r.id === state.selectedRoomId), 
    [state.selectedRoomId]
  );

  const nightCount = useMemo(() => {
    if (!state.dates.checkIn || !state.dates.checkOut) return 0;
    const start = new Date(state.dates.checkIn);
    const end = new Date(state.dates.checkOut);
    const diff = end.getTime() - start.getTime();
    const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  }, [state.dates]);

  const calculateTotals = () => {
    if (!selectedRoom || nightCount <= 0) return { subtotal: 0, tax: 0, service: 0, total: 0 };
    const subtotal = selectedRoom.basePrice * nightCount;
    const tax = subtotal * BUSINESS_RULES.taxRate;
    const service = subtotal * BUSINESS_RULES.serviceCharge;
    return { subtotal, tax, service, total: subtotal + tax + service };
  };

  const { subtotal, tax, service, total } = calculateTotals();

  const handleDateChange = (type: 'checkIn' | 'checkOut', value: string) => {
    setState(s => ({ ...s, dates: { ...s.dates, [type]: value } }));
    setFieldErrors(prev => {
      const next = { ...prev };
      delete next[type];
      return next;
    });
  };

  const handleInfoChange = (field: keyof LocalState['guestInfo'], value: any) => {
    setState(s => ({ ...s, guestInfo: { ...s.guestInfo, [field]: value } }));
    setFieldErrors(prev => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleToggleChange = (field: 'airportPickup' | 'earlyCheckIn' | 'lateCheckout') => {
    setState(s => ({
      ...s,
      guestInfo: {
        ...s.guestInfo,
        [field]: !s.guestInfo[field]
      }
    }));
  };

  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!state.dates.checkIn) {
      errors.checkIn = "Check-in date is required.";
    } else if (state.dates.checkIn < today) {
      errors.checkIn = "Date cannot be in the past.";
    }

    if (!state.dates.checkOut) {
      errors.checkOut = "Check-out date is required.";
    } else if (state.dates.checkIn && state.dates.checkOut <= state.dates.checkIn) {
      errors.checkOut = "Must be after check-in date.";
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = () => {
    const errors: Record<string, string> = {};
    const { firstName, lastName, email, phone } = state.guestInfo;

    if (!firstName) errors.firstName = "First name is required.";
    if (!lastName) errors.lastName = "Last name is required.";
    if (!email) {
      errors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!phone) errors.phone = "Phone number is required.";
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (state.step === 1 && !validateStep1()) return;
    if (state.step === 3 && !validateStep3()) return;
    
    if (state.step === 3) {
      handleFinalSubmission();
    } else {
      setState(s => ({ ...s, step: (s.step + 1) as any }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalSubmission = () => {
    const formData = new FormData();
    formData.append('roomId', state.selectedRoomId!);
    formData.append('checkIn', new Date(state.dates.checkIn).toISOString());
    formData.append('checkOut', new Date(state.dates.checkOut).toISOString());
    formData.append('guests', state.guests.toString());
    formData.append('guestEmail', state.guestInfo.email);
    formData.append('firstName', state.guestInfo.firstName);
    formData.append('lastName', state.guestInfo.lastName);
    formData.append('phone', state.guestInfo.phone);
    formData.append('specialRequests', state.guestInfo.specialRequests);
    formData.append('airportPickup', state.guestInfo.airportPickup ? 'true' : 'false');
    formData.append('flightNumber', state.guestInfo.flightNumber);
    formData.append('earlyCheckIn', state.guestInfo.earlyCheckIn ? 'true' : 'false');
    formData.append('lateCheckout', state.guestInfo.lateCheckout ? 'true' : 'false');

    startTransition(async () => {
      const result = await finalizeBooking({ message: null, success: false }, formData);
      setActionState(result);
      if (result.success) {
        setState(s => ({ ...s, step: 4 }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setFieldErrors({ submit: result.message || 'System error. Contact Concierge.' });
      }
    });
  };

  const prevStep = () => {
    setState(s => ({ ...s, step: (s.step - 1) as any }));
    setFieldErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-white">
      <Navbar />
      
      <main className="pt-40 pb-24 px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto">
        {/* Progress Stepper */}
        <div className="flex justify-between items-center max-w-3xl mx-auto mb-20 relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border -z-10" />
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className={`w-12 h-12 rounded-full flex flex-col items-center justify-center text-[10px] font-bold transition-all duration-700 relative ${
                state.step >= i ? 'bg-foreground text-background scale-110 shadow-xl' : 'bg-white text-foreground/30 border border-border'
              }`}
            >
              {state.step > i ? <Check size={16} /> : i}
              <span className={`absolute -bottom-8 w-max text-[9px] uppercase tracking-widest ${state.step === i ? 'text-foreground font-bold' : 'text-foreground/30'}`}>
                {['Dates', 'Sanctuary', 'Details', 'Confirmation'][i-1]}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-8 space-y-8">
            <AnimatePresence mode="wait">
              {state.step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white border border-border p-8 md:p-16 rounded-medium shadow-subtle space-y-12"
                >
                  <div className="space-y-4">
                    <span className="text-ui text-accent">Step 01</span>
                    <h2 className="text-3xl font-serif">Plan Your Journey</h2>
                    <p className="text-muted-foreground text-editorial">Select the timeframe for your stay at Swiss Inn Nexus Hotel.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label htmlFor="checkIn" className="text-ui opacity-60">Check-In</label>
                      <input 
                        id="checkIn"
                        type="date" 
                        min={today}
                        className={`w-full border-b py-4 px-2 focus:outline-none bg-transparent text-lg font-serif transition-colors ${
                          fieldErrors.checkIn ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-accent'
                        }`}
                        onChange={(e) => handleDateChange('checkIn', e.target.value)}
                        value={state.dates.checkIn}
                        aria-invalid={!!fieldErrors.checkIn}
                      />
                      {fieldErrors.checkIn && (
                        <p className="text-xs text-red-500 font-bold tracking-wider uppercase flex items-center gap-1.5 mt-1">
                          <AlertCircle size={12} /> {fieldErrors.checkIn}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <label htmlFor="checkOut" className="text-ui opacity-60">Check-Out</label>
                      <input 
                        id="checkOut"
                        type="date" 
                        min={state.dates.checkIn || today}
                        className={`w-full border-b py-4 px-2 focus:outline-none bg-transparent text-lg font-serif transition-colors ${
                          fieldErrors.checkOut ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-accent'
                        }`}
                        onChange={(e) => handleDateChange('checkOut', e.target.value)}
                        value={state.dates.checkOut}
                        aria-invalid={!!fieldErrors.checkOut}
                      />
                      {fieldErrors.checkOut && (
                        <p className="text-xs text-red-500 font-bold tracking-wider uppercase flex items-center gap-1.5 mt-1">
                          <AlertCircle size={12} /> {fieldErrors.checkOut}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <label className="text-ui opacity-60">Number of Guests</label>
                    <div className="flex flex-wrap gap-4">
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setState(s => ({ ...s, guests: n }))}
                          className={`w-14 h-14 rounded-full border transition-all flex items-center justify-center font-serif text-lg cursor-pointer ${
                            state.guests === n ? 'bg-foreground text-background border-foreground shadow-lg' : 'hover:border-accent border-border'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={nextStep} 
                    className="btn-luxury-primary w-full py-6 cursor-pointer"
                  >
                    <span>Check Availability</span> <ChevronRight size={16} />
                  </button>
                </motion.div>
              )}

              {state.step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-4">
                      <span className="text-ui text-accent">Step 02</span>
                      <h2 className="text-3xl font-serif">Choose Your Sanctuary</h2>
                    </div>
                    <button onClick={prevStep} className="text-ui opacity-50 hover:opacity-100 flex items-center gap-2 transition-opacity cursor-pointer">
                      <ArrowLeft size={14} /> Back to Dates
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-12">
                    {ROOMS.map((room) => (
                      <div 
                        key={room.id}
                        onClick={() => setState(s => ({ ...s, selectedRoomId: room.id }))}
                        className={`group cursor-pointer transition-all duration-700 grid grid-cols-1 md:grid-cols-12 overflow-hidden bg-white rounded-medium ${
                          state.selectedRoomId === room.id ? 'ring-2 ring-accent shadow-2xl' : 'border border-border/60 hover:ring-1 hover:ring-border'
                        }`}
                      >
                        <div className="md:col-span-5 relative h-72 md:h-auto overflow-hidden">
                          <Image src={room.images[0]} alt={room.name} fill className="object-cover group-hover:scale-105 transition-transform duration-[3s]" />
                        </div>
                        <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between space-y-8">
                          <div className="space-y-6">
                            <div className="flex justify-between items-start">
                              <div className="space-y-1">
                                <span className="text-ui text-accent">{room.category}</span>
                                <h3 className="text-2xl md:text-3xl font-serif">{room.name}</h3>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-serif">${room.basePrice.toLocaleString()}</p>
                                <p className="text-ui opacity-40">Per Night</p>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed italic line-clamp-3">"{room.description}"</p>
                          </div>
                          <button className={`btn-luxury-outline w-full cursor-pointer ${state.selectedRoomId === room.id ? 'bg-accent text-white border-accent' : ''}`}>
                            <span>{state.selectedRoomId === room.id ? 'Sanctuary Selected' : 'Select This Sanctuary'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={nextStep}
                    disabled={!state.selectedRoomId}
                    className="btn-luxury-primary w-full py-6 disabled:opacity-30 cursor-pointer"
                  >
                    <span>Confirm Selection</span> <ChevronRight size={16} />
                  </button>
                </motion.div>
              )}

              {state.step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white border border-border p-8 md:p-16 rounded-medium shadow-subtle space-y-12"
                >
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-4">
                      <span className="text-ui text-accent">Step 03</span>
                      <h2 className="text-3xl font-serif">Guest Details</h2>
                    </div>
                    <button onClick={prevStep} className="text-ui opacity-50 hover:opacity-100 flex items-center gap-2 transition-opacity cursor-pointer">
                      <ArrowLeft size={14} /> Back to Rooms
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <div className="space-y-3">
                      <label htmlFor="firstName" className="text-ui opacity-60">First Name</label>
                      <input 
                        id="firstName"
                        type="text" 
                        value={state.guestInfo.firstName}
                        className={`w-full border-b py-4 px-2 focus:outline-none bg-transparent transition-colors ${
                          fieldErrors.firstName ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-accent'
                        }`}
                        onChange={(e) => handleInfoChange('firstName', e.target.value)}
                        aria-invalid={!!fieldErrors.firstName}
                      />
                      {fieldErrors.firstName && (
                        <p className="text-xs text-red-500 font-bold tracking-wider uppercase flex items-center gap-1.5 mt-1">
                          <AlertCircle size={12} /> {fieldErrors.firstName}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <label htmlFor="lastName" className="text-ui opacity-60">Last Name</label>
                      <input 
                        id="lastName"
                        type="text" 
                        value={state.guestInfo.lastName}
                        className={`w-full border-b py-4 px-2 focus:outline-none bg-transparent transition-colors ${
                          fieldErrors.lastName ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-accent'
                        }`}
                        onChange={(e) => handleInfoChange('lastName', e.target.value)}
                        aria-invalid={!!fieldErrors.lastName}
                      />
                      {fieldErrors.lastName && (
                        <p className="text-xs text-red-500 font-bold tracking-wider uppercase flex items-center gap-1.5 mt-1">
                          <AlertCircle size={12} /> {fieldErrors.lastName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="email" className="text-ui opacity-60">Email Address</label>
                      <input 
                        id="email"
                        type="email" 
                        value={state.guestInfo.email}
                        className={`w-full border-b py-4 px-2 focus:outline-none bg-transparent transition-colors ${
                          fieldErrors.email ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-accent'
                        }`}
                        onChange={(e) => handleInfoChange('email', e.target.value)}
                        aria-invalid={!!fieldErrors.email}
                      />
                      {fieldErrors.email && (
                        <p className="text-xs text-red-500 font-bold tracking-wider uppercase flex items-center gap-1.5 mt-1">
                          <AlertCircle size={12} /> {fieldErrors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="phone" className="text-ui opacity-60">Phone Number</label>
                      <input 
                        id="phone"
                        type="tel" 
                        value={state.guestInfo.phone}
                        className={`w-full border-b py-4 px-2 focus:outline-none bg-transparent transition-colors ${
                          fieldErrors.phone ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-accent'
                        }`}
                        onChange={(e) => handleInfoChange('phone', e.target.value)}
                        aria-invalid={!!fieldErrors.phone}
                      />
                      {fieldErrors.phone && (
                        <p className="text-xs text-red-500 font-bold tracking-wider uppercase flex items-center gap-1.5 mt-1">
                          <AlertCircle size={12} /> {fieldErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Pre-arrival VIP Operations Options */}
                  <div className="space-y-6 pt-4 border-t border-border/50">
                    <h3 className="text-xs uppercase tracking-[0.3em] text-accent font-bold">Pre-Arrival VIP Coordination</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center justify-between p-5 border border-border/80 rounded-medium bg-muted/5">
                        <div className="space-y-1">
                          <h4 className="text-sm font-serif">Complimentary Airport Pickup</h4>
                          <p className="text-[10px] text-muted-foreground leading-relaxed">5-minute luxury shuttle from Bole International Airport</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleChange('airportPickup')}
                          className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 cursor-pointer shrink-0 ${
                            state.guestInfo.airportPickup ? 'bg-accent' : 'bg-border'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                            state.guestInfo.airportPickup ? 'translate-x-6' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-5 border border-border/80 rounded-medium bg-muted/5">
                        <div className="space-y-1">
                          <h4 className="text-sm font-serif">Early Check-In Request</h4>
                          <p className="text-[10px] text-muted-foreground leading-relaxed">Subject to availability (before 14:00)</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleChange('earlyCheckIn')}
                          className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 cursor-pointer shrink-0 ${
                            state.guestInfo.earlyCheckIn ? 'bg-accent' : 'bg-border'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                            state.guestInfo.earlyCheckIn ? 'translate-x-6' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-5 border border-border/80 rounded-medium bg-muted/5">
                        <div className="space-y-1">
                          <h4 className="text-sm font-serif">Late Check-Out Request</h4>
                          <p className="text-[10px] text-muted-foreground leading-relaxed">Subject to availability (after 12:00)</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleChange('lateCheckout')}
                          className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 cursor-pointer shrink-0 ${
                            state.guestInfo.lateCheckout ? 'bg-accent' : 'bg-border'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                            state.guestInfo.lateCheckout ? 'translate-x-6' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>
                    </div>

                    {state.guestInfo.airportPickup && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3 pt-2"
                      >
                        <label htmlFor="flightNumber" className="text-ui opacity-60">Arrival Flight Number</label>
                        <input 
                          id="flightNumber"
                          type="text" 
                          placeholder="E.g. ET 501"
                          value={state.guestInfo.flightNumber}
                          className="w-full border-b py-4 px-2 focus:outline-none bg-transparent transition-colors border-border focus:border-accent font-serif text-lg"
                          onChange={(e) => handleInfoChange('flightNumber', e.target.value)}
                        />
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <label htmlFor="specialRequests" className="text-ui opacity-60">Special Requests</label>
                    <textarea 
                      id="specialRequests"
                      className="w-full border border-border p-6 h-40 focus:outline-none focus:border-accent bg-muted/20 resize-none text-sm rounded-medium"
                      placeholder="Share your requirements..."
                      value={state.guestInfo.specialRequests}
                      onChange={(e) => handleInfoChange('specialRequests', e.target.value)}
                    />
                  </div>

                  {fieldErrors.submit && (
                    <p className="text-xs text-red-500 font-bold tracking-widest uppercase flex items-center gap-2">
                       <Info size={14} /> {fieldErrors.submit}
                    </p>
                  )}

                  <button 
                    onClick={nextStep} 
                    disabled={isPending}
                    className="btn-luxury-primary w-full py-6 disabled:opacity-50 cursor-pointer"
                  >
                    {isPending ? (
                      <span className="flex items-center justify-center gap-3"><Loader2 size={16} className="animate-spin text-accent" /> Transmitting...</span>
                    ) : (
                      <span>Finalize Reservation</span>
                    )}
                    {!isPending && <ChevronRight size={16} />}
                  </button>
                </motion.div>
              )}

              {state.step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  {/* Success Header */}
                  <div className="bg-white border border-border p-12 md:p-16 text-center space-y-8 shadow-2xl rounded-medium">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto"
                    >
                      <ShieldCheck size={40} strokeWidth={1} />
                    </motion.div>
                    <div className="space-y-4">
                      <h2 className="text-4xl md:text-5xl font-serif">Sanctuary Reserved</h2>
                      <p className="text-muted-foreground text-editorial max-w-lg mx-auto">
                        Your journey to {HOTEL_BRAND.name} has begun. A confirmation has been dispatched to {state.guestInfo.email}.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-3 bg-accent/5 border border-accent/20 px-6 py-3 rounded-medium">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Reservation ID</span>
                      <span className="text-accent font-mono font-bold tracking-widest text-lg">{actionState.bookingId || 'ATH-2026-X82Q'}</span>
                    </div>
                  </div>

                  {/* Booking Summary */}
                  {selectedRoom && (
                    <div className="bg-white border border-border rounded-medium shadow-subtle overflow-hidden">
                      <div className="px-8 py-5 border-b border-border/50">
                        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">Booking Summary</p>
                      </div>
                      <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                          <div className="space-y-1">
                            <p className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground/60">Residence</p>
                            <p className="font-serif text-lg">{selectedRoom.name}</p>
                            <p className="text-muted-foreground text-xs">{selectedRoom.size} · {selectedRoom.view}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground/60">Stay Period</p>
                            <p className="font-serif">{state.dates.checkIn}</p>
                            <p className="text-muted-foreground text-xs">→ {state.dates.checkOut} ({nightCount} nights)</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground/60">Registered Guest</p>
                            <p className="font-serif">{state.guestInfo.firstName} {state.guestInfo.lastName}</p>
                            <p className="text-muted-foreground text-xs">{state.guests} guest{state.guests > 1 ? 's' : ''}</p>
                          </div>
                        </div>
                        <div className="border-t border-border/50 pt-6 space-y-3">
                          {[
                            { label: 'Accommodation', value: `$${subtotal.toLocaleString()}` },
                            { label: `Ethiopian VAT (15%)`, value: `$${tax.toFixed(0)}` },
                            { label: `Service Charge (10%)`, value: `$${service.toFixed(0)}` },
                          ].map(({ label, value }) => (
                            <div key={label} className="flex justify-between text-sm text-muted-foreground">
                              <span>{label}</span><span>{value}</span>
                            </div>
                          ))}
                          <div className="flex justify-between font-serif text-xl border-t border-border pt-4 mt-2">
                            <span>Total Charged</span>
                            <span className="text-accent">${total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Next Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { icon: Calendar, title: 'Add to Calendar', desc: 'Save your check-in and check-out dates', action: () => alert('Calendar invite downloaded') },
                      { icon: Users, title: 'Manage Your Stay', desc: 'Set preferences, book spa & dining', href: '/manage' },
                      { icon: ShieldCheck, title: 'Contact Concierge', desc: `${HOTEL_BRAND.contact.phone} · Available 24/7`, action: () => {} },
                    ].map(({ icon: Icon, title, desc, action, href }) => (
                      <div
                        key={title}
                        onClick={action}
                        className="bg-white border border-border rounded-medium p-6 space-y-3 hover:shadow-md hover:border-accent/30 transition-all cursor-pointer group"
                      >
                        <Icon size={20} className="text-accent" strokeWidth={1.5} />
                        <div>
                          <p className="font-serif text-sm font-bold group-hover:text-accent transition-colors">{title}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
                        </div>
                        {href && <Link href={href} className="text-[9px] uppercase tracking-widest font-bold text-accent flex items-center gap-1">Open <ArrowLeft size={10} className="rotate-180" /></Link>}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
                    <Link href="/manage" className="btn-luxury-primary px-12 rounded-medium"><span>Manage Your Experience</span></Link>
                    <Link href="/" className="btn-luxury-outline px-12 rounded-medium"><span>Return Home</span></Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          {state.step < 4 && (
            <div className="lg:col-span-4 sticky top-40 space-y-8">
              <div className="bg-foreground text-background p-10 rounded-medium shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-16 translate-x-16 blur-3xl" />
                <h3 className="text-2xl font-serif mb-8 border-b border-white/10 pb-6 text-white">Your Stay</h3>
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-8 text-ui text-white">
                    <div className="space-y-2">
                      <p className="opacity-40">Check-In</p>
                      <p className="text-accent">{state.dates.checkIn || '---'}</p>
                    </div>
                    <div className="space-y-2 text-right">
                      <p className="opacity-40">Check-Out</p>
                      <p className="text-accent">{state.dates.checkOut || '---'}</p>
                    </div>
                  </div>

                  {selectedRoom && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 border-t border-white/10 pt-8">
                      <div className="space-y-2">
                        <p className="text-ui text-accent">{selectedRoom.category}</p>
                        <h4 className="text-xl font-serif text-white">{selectedRoom.name}</h4>
                        <p className="text-ui opacity-40">{nightCount} Nights · {state.guests} Guests</p>
                      </div>
                    </motion.div>
                  )}

                  <div className="pt-8 border-t border-white/10 space-y-4">
                    <div className="flex justify-between text-ui opacity-40 text-white">
                      <span>Room Rate</span>
                      <span>{selectedRoom ? `$${selectedRoom.basePrice}/night` : '—'}</span>
                    </div>
                    <div className="flex justify-between text-ui opacity-40 text-white">
                      <span>Subtotal {selectedRoom ? `(${nightCount}N)` : ''}</span>
                      <span>{selectedRoom ? `$${subtotal.toLocaleString()}` : '—'}</span>
                    </div>
                    <div className="flex justify-between text-ui opacity-40 text-white">
                      <span>VAT (15%)</span>
                      <span>{selectedRoom ? `$${tax.toFixed(0)}` : '—'}</span>
                    </div>
                    <div className="flex justify-between text-ui opacity-40 text-white">
                      <span>Service (10%)</span>
                      <span>{selectedRoom ? `$${service.toFixed(0)}` : '—'}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-serif pt-4 border-t border-white/25 text-white">
                      <span>Total</span>
                      <span className="text-accent">{selectedRoom ? `$${total.toLocaleString()}` : '—'}</span>
                    </div>
                    <p className="text-[8px] uppercase tracking-widest opacity-30 text-white text-center">All taxes & charges included</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
