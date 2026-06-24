'use client';

import { motion } from 'framer-motion';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Sparkles, Flower2, Heart, Wind, ArrowRight, Compass } from "lucide-react";
import Link from 'next/link';

const treatments = [
  {
    title: "Ethio-Coffee Scrub & Polish",
    duration: "90 min",
    price: "$180",
    description: "Freshly roasted single-origin Ethiopian coffee grounds combined with local botanical oils to exfoliate, detoxify, and stimulate circulation.",
    category: "Body"
  },
  {
    title: "Nile Frankincense Therapy",
    duration: "75 min",
    price: "$210",
    description: "Therapeutic massage utilizing organic frankincense oil and sound healing to realign the nervous system and induce deep relaxation.",
    category: "Soul"
  },
  {
    title: "Highlands Herb Glow Facial",
    duration: "60 min",
    price: "$165",
    description: "Gentle exfoliation using wild Ethiopian highland herbs and active peptides for instantaneous cellular renewal and hydration.",
    category: "Face"
  }
];

export default function WellnessPage() {
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
              src="https://images.unsplash.com/photo-1544161515-4ae6ce6ea8a8?q=80&w=2000" 
              alt="Sacred Spa Sanctuary"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
          <div className="relative z-10 text-center text-white px-6">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-[10px] uppercase tracking-[0.8em] mb-8 block text-accent font-bold"
            >
              The Sacred Spa
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="text-display"
            >
              Sanctuary of <br /> <span className="italic font-light">Deep Peace</span>
            </motion.h1>
          </div>
        </section>

        {/* Philosophy - Editorial Split */}
        <section className="section-padding bg-white">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-5 space-y-12">
               <div className="space-y-6">
                  <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">The Philosophy</span>
                  <h2 className="text-5xl md:text-7xl font-serif leading-tight">Cellular <br /> Harmony</h2>
               </div>
               <p className="text-editorial text-muted-foreground">
                  Our approach to wellness transcends the superficial. We treat the human body as an interconnected ecosystem, combining ancient Ayurvedic wisdom with pioneering bio-hacking and aesthetic dermatology.
               </p>
               <div className="flex flex-wrap gap-8 pt-8">
                  {[
                    { icon: Sparkles, label: "Bio-Active" },
                    { icon: Flower2, label: "Holistic" },
                    { icon: Heart, label: "Regenerative" }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-3">
                       <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-accent">
                          <item.icon size={20} />
                       </div>
                       <span className="text-[9px] uppercase tracking-widest font-bold opacity-40">{item.label}</span>
                    </div>
                  ))}
               </div>
            </div>
            <div className="lg:col-span-7">
               <div className="relative aspect-[4/5] lg:aspect-[16/10] overflow-hidden rounded-sm group">
                  <Image 
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecee?q=80&w=1200" 
                    alt="Treatment Room" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-[3s]" 
                  />
               </div>
            </div>
          </div>
        </section>

        {/* Treatment Menu - Interactive List */}
        <section className="section-padding bg-muted/20">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-24 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Selected Rituals</span>
              <h2 className="text-4xl md:text-6xl font-serif">Skylight Signatures</h2>
            </div>
            
            <div className="space-y-4">
              {treatments.map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col md:flex-row md:items-center justify-between p-10 bg-white border border-border hover:border-accent transition-all duration-500 hover:shadow-xl hover:shadow-accent/5 cursor-pointer"
                >
                  <div className="space-y-2 max-w-xl">
                    <span className="text-[9px] uppercase tracking-widest text-accent font-bold">{t.category} Ritual</span>
                    <h3 className="text-2xl font-serif group-hover:text-accent transition-colors">{t.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{t.description}</p>
                  </div>
                  <div className="mt-6 md:mt-0 flex items-center gap-12 border-t md:border-t-0 border-border pt-6 md:pt-0">
                    <div className="text-right">
                       <p className="text-lg font-serif">{t.duration}</p>
                       <p className="text-[10px] uppercase tracking-widest opacity-40">{t.price}</p>
                    </div>
                    <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-500">
                       <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mindful Movement */}
        <section className="section-padding bg-foreground text-background">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative aspect-square md:aspect-video lg:aspect-square overflow-hidden rounded-sm order-2 lg:order-1">
              <Image 
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200" 
                alt="Yoga Pavilion" 
                fill 
                className="object-cover grayscale" 
              />
            </div>
            <div className="space-y-12 order-1 lg:order-2">
               <div className="space-y-6">
                  <span className="text-[10px] uppercase tracking-[0.6em] text-accent font-bold">Movement</span>
                  <h2 className="text-5xl md:text-7xl font-serif text-white">Primal <br /> Awareness</h2>
               </div>
               <p className="text-editorial text-white/50">
                  Join our resident wellness specialists for yoga salutations in our landscaped garden terrace or private mindfulness sessions in our executive wellness lounge. Discover the power of mindful motion.
               </p>
               <div className="flex flex-wrap gap-6 pt-8">
                  <Link href="/contact" className="btn-luxury bg-accent text-white hover:bg-white hover:text-foreground">
                    Consult Movement Specialist <Compass size={16} />
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
