'use client';

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Ambassador Helen Vance",
    location: "Washington D.C., USA",
    rating: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    text: "Skylight Addis Ababa provides an unmatched level of security, service, and convenience for diplomatic missions. The Diplomatic Suite was secure and comfortable, and the protocol team was exceptionally professional.",
    stay: "Diplomatic Suite · 5 Nights",
  },
  {
    name: "David Osei",
    location: "Accra, Ghana",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    text: "As a frequent corporate traveler visiting the UNECA and AU headquarters, Skylight is my go-to hotel in Addis. The high-speed fiber internet and the Executive Club Lounge are optimal for business operations.",
    stay: "Executive Business Room · 6 Nights",
  },
  {
    name: "Dr. Kenji Tanaka",
    location: "Geneva, Switzerland",
    rating: 5,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
    text: "The hosting of our international summit in the Skylight Grand Ballroom was flawless. The pillarless architecture, VIP holding lounges, and simultaneous translation setups exceeded our expectations.",
    stay: "Presidential Penthouse · 4 Nights",
  },
  {
    name: "Valentina Rossi",
    location: "Milan, Italy",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b2c5?q=80&w=200&auto=format&fit=crop",
    text: "The contemporary architecture combined with authentic touches of Ethiopian heritage is stunning. The coffee lounge serves some of the best single-origin espresso I've ever experienced.",
    stay: "Executive Suite · 7 Nights",
  },
];

export default function TestimonialsPage() {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 text-center px-6">
        <span className="text-xs uppercase tracking-[0.6em] text-accent font-bold mb-6 block">Guest Stories</span>
        <h1 className="text-5xl md:text-7xl font-serif mb-8">Words from Our Guests</h1>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          The truest measure of luxury is not what we say about ourselves, but what our guests say after they leave.
        </p>
      </section>

      {/* Featured Testimonial Slider */}
      <section className="py-20 bg-foreground text-background px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center"
            >
              <div className="md:col-span-2 text-center md:text-left space-y-6">
                <div className="relative w-24 h-24 mx-auto md:mx-0 rounded-full overflow-hidden border-2 border-accent">
                  <Image src={testimonials[active].image} alt={testimonials[active].name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-serif">{testimonials[active].name}</h3>
                  <p className="text-[10px] uppercase tracking-widest opacity-50 mt-1">{testimonials[active].location}</p>
                </div>
                <div className="flex gap-1 justify-center md:justify-start">
                  {[...Array(testimonials[active].rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-[10px] uppercase tracking-widest text-accent font-bold">{testimonials[active].stay}</p>
              </div>

              <div className="md:col-span-3 space-y-8">
                <Quote size={48} className="text-accent/20" />
                <blockquote className="text-xl md:text-2xl font-light leading-relaxed italic opacity-90">
                  "{testimonials[active].text}"
                </blockquote>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Dots */}
          <div className="flex justify-center gap-3 mt-16">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-300 rounded-full ${i === active ? "w-8 h-2 bg-accent" : "w-2 h-2 bg-white/20"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Grid Reviews */}
      <section className="py-32 px-6 md:px-12 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="p-10 border border-border hover:border-accent transition-all duration-500 space-y-6 group bg-white">
              <div className="flex items-center space-x-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-serif text-lg">{t.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest opacity-50">{t.location}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={12} className="text-accent fill-accent" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed italic text-sm">"{t.text}"</p>
              <p className="text-[10px] uppercase tracking-widest text-accent font-bold">{t.stay}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "4.98", label: "Average Rating" },
            { value: "12,000+", label: "Guest Reviews" },
            { value: "98%", label: "Recommend Us" },
            { value: "#1", label: "Hotel in Addis Ababa" },
          ].map((s) => (
            <div key={s.label} className="space-y-2">
              <div className="text-4xl font-serif text-accent">{s.value}</div>
              <p className="text-[10px] uppercase tracking-widest opacity-60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
