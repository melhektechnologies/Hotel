'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 12, suffix: '', label: 'Private Residences' },
  { value: 3, suffix: '', label: 'Michelin Stars' },
  { value: 100, suffix: '%', label: 'Solar Powered' },
  { value: 24, suffix: '/7', label: 'Butler Service' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2500;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-32 md:py-48 bg-background overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-border opacity-30" />
      
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center space-y-6 group"
            >
              <div className="text-6xl md:text-8xl font-serif text-accent tracking-tighter transition-transform duration-700 group-hover:scale-105">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="space-y-2">
                <div className="w-8 h-[1px] bg-accent/30 mx-auto transition-all duration-500 group-hover:w-16" />
                <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground font-bold pt-4">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
