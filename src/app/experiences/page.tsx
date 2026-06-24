'use client';

import { motion } from 'framer-motion';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Compass, Camera, MapPin, ArrowRight, ShieldCheck, Coffee } from "lucide-react";
import Link from 'next/link';

const experiencePackages = [
  {
    id: "coffee-masterclass",
    title: "Ethiopian Coffee Ritual",
    category: "Heritage",
    duration: "2 Hours",
    price: "$45",
    description: "A private sensory exploration of Ethiopia's finest single-origin coffee beans. Discover the history and art of traditional roasting, brewing, and tasting, led by our certified master roaster.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200",
    specs: ["Certified Roaster", "Single-Origin Flights", "Traditional Ceremony"]
  },
  {
    id: "entoto-expedition",
    title: "Entoto Mountain Sanctuary",
    category: "Exploration",
    duration: "5 Hours",
    price: "$180",
    description: "Travel to the lush forests of Mount Entoto overlooking Addis Ababa. Tour the historical palace of Emperor Menelik II, visit the modern Entoto Observatory, and enjoy a luxury picnic with panoramic city skyline views.",
    image: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=1200",
    specs: ["Private Protocol Escort", "Panoramic Views", "Luxury Picnic Box"]
  },
  {
    id: "cultural-passage",
    title: "Addis Cultural Passage",
    category: "Culture",
    duration: "4 Hours",
    price: "$120",
    description: "A professionally guided, security-assisted cultural excursion through Addis Ababa. Visit the National Museum (housing Lucy), Holy Trinity Cathedral, and experience the vibrant Mercato market bazaar.",
    image: "https://images.unsplash.com/photo-1485201543483-f06c8d2a8fb4?q=80&w=1200",
    specs: ["Professional Guide", "Security Escort", "Museum VIP Passes"]
  }
];

export default function ExperiencesPage() {
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
              alt="Experiences at Skylight"
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
              Curated Escapes
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="text-display"
            >
              Ethiopian <br /> <span className="italic font-light">Heritage</span>
            </motion.h1>
          </div>
        </section>

        {/* Narrative Intro */}
        <section className="section-padding bg-white">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">The Journeys</span>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">Moments of <br /> Discovery</h2>
            <p className="text-editorial text-muted-foreground">
              At Skylight Hotel, the city is your gateway. We curate cultural and historical narratives that connect you deeply to the rich heritage of Ethiopia and the dynamic pulse of modern Addis Ababa.
            </p>
          </div>
        </section>

        {/* Experience Showcase - Editorial Vertical */}
        <section className="section-padding bg-muted/20">
          <div className="max-w-screen-2xl mx-auto space-y-48 lg:space-y-64">
            {experiencePackages.map((exp, i) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col lg:flex-row gap-16 lg:gap-32 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="w-full lg:w-7/12 relative aspect-[16/10] group rounded-sm overflow-hidden shadow-3xl">
                  <Image 
                    src={exp.image} 
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                  />
                  <div className="absolute top-8 left-8">
                     <span className="px-6 py-3 bg-background/90 backdrop-blur-md text-[10px] uppercase tracking-widest font-bold text-accent border border-border shadow-2xl">
                       {exp.category}
                     </span>
                  </div>
                </div>
                <div className="w-full lg:w-5/12 space-y-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">
                      <span>{exp.duration}</span>
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      <span>{exp.price} Per Journey</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-serif leading-tight">{exp.title}</h2>
                    <p className="text-editorial text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                  
                  {/* Spec List */}
                  <div className="flex flex-wrap gap-4">
                     {exp.specs.map((spec, j) => (
                       <div key={j} className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold opacity-60 bg-white border border-border px-4 py-2">
                          <Compass size={12} className="text-accent" />
                          {spec}
                       </div>
                      ))}
                  </div>

                  <div className="pt-8">
                    <button className="btn-luxury-primary w-full md:w-auto px-16 py-6 flex items-center justify-center gap-3">
                      Inquire Availability <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Custom Charter CTA */}
        <section className="section-padding bg-foreground text-background">
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
             <div className="space-y-12">
                <div className="space-y-6">
                   <span className="text-[10px] uppercase tracking-[0.6em] text-accent font-bold">Bespoke Protocol</span>
                   <h2 className="text-5xl md:text-7xl font-serif text-white">Custom delegation <br /> Arrangements</h2>
                </div>
                <p className="text-editorial text-white/50">
                   Our Protocol Desk specializes in complex arrangements. From coordinating private, security-cleared transfers to organizing exclusive cultural tours of historical sites — we ensure absolute comfort and access.
                </p>
                <div className="pt-8 flex flex-col sm:flex-row gap-6">
                   <Link href="/contact" className="btn-luxury bg-accent text-white hover:bg-white hover:text-foreground">
                      Consult Our Protocol Officer <Compass size={16} />
                   </Link>
                </div>
             </div>
             <div className="relative aspect-square lg:aspect-[4/5] rounded-sm overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200" 
                  alt="Protocol Escort" 
                  fill 
                  className="object-cover grayscale" 
                />
             </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
