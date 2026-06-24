'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: "Ambassador Helen Vance",
    location: "Washington D.C., USA",
    rating: 5,
    text: "Skylight Addis Ababa provides an unmatched level of security, service, and convenience for diplomatic missions. The Diplomatic Suite was secure and comfortable, and the protocol team was exceptionally professional.",
    stay: "Diplomatic Suite · 5 Nights",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "David Osei",
    location: "Accra, Ghana",
    rating: 5,
    text: "As a frequent corporate traveler visiting the UNECA and AU headquarters, Skylight is my go-to hotel in Addis. The high-speed fiber internet and the Executive Club Lounge are optimal for business operations.",
    stay: "Executive Business Room · 6 Nights",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    name: "Dr. Kenji Tanaka",
    location: "Geneva, Switzerland",
    rating: 5,
    text: "The hosting of our international summit in the Skylight Grand Ballroom was flawless. The pillarless architecture, VIP holding lounges, and simultaneous translation setups exceeded our expectations.",
    stay: "Presidential Penthouse · 4 Nights",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
  },
];

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-32 bg-foreground text-background overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div>
            <span className="text-xs uppercase tracking-[0.5em] text-accent font-bold block mb-4">Voices of Skylight</span>
            <h2 className="text-4xl md:text-6xl font-serif">Guest Stories</h2>
          </div>
          <div className="flex gap-4 mt-8 md:mt-0">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center"
          >
            {/* Author */}
            <div className="md:col-span-2 flex flex-col gap-6">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-accent">
                <Image
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-serif">{testimonials[current].name}</h3>
                <p className="text-[10px] uppercase tracking-widest opacity-40 mt-1">
                  {testimonials[current].location}
                </p>
              </div>
              <div className="flex gap-1">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-accent fill-accent" />
                ))}
              </div>
              <p className="text-[10px] uppercase tracking-widest text-accent font-bold">
                {testimonials[current].stay}
              </p>
            </div>

            {/* Quote */}
            <div className="md:col-span-3 space-y-8">
              <Quote size={52} className="text-accent/20" />
              <blockquote className="text-xl md:text-2xl font-light leading-relaxed italic opacity-90">
                "{testimonials[current].text}"
              </blockquote>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex gap-3 mt-16">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-[2px] transition-all duration-500 ${
                i === current ? 'w-10 bg-accent' : 'w-4 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
