'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BookingWidget() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-5xl"
        >
          <div 
            onClick={() => window.location.href = '/booking'}
            className="glass-dark text-white rounded-2xl shadow-2xl p-4 md:p-2 border border-white/10 flex flex-col md:flex-row items-stretch gap-2 md:gap-0 cursor-pointer hover:border-accent/30 transition-colors"
          >
            {/* Date Selection */}
            <div className="flex-1 grid grid-cols-2 gap-2">
              <div className="flex flex-col items-start px-6 py-3 hover:bg-white/5 rounded-xl transition-colors text-left group">
                <span className="text-[10px] uppercase tracking-widest text-accent font-bold mb-1">Check-in</span>
                <div className="flex items-center space-x-2">
                  <Calendar size={14} className="text-white/60" />
                  <span className="text-sm font-medium">Select Date</span>
                </div>
              </div>
              <div className="flex flex-col items-start px-6 py-3 hover:bg-white/5 rounded-xl transition-colors text-left border-l border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-accent font-bold mb-1">Check-out</span>
                <div className="flex items-center space-x-2">
                  <Calendar size={14} className="text-white/60" />
                  <span className="text-sm font-medium">Select Date</span>
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="flex-1 flex flex-col items-start px-6 py-3 hover:bg-white/5 rounded-xl transition-colors text-left border-l border-white/10 hidden md:flex">
              <span className="text-[10px] uppercase tracking-widest text-accent font-bold mb-1">Guests</span>
              <div className="flex items-center space-x-2">
                <Users size={14} className="text-white/60" />
                <span className="text-sm font-medium">2 Adults</span>
                <ChevronDown size={14} className="text-white/40" />
              </div>
            </div>

            {/* CTA */}
            <div className="md:w-48 bg-accent hover:bg-white text-white hover:text-black transition-all duration-500 py-4 md:py-0 md:self-stretch rounded-xl uppercase tracking-widest text-xs font-bold shadow-lg flex items-center justify-center">
              Check Availability
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
