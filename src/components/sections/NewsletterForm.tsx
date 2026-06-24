'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Loader2 } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail("");
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto w-full">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center space-y-4 py-2"
          >
            <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center">
              <Check size={20} />
            </div>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/60">
              Welcome to the Inner Circle
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="relative flex flex-col md:flex-row gap-4"
          >
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL ADDRESS"
                required
                disabled={status === 'loading'}
                className="w-full bg-white border-b border-border py-4 text-[10px] uppercase tracking-[0.3em] font-bold focus:outline-none focus:border-accent transition-all placeholder:text-foreground/20 text-foreground disabled:opacity-50"
              />
              {status === 'loading' && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  <Loader2 size={16} className="animate-spin text-accent" />
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-luxury-primary group"
            >
              <span>Join Narrative</span> <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      <p className="mt-6 text-[8px] uppercase tracking-[0.2em] opacity-30 text-center leading-relaxed">
        By subscribing, you agree to our Privacy Policy and consent to receive <br /> exclusive updates from Skylight Hotel Addis Ababa.
      </p>
    </div>
  );
}
