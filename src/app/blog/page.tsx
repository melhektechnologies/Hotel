'use client';

import { useState, useMemo } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, Filter } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

const articles = [
  {
    slug: "coffee-ceremony-heritage",
    category: "Culture",
    title: "The Coffee Ceremony: Ethiopia's Heritage of Stillness",
    excerpt: "In the fast-paced corridors of Bole's diplomatic district, the traditional coffee ceremony stands as an ancient ritual of pauses, connection, and rich narrative.",
    readTime: "5 min read",
    date: "May 8, 2026",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    slug: "highland-harvests-chef-yonas",
    category: "Gastronomy",
    title: "Highland Harvests: Chef Yonas's Ethos of Ethiopian Gastronomy",
    excerpt: "Executive Chef Yonas Alemayehu details his sourcing philosophy, bringing highland premium teff, local spices, and organic micro-greens to international banquets.",
    readTime: "7 min read",
    date: "May 3, 2026",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
  {
    slug: "urban-horizon-sunrise-skyline",
    category: "Business",
    title: "Urban Horizon: Viewing Sunrise Across the Ethiopian Highlands",
    excerpt: "Witnessing dawn break over Mount Entoto from the Skylight Presidential Penthouse. The shifting light patterns over Addis Ababa's skyline.",
    readTime: "4 min read",
    date: "April 28, 2026",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
  {
    slug: "diplomatic-security-protocol",
    category: "Security",
    title: "Diplomatic Protocol: Securing High-Level Events in East Africa",
    excerpt: "A comprehensive look behind the scenes at how the hotel secures international AU/UN delegates and secures cross-regional meetings.",
    readTime: "6 min read",
    date: "April 20, 2026",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
    featured: false,
  },
];

const categories = ["All", "Culture", "Gastronomy", "Security", "Business"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredArticles = useMemo(() => {
    if (activeCategory === "All") return articles;
    return articles.filter(a => a.category === activeCategory);
  }, [activeCategory]);

  const featured = articles.find((a) => a.featured);

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-white">
      <Navbar />

      <main className="pt-40">
        {/* Editorial Header */}
        <header className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="max-w-3xl space-y-6">
              <span className="text-[10px] uppercase tracking-[0.6em] text-accent font-bold block">The Skylight Journal</span>
              <h1 className="text-display">Stories of <br /> <span className="italic font-light">Timelessness</span></h1>
            </div>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-4 border-b border-border pb-4 w-full md:w-auto">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[9px] uppercase tracking-widest font-bold px-4 py-2 transition-all ${
                    activeCategory === cat ? 'text-accent border-b border-accent' : 'opacity-40 hover:opacity-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Featured - Only show if All is selected */}
        <AnimatePresence mode="wait">
          {activeCategory === "All" && featured && (
            <motion.section 
              key="featured"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto mb-32"
            >
              <Link href={`/blog/${featured.slug}`} className="group block relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center bg-muted/30 overflow-hidden rounded-sm">
                  <div className="lg:col-span-7 relative aspect-video lg:aspect-[16/9]">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                    />
                  </div>
                  <div className="lg:col-span-5 p-12 lg:p-20 space-y-8">
                    <span className="text-[10px] uppercase tracking-widest text-accent font-bold">Featured Story</span>
                    <h2 className="text-4xl md:text-5xl font-serif leading-tight group-hover:text-accent transition-colors duration-500">
                      {featured.title}
                    </h2>
                    <p className="text-editorial text-muted-foreground line-clamp-3">{featured.excerpt}</p>
                    <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">
                      <span>{featured.date}</span>
                      <span className="flex items-center gap-2"><Clock size={12} /> {featured.readTime}</span>
                    </div>
                    <div className="pt-4 flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold">
                      <span className="link-underline">Read Narrative</span>
                      <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Article Grid */}
        <section className="section-padding bg-white">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24"
            >
              <AnimatePresence>
                {filteredArticles.filter(a => activeCategory === "All" ? !a.featured : true).map((article) => (
                  <motion.div
                    key={article.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link href={`/blog/${article.slug}`} className="group block space-y-8">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                        />
                        <div className="absolute top-6 left-6">
                           <span className="px-4 py-2 bg-background/90 backdrop-blur-md text-[9px] uppercase tracking-widest font-bold text-accent border border-border">
                             {article.category}
                           </span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-serif leading-snug group-hover:text-accent transition-colors duration-500">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{article.excerpt}</p>
                        <div className="pt-4 flex justify-between items-center text-[9px] uppercase tracking-[0.2em] font-bold opacity-40">
                          <span>{article.date}</span>
                          <span className="flex items-center gap-2"><Clock size={11} /> {article.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Editorial Footer CTA */}
        <section className="section-padding bg-muted/20 border-y border-border text-center">
           <div className="max-w-2xl mx-auto space-y-12">
              <h2 className="text-4xl font-serif">Deepen Your Journey</h2>
              <p className="text-editorial text-muted-foreground">Subscribe to the Skylight Journal to receive curated Addis Ababa insights and exclusive diplomatic updates directly in your inbox.</p>
              {/* Note: In a real app, I'd put the NewsletterForm here */}
              <div className="flex justify-center">
                 <Link href="#newsletter" className="btn-luxury-primary px-12">Join The Inner Circle</Link>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
