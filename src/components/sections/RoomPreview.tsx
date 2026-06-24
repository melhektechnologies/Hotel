'use client';

import { motion } from 'framer-motion';
import { ROOMS } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Users, Maximize, Wind } from 'lucide-react';

export default function RoomPreview() {
  return (
    <section className="bg-muted py-32 md:py-48 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold block mb-4">Accommodations</span>
            <h2 className="text-display mb-8">Exquisite Sanctuaries</h2>
            <p className="text-editorial text-muted-foreground">
              Each residence is structured to accommodate modern executives and diplomats, combining high-security glazing, ergonomically configured workspaces, and breathtaking views of the Addis Ababa skyline.
            </p>
          </div>
          <Link href="/rooms" className="btn-luxury-outline px-12 group">
            View All Residences <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="space-y-32 md:space-y-48">
          {ROOMS.map((room, i) => (
            <motion.div 
              key={room.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Room Image - Cinematic Reveal */}
              <div className="w-full lg:w-7/12 relative group overflow-hidden rounded-sm">
                <div className="aspect-[16/10] relative">
                  <Image 
                    src={room.images[0]} 
                    alt={room.name} 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-[3s] group-hover:scale-105" 
                  />
                </div>
                <div className="absolute top-8 left-8 bg-background/90 backdrop-blur-md px-6 py-4 border border-border shadow-2xl">
                  <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-accent">Starts From</span>
                  <p className="text-xl font-serif mt-1">${room.basePrice.toLocaleString()}<span className="text-[10px] opacity-40 ml-1">/ NIGHT</span></p>
                </div>
              </div>

              {/* Room Content - Detail Oriented */}
              <div className="w-full lg:w-5/12 space-y-10">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">{room.category}</span>
                  <h3 className="text-4xl md:text-5xl font-serif">{room.name}</h3>
                  <p className="text-editorial text-muted-foreground leading-relaxed">
                    {room.description}
                  </p>
                </div>

                {/* Spec Grid */}
                <div className="grid grid-cols-3 gap-8 py-8 border-y border-border">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 opacity-40">
                      <Maximize size={14} />
                      <span className="text-[9px] uppercase tracking-widest font-bold">Area</span>
                    </div>
                    <p className="text-xs font-bold tracking-widest">{room.size}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 opacity-40">
                      <Users size={14} />
                      <span className="text-[9px] uppercase tracking-widest font-bold">Capacity</span>
                    </div>
                    <p className="text-xs font-bold tracking-widest">{room.capacity}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 opacity-40">
                      <Wind size={14} />
                      <span className="text-[9px] uppercase tracking-widest font-bold">View</span>
                    </div>
                    <p className="text-xs font-bold tracking-widest">{room.view}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  {room.features.slice(0, 3).map((feature, j) => (
                    <span key={j} className="text-[9px] uppercase tracking-widest px-4 py-2 bg-white border border-border font-bold">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="pt-8">
                  <Link href={`/rooms/${room.slug}`} className="btn-luxury-primary px-12 w-full md:w-auto">
                    <span>Explore Details</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
