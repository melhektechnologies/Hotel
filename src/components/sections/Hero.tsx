'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { HOTEL_BRAND } from '@/lib/constants';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-foreground">
      {/* Background Image - Luxury Facade & Lobby context */}
      <motion.div 
        style={{ y: y1 }} 
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-black/45 z-10" />
        <Image 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop"
          alt="Skylight Hotel Addis Ababa Lobby Entrance"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Hero Content - Editorial Layout */}
      <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-12 lg:px-24">
        <motion.div 
          style={{ opacity }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-screen-2xl mx-auto w-full"
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-accent font-bold mb-6 block"
          >
            {HOTEL_BRAND.location} • 5 mins from Bole Airport
          </motion.span>
          
          <h1 className="text-display text-white mb-8">
            The Junction of <br />
            <span className="italic font-light text-white/90">Elegance & Heritage</span>
          </h1>

          <p className="max-w-lg text-white/70 text-editorial mb-12">
            East Africa&apos;s premier diplomatic retreat. Reimagined with architectural mastery, high-security configurations, and authentic Ethiopian hospitality in the heart of Bole.
          </p>

          <div className="flex flex-col sm:flex-row gap-8">
            <Link href="/booking" className="btn-luxury-primary bg-accent text-white hover:bg-white hover:text-foreground rounded-small">
              Reserve Accommodations <ArrowRight size={16} />
            </Link>
            <Link href="/case-study" className="flex items-center gap-4 group text-white/80 hover:text-white transition-colors">
              <span className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                <Play size={16} fill="white" className="ml-1" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Proposal Case Study</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-6"
      >
        <span className="text-[8px] uppercase tracking-[0.5em] text-white/30 rotate-90 origin-center mb-8">Scroll Down</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-accent to-transparent relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 80] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
}
