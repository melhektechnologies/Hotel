'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Globe, User, Search } from 'lucide-react';
import { HOTEL_BRAND } from '@/lib/constants';

const navLinks = [
  { 
    name: 'Accommodations', 
    href: '/rooms',
    dropdown: [
      { name: 'Rooms & Suites', href: '/rooms' },
      { name: 'Diplomatic Suites', href: '/rooms/diplomatic-suite' },
      { name: 'Presidential Penthouse', href: '/rooms/presidential-suite' }
    ]
  },
  { 
    name: 'Gastronomy', 
    href: '/dining',
    dropdown: [
      { name: "Ta'em Traditional", href: '/dining#taem' },
      { name: 'Grand Pavilion', href: '/dining#pavilion' }
    ]
  },
  { 
    name: 'Meetings & Events', 
    href: '/events',
    dropdown: [
      { name: 'Skylight Grand Ballroom', href: '/events#ballroom' },
      { name: 'Diplomatic Boardrooms', href: '/events#boardrooms' }
    ]
  },
  { name: 'Experiences', href: '/experiences' },
  { name: 'Story', href: '/about' },
  { name: 'Guest Portal', href: '/manage' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border py-4' : 'bg-transparent py-8'
      }`}
    >
      {/* Utility Bar - Visible on Large Screens Only */}
      <div className={`max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center transition-all duration-500 overflow-hidden ${
        isScrolled ? 'h-0 opacity-0' : 'h-6 opacity-60 mb-6'
      }`}>
        <div className="flex gap-6 text-[10px] uppercase tracking-[0.2em] font-medium">
          <button className="flex items-center gap-2 hover:text-accent transition-colors">
            <Globe size={10} />
            EN / USD
          </button>
          <Link href="/location" className="hover:text-accent transition-colors">Bole District, Addis Ababa</Link>
        </div>
        <div className="flex gap-6 text-[10px] uppercase tracking-[0.2em] font-medium">
          <Link href="/loyalty" className="flex items-center gap-2 hover:text-accent transition-colors">
            <User size={10} />
            The Circle Membership
          </Link>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="flex flex-col group">
          <span className={`text-2xl md:text-3xl font-serif tracking-widest uppercase transition-colors duration-500 ${
            !isScrolled ? 'text-white' : 'text-foreground'
          } group-hover:text-accent`}>
            {HOTEL_BRAND.name.split(' ')[0]}
          </span>
          <span className={`text-[8px] md:text-[9px] tracking-[0.4em] uppercase opacity-60 transition-colors duration-500 ${
            !isScrolled ? 'text-white/80' : 'text-foreground/60'
          }`}>
            Hotel Addis Ababa
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <div 
              key={link.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link 
                href={link.href}
                className={`text-[11px] uppercase tracking-[0.3em] font-bold transition-colors duration-500 flex items-center gap-1 ${
                  !isScrolled ? 'text-white/90 hover:text-accent' : 'text-foreground hover:text-accent'
                }`}
              >
                {link.name}
                {link.dropdown && <ChevronDown size={10} className="opacity-40" />}
              </Link>
              
              <AnimatePresence>
                {activeDropdown === link.name && link.dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-6"
                  >
                    <div className="bg-white shadow-2xl border border-border min-w-[240px] py-6 px-8 rounded-sm">
                      <div className="flex flex-col gap-5">
                        {link.dropdown.map((item) => (
                          <Link 
                            key={item.name} 
                            href={item.href}
                            className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/50 hover:text-accent transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 md:gap-8">
          <button className={`hidden md:block transition-colors ${!isScrolled ? 'text-white' : 'text-foreground'} hover:text-accent`}>
            <Search size={18} strokeWidth={1.5} />
          </button>
          <Link 
            href="/booking"
            className="btn-luxury-primary px-6 md:px-10 py-3 md:py-4 shadow-lg hover:shadow-accent/20"
          >
            Reserve
          </Link>
          <button 
            className={`lg:hidden ${!isScrolled ? 'text-white' : 'text-foreground'}`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-background z-[100] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-serif tracking-widest uppercase">{HOTEL_BRAND.name.split(' ')[0]}</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors"><X size={32} /></button>
            </div>
            
            <div className="flex flex-col gap-10 flex-1 overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.name} className="space-y-6">
                  <Link 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl md:text-5xl font-serif hover:text-accent transition-colors block"
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="flex flex-wrap gap-x-8 gap-y-3">
                      {link.dropdown.map((item) => (
                        <Link 
                          key={item.name}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-40 hover:opacity-100 hover:text-accent transition-all"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-12 border-t border-border space-y-8 mt-auto">
              <Link href="/loyalty" className="block text-sm uppercase tracking-[0.3em] font-bold text-accent">Join The Circle</Link>
              <div className="flex justify-between items-center">
                <div className="flex gap-6 opacity-60">
                  <Globe size={18} />
                  <span className="text-xs uppercase tracking-widest font-medium">EN / USD</span>
                </div>
                <div className="flex gap-6">
                  {/* Social links would go here if needed, but keeping it clean for mobile UX */}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
