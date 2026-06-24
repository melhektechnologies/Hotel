'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Shield, Sparkles, Building2, Coffee, Plane, GlassWater } from 'lucide-react';

const amenities = [
  {
    icon: <Shield size={24} strokeWidth={1} />,
    title: "Diplomatic Security Protocol",
    desc: "Rigorous access control checkpoints, armored motorcade logistics, and bulletproof suite configurations trusted by world leaders and embassy delegates."
  },
  {
    icon: <Building2 size={24} strokeWidth={1} />,
    title: "The Grand Conference Hub",
    desc: "Includes the Skylight Grand Ballroom, accommodating up to 2,000 delegates. Complemented by boardrooms with secure encrypted feeds for summit sessions."
  },
  {
    icon: <Coffee size={24} strokeWidth={1} />,
    title: "Heritage Coffee Ceremonies",
    desc: "Experience the ritual of traditional Ethiopian coffee, featuring premium single-origin Yirgacheffe and Sidamo beans roasted fresh in our lobby lounge."
  },
  {
    icon: <Plane size={24} strokeWidth={1} />,
    title: "Bole Airport Shuttle Service",
    desc: "Complimentary luxury shuttle transfers running every 30 minutes. Fast-track custom clearance arrangements available for diplomatic passport holders."
  },
  {
    icon: <Sparkles size={24} strokeWidth={1} />,
    title: "Skylight Executive Club Lounge",
    desc: "Private check-in desks, executive workstations with printing facilities, and complimentary evening cocktails on our panoramic club floor."
  },
  {
    icon: <GlassWater size={24} strokeWidth={1} />,
    title: "Traditional & Fine Dining",
    desc: "Ta'em Traditional Ethiopian restaurant serves authentic stews and injera, alongside The Grand Pavilion offering world-class continental cuisine."
  }
];

export default function Amenities() {
  return (
    <section className="section-padding bg-foreground text-background">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Section Header */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.6em] text-accent font-bold block">The Skylight Standard</span>
              <h2 className="text-5xl md:text-7xl font-serif">Diplomatic <br /> Excellence</h2>
              <p className="text-editorial text-white/60">
                At Skylight, luxury is defined by seamless security, state-of-the-art business infrastructure, and the warm anticipation of your travel needs in Addis Ababa.
              </p>
            </div>
            
            <div className="aspect-[4/3] relative rounded-medium overflow-hidden group">
              <Image 
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200" 
                alt="Skylight Hotel Lobby Lounge" 
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-[3s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {amenities.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="space-y-6 group"
              >
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-serif">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-white/50 group-hover:text-white/80 transition-colors duration-500">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
