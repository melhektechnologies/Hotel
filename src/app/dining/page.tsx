'use client';

import { motion } from 'framer-motion';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { ArrowRight, Utensils, GlassWater, Flame, Calendar } from "lucide-react";
import Link from 'next/link';

const venues = [
  {
    id: "taem",
    name: "Ta'em Traditional",
    type: "Heritage Dining",
    chef: "Tigist Hailemariam",
    hours: "12:00 - 23:00",
    description: "A rich culinary exploration of traditional Ethiopian cooking. Enjoy freshly baked injera, slow-cooked doro wat, and kitfo, completed by an authentic live Ethiopian coffee ceremony.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200",
    icon: <Utensils size={16} />
  },
  {
    id: "pavilion",
    name: "The Grand Pavilion",
    type: "East African Fine Dining",
    chef: "Jean-Marc Dubois",
    hours: "06:00 - 23:00",
    description: "Blending contemporary European culinary methods with vibrant East African spices and local ingredients. Features high-ceiling glass architecture with views of the hotel gardens.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200",
    icon: <GlassWater size={16} />
  },
  {
    id: "club-lounge",
    name: "Skylight Club Lounge",
    type: "Executive Lounge",
    hours: "06:00 - 22:00",
    description: "Exclusive sanctuary for Executive and Suite guests, serving premium single-origin Ethiopian espresso, continental breakfast, afternoon tea, and evening cocktails.",
    image: "https://images.unsplash.com/photo-1550966841-3ee71a097083?q=80&w=1200",
    icon: <Flame size={16} />
  }
];

export default function DiningPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-white">
      <Navbar />

      <main>
        {/* Cinematic Hero */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000" 
              alt="Dining at Skylight"
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
              className="text-[10px] uppercase tracking-[0.8em] mb-8 block text-accent font-bold"
            >
              Gastronomy
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="text-display"
            >
              The Art of <br /> <span className="italic font-light">Gastronomy</span>
            </motion.h1>
          </div>
        </section>

        {/* Intro Manifesto */}
        <section className="section-padding bg-white">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">The Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">Flavor as a Narrative</h2>
            <p className="text-editorial text-muted-foreground">
              Dining at Skylight Hotel Addis Ababa is a celebration of flavor and culture. Our chefs are storytellers, using premium local ingredients—like organic highlands honey and single-origin coffee—combined with modern techniques to curate moments of sensory transcendence.
            </p>
          </div>
        </section>

        {/* Venues Showcase - Editorial Grid */}
        <section className="section-padding bg-muted/20">
          <div className="max-w-screen-2xl mx-auto space-y-48 md:space-y-64">
            {venues.map((venue, i) => (
              <motion.div 
                key={venue.id}
                id={venue.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col lg:flex-row gap-16 lg:gap-32 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="w-full lg:w-7/12 relative aspect-[16/10] rounded-sm overflow-hidden group shadow-2xl">
                  <Image 
                    src={venue.image} 
                    alt={venue.name}
                    fill
                    className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000" />
                </div>
                <div className="w-full lg:w-5/12 space-y-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold text-accent">
                      {venue.icon}
                      <span>{venue.type}</span>
                      <span className="opacity-20">/</span>
                      <span className="opacity-50">{venue.hours}</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-serif">{venue.name}</h2>
                    {venue.chef && (
                      <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Directorship of Chef {venue.chef}</p>
                    )}
                    <p className="text-editorial text-muted-foreground leading-relaxed">
                      {venue.description}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6 pt-6">
                    <button className="btn-luxury-primary px-12 py-5 flex items-center justify-center gap-3">
                      <Calendar size={14} /> Reserve Table
                    </button>
                    <button className="btn-luxury-outline px-12 py-5">
                      Explore Menu
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Private Experiences */}
        <section className="section-padding bg-foreground text-background overflow-hidden relative">
           <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
              <Image 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200" 
                alt="Private Dining Decor" 
                fill 
                className="object-cover"
              />
           </div>
           <div className="max-w-screen-2xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div className="space-y-12">
                 <div className="space-y-6">
                    <span className="text-[10px] uppercase tracking-[0.6em] text-accent font-bold">Exclusive</span>
                    <h2 className="text-5xl md:text-7xl font-serif text-white">Bespoke <br /> Epicurean <br /> Moments</h2>
                 </div>
                 <p className="text-editorial text-white/50 max-w-lg">
                    For those seeking absolute privacy and protocol-cleared events, we offer curated private dining on our garden terrace, in executive suites, or within our secure VIP boardrooms.
                 </p>
                 <div className="pt-8">
                    <Link href="/contact" className="btn-luxury bg-accent text-white hover:bg-white hover:text-foreground inline-flex">
                       Consult Our Sommelier & Chef <ArrowRight size={16} />
                    </Link>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
