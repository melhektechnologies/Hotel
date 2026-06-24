'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Award, Clock, Globe, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { HOTEL_BRAND } from '@/lib/constants';

const team = [
  { name: "Dawit Wolde", role: "General Manager", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" },
  { name: "Saba Tesfaye", role: "Director of Events & Security", image: "https://images.unsplash.com/photo-1494790108755-2616b612b2c5?q=80&w=800&auto=format&fit=crop" },
  { name: "Yonas Alemayehu", role: "Executive Chef", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop" },
  { name: "Tewodros Kassahun", role: "Head of VIP Protocol", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop" },
];

const milestones = [
  { year: "2018", event: "Skylight Hotel Addis Ababa opens its doors in the Bole District, strategically located minutes from Bole International Airport.", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800" },
  { year: "2020", event: "Expands its events facilities to include East Africa's largest pillarless Grand Ballroom, catering to international diplomatic summits.", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800" },
  { year: "2022", event: "Integrates full diplomatic-grade security protocols, biometric access control, and specialized embassy catering teams.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800" },
  { year: "2025", event: "Achieves carbon-neutral operations for major diplomatic summits through Oromia reforestation offsets and rooftop solar systems.", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800" },
];

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-white">
      <Navbar />

      <main ref={containerRef}>
        {/* Cinematic Hero */}
        <section className="relative h-screen overflow-hidden flex items-center justify-center">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=2080&auto=format&fit=crop"
              alt="Skylight Hotel Addis Ababa Story"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
          
          <div className="relative z-10 text-center text-white px-6">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-[10px] uppercase tracking-[0.6em] text-accent font-bold mb-8 block"
            >
              The Skylight Heritage
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="text-display"
            >
              The Art of <br /> <span className="italic font-light">Sanctuary</span>
            </motion.h1>
          </div>
        </section>

        {/* Brand Manifesto - Editorial Layout */}
        <section className="section-padding bg-white">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 space-y-12">
                <div className="space-y-6">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Our Philosophy</span>
                  <h2 className="text-5xl md:text-7xl font-serif">A Soulful Journey</h2>
                </div>
                <p className="text-editorial text-muted-foreground">
                  {HOTEL_BRAND.philosophy}
                </p>
                <div className="pt-8 border-t border-border flex gap-12">
                   <div className="space-y-2">
                     <p className="text-2xl font-serif">2018</p>
                     <p className="text-[9px] uppercase tracking-widest opacity-40">Founded</p>
                   </div>
                   <div className="space-y-2">
                     <p className="text-2xl font-serif">100%</p>
                     <p className="text-[9px] uppercase tracking-widest opacity-40">Carbon Neutral Events</p>
                   </div>
                   <div className="space-y-2">
                     <p className="text-2xl font-serif">372</p>
                     <p className="text-[9px] uppercase tracking-widest opacity-40">Luxury Rooms</p>
                   </div>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="relative aspect-[4/5] lg:aspect-[16/10] rounded-sm overflow-hidden group">
                   <Image 
                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200" 
                    alt="Resort Aerial" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-[3s]" 
                   />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Milestone Vertical Parallax */}
        <section className="section-padding bg-muted/30">
          <div className="max-w-screen-xl mx-auto space-y-48 lg:space-y-64">
            {milestones.map((m, i) => (
              <motion.div 
                key={m.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={`lg:col-span-6 ${i % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-square md:aspect-video lg:aspect-[4/3] rounded-sm overflow-hidden">
                    <Image src={m.image} alt={m.year} fill className="object-cover" />
                  </div>
                </div>
                <div className={`lg:col-span-5 ${i % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'} space-y-6`}>
                  <span className="text-4xl md:text-6xl font-serif text-accent/30">{m.year}</span>
                  <h3 className="text-3xl md:text-4xl font-serif">{m.event}</h3>
                  <div className="w-12 h-[1px] bg-accent" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Leadership Team - Grid of Excellence */}
        <section className="section-padding bg-foreground text-background">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
               <div className="max-w-2xl space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.6em] text-accent font-bold">The Visionaries</span>
                  <h2 className="text-5xl md:text-7xl font-serif text-white">The Leadership of Skylight</h2>
               </div>
               <Link href="/booking" className="btn-luxury-outline text-white border-white/20 hover:bg-white hover:text-foreground">Reserve Stay</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {team.map((member, i) => (
                <motion.div 
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 1 }}
                  className="group space-y-6"
                >
                  <div className="relative aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-[1.5s]">
                    <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-110 transition-transform duration-[3s]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif group-hover:text-accent transition-colors">{member.name}</h3>
                    <p className="text-[9px] uppercase tracking-[0.4em] opacity-40 font-bold">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Impact CTA */}
        <section className="section-padding bg-white text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Sustainability</span>
            <h2 className="text-4xl md:text-6xl font-serif">Pioneering Urban Sustainability</h2>
            <p className="text-editorial text-muted-foreground">
              We believe that true luxury is sustainable. From our rooftop thermal arrays to our local community partnerships and reforestation initiatives in Oromia, Skylight Hotel Addis Ababa is committed to preserving the Ethiopian highlands for generations to come.
            </p>
            <div className="pt-8 flex flex-col md:flex-row gap-6 justify-center">
              <Link href="/sustainability" className="btn-luxury-primary px-12">Our Commitment</Link>
              <Link href="/blog" className="btn-luxury-outline px-12">Latest Reports</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
