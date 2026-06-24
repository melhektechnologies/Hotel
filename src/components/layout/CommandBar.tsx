'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Map, Heart, Compass, Zap, X, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const QUICK_ACTIONS = [
  { icon: <Map size={16} />, label: "Check Availability", href: "/booking" },
  { icon: <Compass size={16} />, label: "Explore Escapes", href: "/experiences" },
  { icon: <Heart size={16} />, label: "Skylight Spa Rituals", href: "/wellness" },
  { icon: <Zap size={16} />, label: "Operations Ledger", href: "/sustainability" }
];

export default function CommandBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigateTo = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  return (
    <>
      {/* Visual Trigger - Subtle and Elite */}
      <button 
        onClick={() => setOpen(true)}
        className="fixed bottom-8 left-8 z-[100] bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-3 rounded-full flex items-center gap-4 hover:bg-white hover:text-foreground transition-all duration-500 group shadow-2xl"
      >
        <Command size={14} className="opacity-40 group-hover:opacity-100" />
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Skylight Command</span>
        <span className="text-[9px] opacity-40 font-mono px-2 py-0.5 border border-white/20 rounded-md">⌘K</span>
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-2xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-white border border-border shadow-[0_64px_128px_-16px_rgba(0,0,0,0.3)] rounded-3xl overflow-hidden"
            >
              {/* Search Input */}
              <div className="p-8 border-b border-border flex items-center gap-6">
                <Search size={24} className="text-accent" />
                <input 
                  autoFocus
                  type="text"
                  placeholder="Navigate Skylight OS..."
                  className="w-full bg-transparent border-none focus:outline-none text-2xl font-serif placeholder:opacity-20"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Quick Actions */}
              <div className="p-4 bg-muted/20">
                <p className="text-[9px] uppercase tracking-widest font-bold opacity-30 px-4 mb-4">Command Suggestions</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {QUICK_ACTIONS.map((action) => (
                    <button 
                      key={action.label}
                      onClick={() => navigateTo(action.href)}
                      className="flex items-center justify-between p-4 bg-white border border-border hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all group rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-accent">{action.icon}</div>
                        <span className="text-[11px] uppercase tracking-widest font-bold opacity-60 group-hover:opacity-100">{action.label}</span>
                      </div>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent" />
                    </button>
                  ))}
                </div>
              </div>

              {/* System Stats Footer */}
              <div className="p-6 border-t border-border bg-white flex justify-between items-center text-[9px] uppercase tracking-widest font-bold opacity-30">
                <div className="flex gap-6">
                  <span>Latency: 12ms</span>
                  <span>Environment: Production</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Systems Operational
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
