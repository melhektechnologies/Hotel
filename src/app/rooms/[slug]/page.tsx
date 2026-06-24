'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { ArrowRight, Wind, Maximize, User, Zap, ChevronRight, ShieldAlert, Coffee, MapPin } from "lucide-react";
import Skeleton from '@/components/ui/Skeleton';
import Link from 'next/link';
import { ROOMS } from '@/lib/constants';

export default function ResidenceProfile() {
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const slug = params?.slug as string;

  const room = ROOMS.find(r => r.id === slug) || ROOMS[0];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-white">
      <Navbar />

      <main>
        {/* Cinematic Hero */}
        <section className="relative h-[80vh] flex items-end overflow-hidden">
          {loading ? (
            <Skeleton className="absolute inset-0 h-full w-full bg-muted" />
          ) : (
            <>
              <motion.div 
                initial={{ scale: 1.05, filter: 'blur(5px)' }}
                animate={{ scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image 
                  src={room.images[0]} 
                  alt={room.name}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </motion.div>
              <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 pb-24 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <span className="text-ui text-accent">{room.category} • {room.floor}</span>
                  <h1 className="text-5xl md:text-8xl font-serif leading-none text-white">
                    {room.name.split(' ').slice(0, -1).join(' ')} <br />
                    <span className="italic font-light text-white/90">{room.name.split(' ').slice(-1)[0]}</span>
                  </h1>
                </motion.div>
              </div>
            </>
          )}
        </section>

        {/* Floating Actions/Specs Bar */}
        <div className="sticky top-24 z-40 max-w-screen-xl mx-auto px-6 h-0 overflow-visible pointer-events-none print:hidden">
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6, duration: 0.8 }}
             className="bg-white/95 backdrop-blur-2xl border border-border/60 p-6 shadow-high rounded-medium flex flex-col md:flex-row justify-between items-center gap-8 pointer-events-auto"
           >
              <div className="flex gap-12 text-ui text-muted-foreground">
                 <div className="flex items-center gap-3">
                    <Maximize size={14} className="text-accent" />
                    <span className="font-semibold">{room.size}</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <User size={14} className="text-accent" />
                    <span className="font-semibold">{room.capacity}</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <MapPin size={14} className="text-accent" />
                    <span className="font-semibold">{room.view}</span>
                 </div>
              </div>
              <div className="flex items-center gap-8">
                 <div className="text-right">
                    <p className="text-[9px] uppercase tracking-widest font-bold opacity-30">Starting from</p>
                    <p className="text-2xl font-serif text-foreground font-bold">${room.basePrice} <span className="text-xs font-sans text-muted-foreground font-medium">/ night</span></p>
                 </div>
                 <Link href={`/booking?room=${room.id}`} className="btn-luxury-primary py-4 px-12 rounded-small">
                   <span>Book Suite</span>
                 </Link>
              </div>
           </motion.div>
        </div>

        {/* Narrative & Gallery */}
        <section className="section-padding bg-white">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32">
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <span className="text-ui text-accent">Accommodation Profile</span>
                <h2 className="text-4xl md:text-6xl font-serif">Refined <br /> Space</h2>
              </div>
              <p className="text-editorial">
                {room.description} Furnished with premium materials, contemporary Ethiopian art pieces, and a high-connectivity work station designed to optimize corporate and embassy briefings.
              </p>
              
              <div className="space-y-4">
                 <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-60">Suite Features</h4>
                 <ul className="space-y-4">
                    {room.features.map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-xs font-semibold text-muted-foreground">
                         <ChevronRight size={16} className="text-accent mt-0.5" />
                         {item}
                      </li>
                    ))}
                 </ul>
              </div>
            </div>

            <div className="lg:col-span-7">
               <div className="grid grid-cols-2 gap-6 h-full">
                  <div className="relative aspect-[4/5] rounded-medium overflow-hidden group shadow-subtle">
                     <Image 
                       src={room.images[0]} 
                       alt="Residence View 1" 
                       fill 
                       className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                     />
                  </div>
                  <div className="space-y-6">
                    <div className="relative aspect-square rounded-medium overflow-hidden group shadow-subtle">
                       <Image 
                         src={room.images[1] || room.images[0]} 
                         alt="Residence View 2" 
                         fill 
                         className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                       />
                    </div>
                    <div className="p-6 bg-muted/20 border border-border/40 rounded-medium space-y-4">
                       <h4 className="text-[10px] uppercase tracking-widest font-bold text-accent">Booking Conditions</h4>
                       <div className="space-y-3 text-xs text-muted-foreground font-medium">
                         <p className="flex items-center gap-2"><Coffee size={14} /> {room.breakfast}</p>
                         <p className="flex items-center gap-2"><Wind size={14} /> {room.cancellation}</p>
                         <p className="flex items-center gap-2"><ShieldAlert size={14} /> {room.conditions}</p>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Operational Security / Diplomatic briefing detail */}
        <section className="section-padding bg-foreground text-background">
           <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center space-y-16">
              <div className="w-24 h-[1px] bg-accent/30" />
              <h2 className="text-4xl md:text-7xl font-serif text-white">Diplomatic Security <br /> & Corporate Safety</h2>
              <p className="text-editorial text-white/50 max-w-2xl">
                 Equipped with secure data routing, discrete diplomatic vehicle access lanes, and close-proximity connection to the Bole Airport runway VIP lounge.
              </p>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
