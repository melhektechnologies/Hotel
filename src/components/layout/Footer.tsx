'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, ShieldCheck, Award } from 'lucide-react';
import { HOTEL_BRAND } from '@/lib/constants';

// Custom Brand Icons (X / Twitter / Instagram / Facebook)
function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
function IconTwitterX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background pt-32 pb-16 print:hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-10">
            <Link href="/" className="flex flex-col">
              <span className="text-3xl font-serif tracking-[0.2em] uppercase">{HOTEL_BRAND.name.split(' ')[0]}</span>
              <span className="text-[10px] tracking-[0.4em] uppercase opacity-40">Hotel Addis Ababa</span>
            </Link>
            <p className="text-xs leading-relaxed opacity-50 max-w-sm">
              {HOTEL_BRAND.philosophy}
            </p>
            <div className="flex gap-6 items-center">
              <Link href={HOTEL_BRAND.social.instagram} aria-label="Instagram" className="hover:text-accent transition-colors"><IconInstagram /></Link>
              <Link href={HOTEL_BRAND.social.facebook} aria-label="Facebook" className="hover:text-accent transition-colors"><IconFacebook /></Link>
              <Link href={HOTEL_BRAND.social.twitter} aria-label="X (Twitter)" className="hover:text-accent transition-colors"><IconTwitterX /></Link>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent">Explore</h4>
            <ul className="space-y-4 text-[11px] uppercase tracking-widest font-medium opacity-60">
              <li><Link href="/rooms" className="hover:text-white transition-colors">Accommodations</Link></li>
              <li><Link href="/dining" className="hover:text-white transition-colors">Gastronomy</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Meetings & Events</Link></li>
              <li><Link href="/wellness" className="hover:text-white transition-colors">Wellness Center</Link></li>
              <li><Link href="/case-study" className="hover:text-white transition-colors">Portfolio Case Study</Link></li>
            </ul>
          </div>

          {/* Guest Services */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent">Services</h4>
            <ul className="space-y-4 text-[11px] uppercase tracking-widest font-medium opacity-60">
              <li><Link href="/booking" className="hover:text-white transition-colors">Reservations</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Concierge Desk</Link></li>
              <li><Link href="/loyalty" className="hover:text-white transition-colors">Diplomatic Club</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Help & FAQ</Link></li>
              <li><Link href="/manage" className="hover:text-white transition-colors">Guest Portal</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors opacity-100">Hotel Admin Demo ↗</Link></li>
            </ul>
          </div>

          {/* Contact & Business Info */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent">Contact</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin size={18} strokeWidth={1} className="text-accent shrink-0" />
                <p className="text-[11px] leading-relaxed opacity-60 uppercase tracking-widest">{HOTEL_BRAND.contact.address}</p>
              </div>
              <div className="flex gap-4">
                <Phone size={18} strokeWidth={1} className="text-accent shrink-0" />
                <p className="text-[11px] uppercase tracking-widest opacity-60">{HOTEL_BRAND.contact.phone}</p>
              </div>
              <div className="flex gap-4">
                <Mail size={18} strokeWidth={1} className="text-accent shrink-0" />
                <p className="text-[11px] uppercase tracking-widest opacity-60">{HOTEL_BRAND.contact.email}</p>
              </div>
            </div>

            {/* Certifications - Trust Building */}
            <div className="pt-8 border-t border-white/10 flex gap-8">
              <div className="flex items-center gap-2 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-help">
                <ShieldCheck size={24} />
                <span className="text-[8px] uppercase tracking-[0.2em] font-bold">UN Security <br />Cleared</span>
              </div>
              <div className="flex items-center gap-2 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-help">
                <Award size={24} />
                <span className="text-[8px] uppercase tracking-[0.2em] font-bold">Leading Hotels <br />of the World</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal & Bottom Bar */}
        <div className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8 text-[9px] uppercase tracking-widest opacity-40 font-bold">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Settings</Link>
            <Link href="/sustainability" className="hover:text-white transition-colors">Sustainability Ledger</Link>
          </div>
          <div className="text-[9px] uppercase tracking-[0.3em] opacity-30 font-bold">
            © {currentYear} {HOTEL_BRAND.name}. Digital Product by <span className="text-accent/60">Melhek Technologies</span>.
          </div>
        </div>
      </div>
    </footer>
  );
}
