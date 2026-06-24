'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1] } 
          }}
          className="fixed inset-0 z-[200] bg-foreground flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle Background Grain/Texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center text-background relative"
          >
            <motion.span 
              initial={{ letterSpacing: "1em", opacity: 0 }}
              animate={{ letterSpacing: "0.3em", opacity: 1 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-serif uppercase block"
            >
              Skylight
            </motion.span>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-[9px] uppercase tracking-[0.4em] mt-4"
            >
              Hotel Addis Ababa
            </motion.p>
          </motion.div>

          {/* Progress Indicator */}
          <div className="absolute bottom-24 w-48 h-[1px] bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="h-full bg-accent shadow-[0_0_15px_rgba(197,163,88,0.5)]"
            />
          </div>

          {/* Luxury Corner Accents */}
          <div className="absolute top-12 left-12 w-8 h-[1px] bg-white/10" />
          <div className="absolute top-12 left-12 w-[1px] h-8 bg-white/10" />
          <div className="absolute bottom-12 right-12 w-8 h-[1px] bg-white/10" />
          <div className="absolute bottom-12 right-12 w-[1px] h-8 bg-white/10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
