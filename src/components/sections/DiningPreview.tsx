'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function DiningPreview() {
  return (
    <section className="py-24 md:py-32 bg-foreground text-background">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative aspect-square md:aspect-video lg:aspect-square overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1550966841-3ee5ad60d0d9?q=80&w=2070&auto=format&fit=crop"
            alt="Fine Dining at Skylight Hotel"
            fill
            className="object-cover transition-transform duration-[3s] hover:scale-110"
          />
          <div className="absolute inset-0 border-[20px] border-foreground/10 pointer-events-none" />
        </motion.div>

        <div className="space-y-8">
          <span className="text-xs uppercase tracking-[0.5em] text-accent font-bold block">Culinary Excellence</span>
          <h2 className="text-4xl md:text-6xl font-serif leading-tight">A Symphony of Flavors</h2>
          <p className="text-lg opacity-80 leading-relaxed font-light">
            From gourmet breakfasts to starlit dinners on our garden terraces, our culinary team orchestrates a world-class dining experience using the finest local ingredients and global techniques.
          </p>
          
          <div className="space-y-6 pt-6">
            <div className="flex items-start space-x-6 border-b border-white/10 pb-6">
              <span className="text-accent font-serif text-3xl">01</span>
              <div>
                <h4 className="text-xl font-serif mb-2">Ta&apos;em Traditional</h4>
                <p className="text-sm opacity-60">Signature traditional Ethiopian heritage dining and coffee ceremonies.</p>
              </div>
            </div>
            <div className="flex items-start space-x-6 border-b border-white/10 pb-6">
              <span className="text-accent font-serif text-3xl">02</span>
              <div>
                <h4 className="text-xl font-serif mb-2">The Grand Pavilion</h4>
                <p className="text-sm opacity-60">East African fine dining blended with contemporary European methods.</p>
              </div>
            </div>
            <div className="flex items-start space-x-6">
              <span className="text-accent font-serif text-3xl">03</span>
              <div>
                <h4 className="text-xl font-serif mb-2">Skylight Club Lounge</h4>
                <p className="text-sm opacity-60">Continental buffet, single-origin espresso, and evening cocktails for executive guests.</p>
              </div>
            </div>
          </div>

          <Link href="/dining" className="inline-block mt-10 px-10 py-4 border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-500 uppercase tracking-widest text-xs font-bold text-center">
            Explore Our Menus
          </Link>
        </div>
      </div>
    </section>
  );
}
