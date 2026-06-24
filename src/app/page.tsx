'use client';

import { motion } from 'framer-motion';
import ImpactDashboard from "@/components/sections/ImpactDashboard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Amenities from "@/components/sections/Amenities";
import RoomPreview from "@/components/sections/RoomPreview";
import BookingWidget from "@/components/layout/BookingWidget";
import NewsletterForm from "@/components/sections/NewsletterForm";
import TestimonialSlider from "@/components/sections/TestimonialSlider";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building, Award, Shield, Star, TrendingUp, Users } from "lucide-react";
import { HOTEL_BRAND } from '@/lib/constants';

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": HOTEL_BRAND.name,
    "description": "East Africa's premier diplomatic retreat. Reimagined with architectural mastery, high-security configurations, and authentic Ethiopian hospitality.",
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bole District",
      "addressRegion": "Addis Ababa",
      "addressCountry": "Ethiopia"
    },
    "priceRange": "$$$"
  };

  return (
    <div className="bg-background text-foreground selection:bg-accent selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      
      <main>
        {/* Chapter 1: Arrival */}
        <Hero />
        
        {/* Trust Bar - Below Hero */}
        <section className="bg-foreground py-5 border-b border-white/8">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
              {[
                { label: 'Forbes Five-Star Candidate 2026', icon: Star },
                { label: 'UNWTO Partner Hotel, Ethiopia', icon: Building },
                { label: 'TripAdvisor Travellers\' Choice 2025', icon: Award },
                { label: 'ISO 22000 Certified Kitchen', icon: Shield },
                { label: '87% Avg. Occupancy Rate', icon: TrendingUp },
              ].map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] font-bold text-white/40">
                  <Icon size={10} className="text-accent/60" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chapter 2: Discovery - Brand Manifesto */}
        <section className="section-padding overflow-hidden bg-white">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Diplomatic Crossroads</span>
                <h2 className="text-5xl md:text-7xl font-serif leading-none">A Hub for <br /> Global Leaders</h2>
                <p className="text-editorial text-muted-foreground">
                  {HOTEL_BRAND.philosophy}
                </p>
                <div className="pt-6">
                  <Link href="/about" className="group flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] font-bold">
                    <span className="link-underline">Our Architectural Narrative</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative aspect-[4/5] md:aspect-video lg:aspect-[16/10] overflow-hidden rounded-medium group shadow-medium">
                <Image 
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop" 
                  alt="Swiss Inn Nexus Hotel Facade" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-[3s] ease-out" 
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Chapter 3: Accommodation - Real Room Inventory */}
        <RoomPreview />

        {/* Experience Split Section - Gastronomy & Coffee Ceremonies */}
        <section className="bg-muted py-24 md:py-40">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-medium shadow-2xl">
              <div className="relative h-[600px] group">
                <Image 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop" 
                  alt="Ta'em Traditional Ethiopian Restaurant" 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold mb-4">Gastronomy</span>
                  <h3 className="text-4xl font-serif mb-6">Ta&apos;em Traditional</h3>
                  <Link href="/dining" className="btn-luxury-outline text-white border-white/40 hover:bg-white hover:text-foreground w-fit rounded-small">
                    Explore Ethiopian Menu
                  </Link>
                </div>
              </div>
              <div className="relative h-[600px] group">
                <Image 
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop" 
                  alt="Ethiopian Coffee Lounge" 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold mb-4">Cultural Rituals</span>
                  <h3 className="text-4xl font-serif mb-6">Filiha Coffee Lounge</h3>
                  <Link href="/wellness" className="btn-luxury-outline text-white border-white/40 hover:bg-white hover:text-foreground w-fit rounded-small">
                    View Coffee Ceremonies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* State-of-the-Art Meetings & Events Conference Hall Section */}
        <section className="section-padding bg-white">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-7">
              <div className="relative aspect-video rounded-medium overflow-hidden group shadow-medium">
                <Image 
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop" 
                  alt="Swiss Inn Nexus Conference Room" 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-[3s]" 
                />
              </div>
            </div>
            
            <div className="lg:col-span-5 space-y-8">
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Summits & Banquets</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-none">Premier Conference Facilities</h2>
              <p className="text-editorial text-muted-foreground">
                Our state-of-the-art conference rooms are equipped with modern technology and high-speed Wi-Fi, perfect for business meetings, corporate events, and intimate gatherings in the heart of Bole.
              </p>
              <div className="pt-4">
                <Link href="/events" className="btn-luxury-primary py-4 px-10 rounded-small">
                  Request Event Proposal <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 4: Experiences - Business Infrastructure */}
        <Amenities />
        
        {/* Chapter 5: Trust - Guest Testimonials */}
        <TestimonialSlider />

        {/* Accolades Strip */}
        <section className="py-16 border-y border-border/60 bg-white">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
            <p className="text-[9px] uppercase tracking-[0.5em] text-muted-foreground/40 font-bold text-center mb-10">
              As Featured In & Recognized By
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6">
              {[
                'Condé Nast Traveller', 'Forbes Travel Guide', 'The New York Times', 
                'CNN Travel', 'Financial Times', 'African Business Magazine'
              ].map((pub) => (
                <span key={pub} className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors">
                  {pub}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Chapter 5: Trust - Editorial Insights */}
        <section className="section-padding bg-white border-t border-border/60">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold block mb-4">The Journal</span>
                <h2 className="text-5xl md:text-7xl font-serif">Addis Insights</h2>
              </div>
              <Link href="/blog" className="btn-luxury-outline px-12 rounded-small">Read Travel Chronicles</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "Bole District: A Corporate Travel & Briefing Guide", cat: "Business", date: "June 12, 2026", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000" },
                { title: "The Art of the Traditional Ethiopian Coffee Ceremony", cat: "Culture", date: "May 28, 2026", img: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1000" },
                { title: "Redefining High-Security Diplomatic Lodges in East Africa", cat: "Security", date: "May 15, 2026", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000" }
              ].map((post, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 1 }}
                  className="group cursor-pointer space-y-6"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-medium shadow-subtle">
                    <Image src={post.img} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[9px] uppercase tracking-[0.2em] font-bold text-accent">
                      <span>{post.cat}</span>
                      <span className="opacity-40">{post.date}</span>
                    </div>
                    <h3 className="text-2xl font-serif group-hover:text-accent transition-colors duration-300">{post.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Chapter 6: Newsletter - Diplomatic Circle */}
        <section className="bg-muted py-32 border-y border-border/60">
          <div className="max-w-screen-xl mx-auto px-6 text-center space-y-12">
            <div className="space-y-4">
              <h3 className="text-4xl md:text-6xl font-serif">Diplomatic Circle</h3>
              <p className="text-muted-foreground uppercase tracking-[0.4em] text-[10px] font-bold">
                Subscribe to receive regional security bulletins, summit updates, and executive suite benefits.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </section>

        {/* Chapter 7: Commitment - Verified Sustainability Community Ledger */}
        <ImpactDashboard />

        {/* Final CTA — Begin Your Stay */}
        <section className="bg-foreground py-40 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 50%, rgba(180,151,90,0.6) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(180,151,90,0.3) 0%, transparent 60%)`
            }}
          />
          <div className="relative z-10 max-w-screen-xl mx-auto px-6 text-center space-y-12">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold block">Begin Your Journey</span>
              <h2 className="text-5xl md:text-7xl font-serif text-white leading-none">
                Reserve Your<br />
                <span className="italic font-light">Sanctuary</span>
              </h2>
              <p className="text-white/40 text-editorial max-w-xl mx-auto">
                From Deluxe King residences to bulletproof Presidential Penthouses. Book directly and receive our exclusive Circle Member benefits.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" className="btn-luxury-primary py-6 px-16 bg-accent text-white hover:bg-accent/80 rounded-small">
                Book Your Stay <ArrowRight size={16} />
              </Link>
              <Link href="/rooms" className="btn-luxury-outline py-6 px-16 text-white border-white/20 hover:bg-white hover:text-foreground rounded-small">
                Explore All Residences
              </Link>
            </div>
            <p className="text-white/20 text-[9px] uppercase tracking-widest font-bold">
              Best Rate Guarantee · Free Cancellation on Most Rooms · Instant Confirmation
            </p>
          </div>
        </section>
      </main>

      <BookingWidget />
      <Footer />
    </div>
  );
}
