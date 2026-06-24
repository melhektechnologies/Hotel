'use client';

import { motion } from 'framer-motion';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Zap, Command, Shield, ArrowRight, MousePointer2, Type, Palette, Move } from 'lucide-react';

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-white">
      <Navbar />

      <main className="pt-48 pb-32">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          
          <header className="mb-32 space-y-8">
            <span className="text-ui text-accent">Internal Asset 01</span>
            <h1 className="text-display">Design <br /> <span className="italic font-light">Ecosystem</span></h1>
            <p className="text-editorial max-w-2xl">The technical and aesthetic foundation of the Skylight Hotel brand. A system designed for infinite scalability, cinematic performance, and human serenity.</p>
          </header>

          <div className="space-y-48">
            
            {/* 1. Typography */}
            <section className="space-y-16">
              <div className="flex items-center gap-4 border-b border-border pb-6">
                <Type className="text-accent" size={20} />
                <h2 className="text-ui">Typography Scale</h2>
              </div>
              <div className="space-y-24">
                 <div className="space-y-4">
                    <p className="text-[9px] uppercase tracking-widest opacity-30">Display (Serif)</p>
                    <p className="text-display">The Art of Stillness</p>
                 </div>
                 <div className="space-y-4">
                    <p className="text-[9px] uppercase tracking-widest opacity-30">Editorial (Sans-Serif Light)</p>
                    <p className="text-editorial max-w-3xl">In the heart of Addis Ababa's diplomatic district, Skylight Hotel has orchestrated a sanctuary where local heritage meets modern international protocol. Every room and suite is a testament to the harmony between architectural precision and authentic Ethiopian hospitality.</p>
                 </div>
                 <div className="space-y-4">
                    <p className="text-[9px] uppercase tracking-widest opacity-30">UI Label (Sans-Serif Bold)</p>
                    <p className="text-ui">System Status: Operational • Response Protocol 120min</p>
                 </div>
              </div>
            </section>

            {/* 2. Color System */}
            <section className="space-y-16">
              <div className="flex items-center gap-4 border-b border-border pb-6">
                <Palette className="text-accent" size={20} />
                <h2 className="text-ui">Color Architecture</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
                 {[
                   { name: "Alabaster", hex: "#FDFCFB", class: "bg-[#FDFCFB] border border-border" },
                   { name: "Onyx", hex: "#0A0A0A", class: "bg-[#0A0A0A] text-white" },
                   { name: "Gold", hex: "#B4975A", class: "bg-[#B4975A]" },
                   { name: "Azure", hex: "#3B82F6", class: "bg-[#3B82F6]" },
                   { name: "Muted", hex: "#F5F2F0", class: "bg-[#F5F2F0] border border-border" },
                   { name: "Success", hex: "#10B981", class: "bg-success text-white" },
                   { name: "Warning", hex: "#F59E0B", class: "bg-warning text-white" },
                   { name: "Error", hex: "#EF4444", class: "bg-error text-white" }
                 ].map((color) => (
                    <div key={color.name} className="space-y-4">
                       <div className={`aspect-square rounded-sm ${color.class}`} />
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest">{color.name}</p>
                          <p className="text-[9px] opacity-40 font-mono">{color.hex}</p>
                       </div>
                    </div>
                 ))}
              </div>
            </section>

            {/* Spacing & Layout Scale */}
            <section className="space-y-16">
              <div className="flex items-center gap-4 border-b border-border pb-6">
                <Move className="text-accent" size={20} />
                <h2 className="text-ui">Spacing System (4px - 64px)</h2>
              </div>
              <div className="space-y-8 bg-muted/20 p-8 rounded-medium">
                {[
                  { name: "s4 (4px)", size: "w-1 h-4 bg-accent" },
                  { name: "s8 (8px)", size: "w-2 h-4 bg-accent" },
                  { name: "s12 (12px)", size: "w-3 h-4 bg-accent" },
                  { name: "s16 (16px)", size: "w-4 h-4 bg-accent" },
                  { name: "s24 (24px)", size: "w-6 h-4 bg-accent" },
                  { name: "s32 (32px)", size: "w-8 h-4 bg-accent" },
                  { name: "s48 (48px)", size: "w-12 h-4 bg-accent" },
                  { name: "s64 (64px)", size: "w-16 h-4 bg-accent" }
                ].map((space) => (
                  <div key={space.name} className="flex items-center gap-8 text-[11px] font-mono">
                    <span className="w-24 opacity-60">{space.name}</span>
                    <div className={space.size} />
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Button & Interaction System */}
            <section className="space-y-16">
              <div className="flex items-center gap-4 border-b border-border pb-6">
                <MousePointer2 className="text-accent" size={20} />
                <h2 className="text-ui">Interaction Language</h2>
              </div>
              <div className="flex flex-wrap gap-12 items-end">
                 <div className="space-y-4">
                    <p className="text-[9px] uppercase tracking-widest opacity-30">Primary Action</p>
                    <button className="btn-luxury-primary px-16 py-6"><span>Dispatch Message</span> <ArrowRight size={14} /></button>
                 </div>
                 <div className="space-y-4">
                    <p className="text-[9px] uppercase tracking-widest opacity-30">Secondary Action</p>
                    <button className="btn-luxury-outline px-16 py-6">Inquire Availability</button>
                 </div>
                 <div className="space-y-4">
                    <p className="text-[9px] uppercase tracking-widest opacity-30">Editorial Link</p>
                    <span className="link-underline text-ui cursor-pointer">Explore The Story</span>
                 </div>
              </div>
            </section>

            {/* 4. Layering, Radii & Elevations */}
            <section className="space-y-16">
              <div className="flex items-center gap-4 border-b border-border pb-6">
                <Shield className="text-accent" size={20} />
                <h2 className="text-ui">Surface, Radius & Elevation</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="p-8 bg-white rounded-small shadow-subtle border border-border space-y-6">
                    <span className="text-[10px] uppercase tracking-widest text-accent font-bold">Small Radius & Subtle Elevation</span>
                    <h3 className="text-xl font-serif">Standard Component</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">Radii set to 2px, elevation subtle. Used for input fields, action buttons, and nested items.</p>
                 </div>
                 <div className="p-8 bg-white rounded-medium shadow-medium border border-border space-y-6">
                    <span className="text-[10px] uppercase tracking-widest text-accent font-bold">Medium Radius & Medium Elevation</span>
                    <h3 className="text-xl font-serif">Container / Card</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">Radii set to 8px, elevation medium. Standard layout card for dashboard analytics, forms, and summaries.</p>
                 </div>
                 <div className="p-8 bg-white rounded-large shadow-high border border-border space-y-6">
                    <span className="text-[10px] uppercase tracking-widest text-accent font-bold">Large Radius & High Elevation</span>
                    <h3 className="text-xl font-serif">Command / Modal</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">Radii set to 24px, elevation high. Reserved for overlay drawers, command palettes, and primary modals.</p>
                 </div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
