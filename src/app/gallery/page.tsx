'use client';

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { X, Maximize2, Download, Share2, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = ["All", "Architecture", "Culinary", "Sanctuaries", "Events & Meetings"];

const assets = [
  { id: 1, src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200", cat: "Sanctuaries", title: "Executive Suite Suite", resolution: "8K UHD", orientation: "Landscape" },
  { id: 2, src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800", cat: "Architecture", title: "Main Lobby Geometry", resolution: "4K", orientation: "Portrait" },
  { id: 3, src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=800", cat: "Architecture", title: "Nexus Entrance Grand View", resolution: "8K", orientation: "Portrait" },
  { id: 4, src: "https://images.unsplash.com/photo-1550966841-3ee5ad60d0d9?q=80&w=800", cat: "Culinary", title: "Ta'em Heritage Dining Room", resolution: "4K", orientation: "Landscape" },
  { id: 5, src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200", cat: "Culinary", title: "Chef's Signature Ethiopian Plating", resolution: "8K UHD", orientation: "Landscape", span: "col-span-2 row-span-2" },
  { id: 6, src: "https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=800", cat: "Culinary", title: "Coffee Ceremony Lounge", resolution: "4K", orientation: "Portrait" },
  { id: 7, src: "https://images.unsplash.com/photo-1544161515-4ae6ce6ea8a8?q=80&w=800", cat: "Sanctuaries", title: "Nexus Wellness Entry", resolution: "8K", orientation: "Portrait" },
  { id: 8, src: "https://images.unsplash.com/photo-1519415510236-85592ac59c63?q=80&w=1200", cat: "Sanctuaries", title: "Ethio-Coffee Scrub Ritual", resolution: "8K UHD", orientation: "Landscape", span: "col-span-2" },
  { id: 9, src: "https://images.unsplash.com/photo-1540555700478-4be289fbecee?q=80&w=800", cat: "Sanctuaries", title: "Executive Business Workstation", resolution: "4K", orientation: "Portrait" },
  { id: 10, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800", cat: "Events & Meetings", title: "Nexus Grand Conference", resolution: "4K", orientation: "Landscape" },
  { id: 11, src: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=1200", cat: "Events & Meetings", title: "Diplomatic Boardroom Setup", resolution: "8K UHD", orientation: "Landscape", span: "col-span-2" },
];

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [selectedAsset, setSelectedAsset] = useState<typeof assets[0] | null>(null);

  const filtered = active === "All" ? assets : assets.filter((p) => p.cat === active);

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-white">
      <Navbar />

      <main className="pt-40">
        {/* Editorial Header */}
        <header className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="max-w-3xl space-y-6">
              <span className="text-[10px] uppercase tracking-[0.6em] text-accent font-bold block">Media Archive</span>
              <h1 className="text-display">Visual <br /> <span className="italic font-light">Asset Library</span></h1>
              <p className="text-editorial text-muted-foreground">A curated collection of high-fidelity brand assets documenting the evolution and essence of Swiss Inn Nexus Hotel.</p>
            </div>
            {/* Asset Categories */}
            <div className="flex flex-wrap gap-4 border-b border-border pb-4 w-full md:w-auto">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`text-[9px] uppercase tracking-widest font-bold px-4 py-2 transition-all ${
                    active === cat ? 'text-accent border-b border-accent' : 'opacity-40 hover:opacity-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Cinematic Grid */}
        <section className="pb-32 px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto">
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[300px]"
          >
            <AnimatePresence>
              {filtered.map((asset) => (
                <motion.div
                  key={asset.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "relative overflow-hidden group cursor-pointer bg-muted/20 rounded-sm",
                    asset.span || ""
                  )}
                  onClick={() => setSelectedAsset(asset)}
                >
                  <Image
                    src={asset.src}
                    alt={asset.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover transition-transform duration-[3s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-700 flex flex-col justify-end p-8">
                     <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 space-y-3">
                        <div className="flex justify-between items-center text-white">
                           <span className="text-[8px] uppercase tracking-widest font-bold bg-accent px-2 py-1">HQ {asset.resolution}</span>
                           <Maximize2 size={16} strokeWidth={1} />
                        </div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-white leading-tight">{asset.title}</p>
                     </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Asset Lightbox */}
        <AnimatePresence>
          {selectedAsset && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl flex items-center justify-center p-6 md:p-12 lg:p-24"
              onClick={() => setSelectedAsset(null)}
            >
              <button
                onClick={() => setSelectedAsset(null)}
                className="absolute top-12 right-12 text-foreground/40 hover:text-accent transition-colors"
              >
                <X size={32} strokeWidth={1} />
              </button>
              
              <div 
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-screen-2xl h-full items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="lg:col-span-8 relative w-full h-[50vh] lg:h-full group">
                  <Image
                    src={selectedAsset.src}
                    alt={selectedAsset.title}
                    fill
                    className="object-contain"
                  />
                </div>
                
                <div className="lg:col-span-4 space-y-12">
                   <div className="space-y-4">
                      <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">{selectedAsset.cat}</span>
                      <h2 className="text-4xl font-serif">{selectedAsset.title}</h2>
                      <div className="h-[1px] w-24 bg-accent/20" />
                   </div>

                   <div className="space-y-6">
                      <div className="flex justify-between border-b border-border pb-4 text-[10px] uppercase tracking-widest font-bold">
                         <span className="opacity-40">Resolution</span>
                         <span>{selectedAsset.resolution}</span>
                      </div>
                      <div className="flex justify-between border-b border-border pb-4 text-[10px] uppercase tracking-widest font-bold">
                         <span className="opacity-40">Orientation</span>
                         <span>{selectedAsset.orientation}</span>
                      </div>
                      <div className="flex justify-between border-b border-border pb-4 text-[10px] uppercase tracking-widest font-bold">
                         <span className="opacity-40">Shot with</span>
                         <span>Phase One IQ4</span>
                      </div>
                   </div>

                   <div className="flex flex-col gap-4">
                      <button className="btn-luxury-primary w-full py-5 flex items-center justify-center gap-3">
                         <Download size={16} /> Request High-Res Asset
                      </button>
                      <div className="flex gap-4">
                         <button className="btn-luxury-outline flex-1 py-5 flex items-center justify-center gap-3"><Share2 size={16} /> Share</button>
                         <button className="btn-luxury-outline flex-1 py-5 flex items-center justify-center gap-3"><Info size={16} /> Licensing</button>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
