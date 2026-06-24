'use client';

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { Coffee, Wind, Maximize2, ShieldCheck, MapPin } from "lucide-react";
import { ROOMS } from "@/lib/constants";

export default function RoomsPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2080&auto=format&fit=crop" 
          alt="Swiss Inn Nexus Hotel Guest Rooms Facade"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-center text-white space-y-4">
          <h1 className="text-5xl md:text-7xl font-serif tracking-tight">Residences & Suites</h1>
          <p className="text-xs uppercase tracking-[0.5em] opacity-80">Diplomatic Security & Cultural Serenity</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center space-y-6">
        <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Refined Sanctuary</span>
        <h2 className="text-4xl font-serif italic text-foreground">A Legacy of Comfort in Addis Ababa</h2>
        <p className="text-muted-foreground leading-relaxed font-light text-editorial">
          Our accommodations are designed to exceed global luxury hospitality standards. From Deluxe King rooms for business delegates to secure, bulletproof Diplomatic Suites, experience state-of-the-art workstations, high-speed fiber connectivity, and dedicated Butler service.
        </p>
      </section>

      {/* Room Listing */}
      <section className="pb-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="space-y-32">
          {ROOMS.map((room, index) => (
            <div key={room.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-center`}>
              <div className="w-full lg:w-7/12 relative aspect-video overflow-hidden rounded-medium shadow-medium">
                <Image 
                  src={room.images[0]} 
                  alt={room.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="w-full lg:w-5/12 space-y-8">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-accent font-bold">{room.category} • {room.floor}</span>
                  <h3 className="text-3xl md:text-4xl font-serif">{room.name}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm font-medium">{room.description}</p>
                
                <div className="grid grid-cols-2 gap-6 py-6 border-y border-border/60 text-xs">
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <Maximize2 size={14} className="text-accent" />
                    <span className="font-semibold">{room.size} Space</span>
                  </div>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <Coffee size={14} className="text-accent" />
                    <span className="font-semibold">{room.breakfast.split(' ')[0]} Breakfast Included</span>
                  </div>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <ShieldCheck size={14} className="text-accent" />
                    <span className="font-semibold">Flexible Cancellation</span>
                  </div>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <MapPin size={14} className="text-accent" />
                    <span className="font-semibold">{room.view.split(' ')[0]} Skyline Views</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div>
                    <span className="text-3xl font-serif">${room.basePrice}</span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground ml-2">/ night</span>
                  </div>
                  <Link 
                    href={`/rooms/${room.id}`}
                    className="btn-luxury-primary py-4 px-10 rounded-small cursor-pointer"
                  >
                    Explore Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
