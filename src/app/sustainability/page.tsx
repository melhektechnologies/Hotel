'use client';

import { motion } from 'framer-motion';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Leaf, Sun, Droplets, Recycle, ArrowRight, ShieldCheck } from "lucide-react";
import Link from 'next/link';

const initiatives = [
  {
    title: "Solar Hot Water Offset",
    description: "Our hotel integrates an advanced rooftop solar thermal array, one of the largest in Addis Ababa, supplying over 38% of our public area water-heating requirements.",
    icon: <Sun size={24} />,
    stat: "38.5% Energy Savings"
  },
  {
    title: "Closed-Loop Purified Water",
    description: "We operate an advanced glass bottling facility on-site, providing premium purified water across all suites and meetings rooms, eliminating single-use plastic completely.",
    icon: <Droplets size={24} />,
    stat: "200k+ Bottles Saved Annually"
  },
  {
    title: "Organic Waste Recovery",
    description: "Through our advanced composting system, 94% of our organic food waste is processed and converted into nutrient-rich fertilizer for our landscaped hotel gardens.",
    icon: <Recycle size={24} />,
    stat: "94% Waste Diversion Rate"
  }
];

export default function SustainabilityPage() {
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
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000" 
              alt="Sustainability at Skylight"
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
              Our Commitment
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="text-display"
            >
              Luxury Without <br /> <span className="italic font-light">Footprint</span>
            </motion.h1>
          </div>
        </section>

        {/* The Charter */}
        <section className="section-padding bg-white">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">The Charter</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">Preserving Paradise</h2>
            <p className="text-editorial text-muted-foreground">
              Skylight Hotel Addis Ababa was designed under the principle that world-class luxury must coexist with environmental stewardship. As a leading corporate and diplomatic hub in Africa, we implement advanced energy recovery, on-site water purification, and local agricultural sourcing to support Ethiopia's green growth.
            </p>
          </div>
        </section>

        {/* Initiatives Grid */}
        <section className="section-padding bg-muted/20">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {initiatives.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-12 border border-border space-y-8 flex flex-col justify-between hover:shadow-2xl transition-all duration-700 group"
              >
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-serif">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
                <div className="pt-6 border-t border-border">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-accent">{item.stat}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Marine Biology - Deep Dive */}
        <section className="section-padding bg-foreground text-background">
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <div className="space-y-6">
                  <span className="text-[10px] uppercase tracking-[0.6em] text-accent font-bold">Local Partnerships</span>
                  <h2 className="text-5xl md:text-7xl font-serif text-white">Sustainable <br /> Gastronomy</h2>
               </div>
                <p className="text-editorial text-white/50">
                  We partner with local agricultural cooperatives to source single-origin coffee, organic honey, and fresh produce directly from Ethiopian farmers, supporting the local economy and reducing carbon footprint. Guests can experience our cultural farm-to-table culinary sessions.
                </p>
                <div className="pt-8">
                  <Link href="/booking" className="btn-luxury bg-accent text-white hover:bg-white hover:text-foreground">
                    Connect With Our Sustainability Liaison <ShieldCheck size={16} />
                  </Link>
                </div>
            </div>
            <div className="relative aspect-square rounded-sm overflow-hidden border border-white/10">
               <Image 
                 src="https://images.unsplash.com/photo-1485201543483-f06c8d2a8fb4?q=80&w=1200" 
                 alt="Sustainable Sourcing" 
                 fill 
                 className="object-cover grayscale" 
               />
            </div>
          </div>
        </section>

        {/* ESG Reports - Investor Ready */}
        <section className="section-padding bg-white text-center">
          <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-4xl font-serif">Environmental Governance</h2>
            <p className="text-editorial text-muted-foreground">We maintain absolute transparency in our environmental impact. Download our latest ESG (Environmental, Social, and Governance) reports verified by Global Green Growth Institute.</p>
             <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="btn-luxury-outline px-12 py-5">2025 Impact Report (PDF)</button>
                <button className="btn-luxury-outline px-12 py-5">Local Agri-Sourcing Audit</button>
             </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
