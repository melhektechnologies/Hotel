'use client';

import { motion } from 'framer-motion';
import { Sun, Droplets, Leaf, Zap, ArrowUpRight, BarChart3, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ImpactDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchImpact() {
      try {
        const res = await fetch('/api/impact');
        if (!res.ok) throw new Error();
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchImpact();
  }, []);

  const metrics = [
    { 
      label: "Solar Energy Offset", 
      value: data?.metrics.solarOutput.value ? `${data.metrics.solarOutput.value}MW` : "1.2MW", 
      sub: data?.metrics.solarOutput.status || "Solar Grid Active", 
      icon: <Sun size={20} />, 
      color: "text-amber-500",
      description: "Our 1.2MW rooftop solar microgrid powers 40% of public areas and executive lounges."
    },
    { 
      label: "Local Employment", 
      value: data?.metrics.coralBiomass.value ? `${data.metrics.coralBiomass.value}%` : "92%", 
      sub: data?.metrics.coralBiomass.status || "Addis Community Hiring", 
      icon: <Droplets size={20} />, 
      color: "text-cyan-500",
      description: "92% of staff are Ethiopian nationals trained in world-class luxury service protocols."
    },
    { 
      label: "Water Recycled", 
      value: data?.metrics.wasteDiversion.value ? `${data.metrics.wasteDiversion.value}%` : "95.5%", 
      sub: data?.metrics.wasteDiversion.status || "Greywater Filtration", 
      icon: <Leaf size={20} />, 
      color: "text-emerald-600",
      description: "95% of our laundry and garden irrigation uses fully treated, recycled gray water."
    }
  ];

  return (
    <section className="section-padding bg-foreground text-background overflow-hidden relative">
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.6em] text-accent font-bold">
              <BarChart3 size={14} />
              <span>Real-Time Operations Ledger</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-white">The Anatomy of <br /> <span className="italic font-light">Sustainability</span></h2>
          </div>
          <button className="btn-luxury border-white/20 text-white hover:bg-white hover:text-foreground flex items-center gap-3">
             View ESG Audit <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, i) => (
            <motion.div 
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/5 border border-white/10 p-10 space-y-12 group hover:bg-white/10 transition-all duration-700 rounded-sm"
            >
              <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${metric.color} shadow-inner`}>
                  {metric.icon}
                </div>
                <div className="text-right">
                   <p className="text-5xl md:text-6xl font-serif text-white tracking-tighter">{metric.value}</p>
                   <p className="text-[10px] uppercase tracking-widest text-accent font-bold mt-2">{metric.sub}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-serif text-white/90">{metric.label}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-light">
                  {metric.description}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex justify-between items-center text-[9px] uppercase tracking-widest font-bold text-white/20">
                <span>Verified by GGGI</span>
                <span className="flex items-center gap-2">Live Data <Zap size={10} className="animate-pulse text-accent" /></span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Transparency Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 2 }}
          className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <div className="flex gap-12 text-[9px] uppercase tracking-[0.3em] font-bold text-white/30">
            <span>Audit Authority: UNEP</span>
            <span>Digital Twin: Active</span>
            <span>Security: 256-bit Encrypted</span>
          </div>
          <p className="text-[9px] uppercase tracking-[0.5em] text-accent font-bold">Skylight Operations Platform v2.0</p>
        </motion.div>
      </div>
    </section>
  );
}
