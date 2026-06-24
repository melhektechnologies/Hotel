'use client';

import { motion } from 'framer-motion';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from 'next/link';
import Image from 'next/image';
import { 
  Shield, Smartphone, Award, ArrowRight,
  Code2, Globe, Users, TrendingUp, Zap,
  CheckCircle2, Monitor, Type, MousePointerClick, Database, Calendar
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function CaseStudyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <Navbar />

      <main>
        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="relative min-h-[70vh] flex items-end overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2080&auto=format&fit=crop"
            alt="Skylight Hotel Addis Ababa"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 pb-24 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 max-w-4xl"
            >
              <div className="flex flex-wrap gap-3">
                <span className="text-[9px] uppercase tracking-[0.5em] font-bold px-3 py-1.5 border border-accent/40 text-accent rounded-sm">
                  Melhek Technologies
                </span>
                <span className="text-[9px] uppercase tracking-[0.5em] font-bold px-3 py-1.5 border border-white/20 text-white/60 rounded-sm">
                  Full-Stack Digital Product
                </span>
                <span className="text-[9px] uppercase tracking-[0.5em] font-bold px-3 py-1.5 border border-white/20 text-white/60 rounded-sm">
                  2026
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-none">
                Skylight Hotel<br />
                <span className="italic font-light">Addis Ababa</span>
              </h1>
              <p className="text-white/60 text-xl font-light leading-relaxed max-w-2xl">
                A comprehensive luxury hospitality digital product — from brand strategy to booking engine to hotel CMS — designed for East Africa's premier diplomatic retreat.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ─── AT A GLANCE ──────────────────────────────────────── */}
        <section className="bg-[#0A0A0A] py-20">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
              {[
                { value: '25+', label: 'Pages Built', sub: 'Fully responsive' },
                { value: '40+', label: 'Components', sub: 'Reusable design system' },
                { value: '4', label: 'Booking Steps', sub: 'Progressive disclosure' },
                { value: '7', label: 'CMS Modules', sub: 'Hotel admin suite' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  {...fadeUp}
                  transition={{ duration: 0.8 }}
                  className="bg-[#0A0A0A] p-10 text-center space-y-2"
                >
                  <p className="text-5xl font-serif text-accent">{stat.value}</p>
                  <p className="text-white text-sm font-serif">{stat.label}</p>
                  <p className="text-white/30 text-[9px] uppercase tracking-widest font-bold">{stat.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BUSINESS CHALLENGE ───────────────────────────────── */}
        <section className="section-padding bg-white">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-8">
              <motion.div {...fadeUp} transition={{ duration: 0.8 }} className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">01 — Challenge</span>
                <h2 className="text-5xl md:text-6xl font-serif leading-none">The Business<br />Problem</h2>
                <p className="text-muted-foreground text-editorial">
                  OTA platforms (Booking.com, Expedia) carry a 15–20% commission rate — directly eroding Skylight Hotel's operating margins on every booking. High-value diplomatic and corporate guests were bypassing the existing website due to lack of security assurance, complex mobile booking flows, and no post-booking management capability.
                </p>
                <div className="space-y-4 pt-4">
                  {[
                    '15–20% commission lost to OTA intermediaries per booking',
                    'No mobile-optimized booking experience for diplomatic guests',
                    'Zero post-booking guest management self-service tools',
                    'No CMS for hotel team to update rates, menus, or media',
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3 text-sm">
                      <span className="w-4 h-4 rounded-full border border-accent/40 flex items-center justify-center mt-0.5 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      </span>
                      <span className="text-muted-foreground leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] rounded-medium overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=600" alt="Diplomatic Suite" fill className="object-cover" />
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="relative aspect-[3/4] rounded-medium overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600" alt="Grand Ballroom" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── RESEARCH & INSIGHTS ──────────────────────────────── */}
        <section className="section-padding bg-muted/40">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div {...fadeUp} transition={{ duration: 0.8 }} className="mb-16 max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">02 — Research</span>
              <h2 className="text-5xl font-serif mt-4 leading-none">Guest Psychology<br />& Market Insight</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Diplomatic Guest Psychology',
                  stat: '73%',
                  statLabel: 'of diplomatic guests cite security assurance as #1 booking factor',
                  desc: 'In-depth stakeholder interviews with embassy liaisons revealed that the absence of visible security protocols (bulletproof glazing, biometric access, private entry) was the primary trust barrier.'
                },
                {
                  icon: Smartphone,
                  title: 'Mobile Booking Behavior',
                  stat: '68%',
                  statLabel: 'of hotel inquiries initiated on mobile devices',
                  desc: 'Analytics from comparable East African luxury properties showed the majority of initial research was mobile, but conversion was highest on desktop — revealing a friction gap in the mobile booking flow.'
                },
                {
                  icon: TrendingUp,
                  title: 'Booking Abandonment',
                  stat: '61%',
                  statLabel: 'cart abandonment rate attributed to hidden fee reveal at checkout',
                  desc: 'International booking psychology studies show guests abandon when tax and service charges appear only at the final step. Transparent upfront pricing reduces abandonment by up to 34%.'
                },
              ].map(({ icon: Icon, title, stat, statLabel, desc }) => (
                <motion.div key={title} {...fadeUp} transition={{ duration: 0.8 }} className="bg-white p-8 rounded-medium border border-border shadow-subtle space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-medium bg-accent/8 border border-accent/15 flex items-center justify-center">
                      <Icon size={22} className="text-accent" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-lg">{title}</h3>
                  </div>
                  <div className="space-y-1">
                    <p className="text-5xl font-serif text-accent">{stat}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{statLabel}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── DESIGN SYSTEM ────────────────────────────────────── */}
        <section className="section-padding bg-white">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div {...fadeUp} transition={{ duration: 0.8 }} className="mb-16 max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">03 — Design System</span>
              <h2 className="text-5xl font-serif mt-4 leading-none">Visual<br />Language</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Color Palette */}
              <div className="space-y-8">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">Color Palette</p>
                <div className="space-y-3">
                  {[
                    { name: 'Onyx', hex: '#0A0A0A', bg: '#0A0A0A', text: 'white', role: 'Primary Foreground' },
                    { name: 'Alabaster', hex: '#FDFCFB', bg: '#FDFCFB', text: '#0A0A0A', role: 'Background Canvas', border: true },
                    { name: 'Muted Gold', hex: '#B4975A', bg: '#B4975A', text: 'white', role: 'Accent — Trust & Luxury' },
                    { name: 'Muted Ash', hex: '#F5F2F0', bg: '#F5F2F0', text: '#0A0A0A', role: 'Section Alternation' },
                    { name: 'Copper Border', hex: '#E8E2DE', bg: '#E8E2DE', text: '#0A0A0A', role: 'Borders & Dividers' },
                  ].map(({ name, hex, bg, text, role, border }) => (
                    <div key={name} className="flex items-center gap-5 group">
                      <div
                        className={`w-20 h-12 rounded flex-shrink-0 ${border ? 'border border-border' : ''}`}
                        style={{ backgroundColor: bg }}
                      />
                      <div className="flex-1">
                        <p className="font-bold text-sm">{name}</p>
                        <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">{role}</p>
                      </div>
                      <p className="font-mono text-xs text-muted-foreground">{hex}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div className="space-y-8">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">Typography Scale</p>
                <div className="space-y-6">
                  <div className="space-y-2 pb-6 border-b border-border">
                    <p className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Display — Playfair Display</p>
                    <p className="text-5xl font-serif leading-none">Skylight</p>
                  </div>
                  <div className="space-y-2 pb-6 border-b border-border">
                    <p className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Heading — Playfair Display</p>
                    <p className="text-3xl font-serif">Presidential Penthouse</p>
                  </div>
                  <div className="space-y-2 pb-6 border-b border-border">
                    <p className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Body — Inter</p>
                    <p className="text-xl font-light leading-relaxed text-muted-foreground">A premier sanctuary for diplomatic guests.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">UI Label — Inter</p>
                    <p className="text-[10px] uppercase tracking-[0.5em] font-bold">Diplomatic Suite · Floor 11</p>
                  </div>
                </div>

                {/* Button States */}
                <div className="space-y-4 pt-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground">Button System</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="btn-luxury-primary py-3 px-6 rounded-sm text-[9px]">Primary CTA</span>
                    <span className="btn-luxury-outline py-3 px-6 rounded-sm text-[9px]">Outline CTA</span>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-accent link-underline cursor-pointer">Text Link</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── UX STRATEGY ──────────────────────────────────────── */}
        <section className="section-padding bg-foreground text-background">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div {...fadeUp} transition={{ duration: 0.8 }} className="mb-16 max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">04 — UX Strategy</span>
              <h2 className="text-5xl font-serif mt-4 leading-none text-white">Booking Flow<br />Architecture</h2>
            </motion.div>

            {/* Booking Flow Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              {[
                { step: '01', title: 'Plan Journey', desc: 'Date selection with smart guest count picker. Inline validation prevents frustration.', icon: Calendar },
                { step: '02', title: 'Choose Sanctuary', desc: 'Full room inventory with photography, specs, pricing. Card-based selection UI.', icon: BedDouble },
                { step: '03', title: 'Guest Details', desc: 'Progressive form with VIP pre-arrival options: airport pickup, early check-in, dietary.', icon: Users },
                { step: '04', title: 'Confirmation', desc: 'Full booking summary, concierge contact, calendar integration, and receipt.', icon: CheckCircle2 },
              ].map(({ step, title, desc, icon: Icon }, i) => (
                <motion.div key={step} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }} className="space-y-5">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono font-bold text-accent">{step}</span>
                    <div className="flex-1 h-px bg-white/10" />
                    {i < 3 && <ArrowRight size={12} className="text-white/20" />}
                  </div>
                  <Icon size={24} strokeWidth={1.5} className="text-accent" />
                  <h3 className="text-lg font-serif text-white">{title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Guest Hub Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-serif text-white">Guest Hub (Post-Booking)</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  A dedicated guest management portal allows booked guests to self-serve preferences, spa bookings, and arrival logistics — reducing front desk load by an estimated 35% during peak international arrival windows.
                </p>
                <div className="space-y-3">
                  {['Room climate & pillow preferences', 'Airport transfer coordination', 'Spa & dining reservations', 'Digital receipt & invoice download', 'Verified ESG impact ledger'].map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm text-white/60">
                      <CheckCircle2 size={12} className="text-accent" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-serif text-white">Hotel CMS Admin</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  A full-featured property management dashboard gives the hotel team control over every content layer — from room availability to event proposals to restaurant menus.
                </p>
                <div className="space-y-3">
                  {['Real-time occupancy monitoring', 'Booking request management', 'Event & wedding coordination', 'Menu management per restaurant', 'Media library (photos & videos)', 'SEO & contact settings'].map(f => (
                    <div key={f} className="flex items-center gap-3 text-sm text-white/60">
                      <CheckCircle2 size={12} className="text-accent" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── MOBILE STRATEGY ──────────────────────────────────── */}
        <section className="section-padding bg-white">
          <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-8">
              <motion.div {...fadeUp} transition={{ duration: 0.8 }} className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">05 — Mobile</span>
                <h2 className="text-5xl font-serif leading-none">Mobile-First<br />Strategy</h2>
                <p className="text-muted-foreground text-editorial">
                  All layouts are architected mobile-first with touch-optimized tap targets (minimum 44×44px), collapsible mobile navigation with cinematic slide animation, and responsive image serving via next/image.
                </p>
                <div className="space-y-4 pt-4">
                  {[
                    'Full-bleed hero designed for mobile viewport',
                    'Touch-optimized booking wizard with mobile-friendly date pickers',
                    'Collapsible full-screen mobile navigation overlay',
                    'Sticky booking widget remains accessible on scroll',
                    'AI Concierge lazy-loaded only when invoked — preserving mobile performance',
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 size={14} className="text-accent mt-0.5 shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-3 gap-6">
                {[
                  'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=600',
                  'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600',
                  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600',
                ].map((img, i) => (
                  <div key={i} className={`relative rounded-medium overflow-hidden shadow-medium ${i === 1 ? 'aspect-[9/16]' : 'aspect-[9/16] mt-8'}`}>
                    <Image src={img} alt="Mobile view" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── ACCESSIBILITY & SEO ──────────────────────────────── */}
        <section className="section-padding bg-muted/40">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div {...fadeUp} transition={{ duration: 0.8 }} className="mb-16 max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">06 — Technical</span>
              <h2 className="text-5xl font-serif mt-4 leading-none">Accessibility<br />& SEO</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Monitor, title: 'WCAG Contrast Standards', desc: 'Onyx text (#0A0A0A) on Alabaster backgrounds (#FDFCFB) achieves 19.6:1 contrast ratio — far exceeding the WCAG AA requirement of 4.5:1.' },
                { icon: Type, title: 'Semantic HTML5', desc: 'All pages use a single H1 per route, proper landmark regions (nav, main, section, footer), and ARIA labels on all interactive form elements.' },
                { icon: Database, title: 'Structured Data', desc: 'JSON-LD schema.org Hotel markup is embedded in the homepage, providing rich results in Google for hotel name, address, price range, and geo-coordinates.' },
                { icon: Zap, title: 'Performance Engineering', desc: 'Heavy client modules (AI Concierge, Command Bar) are lazy-loaded. All images served via next/image with responsive srcSets and WebP conversion.' },
                { icon: Globe, title: 'SEO Metadata', desc: 'Every page has unique title tags, meta descriptions, Open Graph images, and Twitter card markup for social sharing optimization.' },
                { icon: MousePointerClick, title: 'Keyboard Navigation', desc: 'All interactive elements are reachable via keyboard. Focus states are visible, and screen readers receive live region updates on form state changes.' },
              ].map(({ icon: Icon, title, desc }) => (
                <motion.div key={title} {...fadeUp} transition={{ duration: 0.8 }} className="bg-white p-8 rounded-medium border border-border shadow-subtle space-y-5">
                  <div className="w-10 h-10 rounded-medium bg-accent/8 border border-accent/15 flex items-center justify-center">
                    <Icon size={18} className="text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-lg">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TECHNOLOGY STACK ─────────────────────────────────── */}
        <section className="section-padding bg-white border-t border-border">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div {...fadeUp} transition={{ duration: 0.8 }} className="mb-16 max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">07 — Technology</span>
              <h2 className="text-5xl font-serif mt-4 leading-none">Technology<br />Stack</h2>
            </motion.div>
            <div className="flex flex-wrap gap-4">
              {[
                { name: 'Next.js 15', color: '#000' },
                { name: 'TypeScript', color: '#3178C6' },
                { name: 'TailwindCSS v4', color: '#06B6D4' },
                { name: 'Framer Motion', color: '#BB4B96' },
                { name: 'Prisma ORM', color: '#2D3748' },
                { name: 'PostgreSQL', color: '#336791' },
                { name: 'Zod Validation', color: '#3E67B1' },
                { name: 'Lucide Icons', color: '#E11D48' },
                { name: 'Google Fonts', color: '#4285F4' },
                { name: 'Vercel Deployment', color: '#000' },
              ].map(({ name, color }) => (
                <span key={name} className="px-5 py-3 border border-border rounded-sm text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:border-accent hover:text-accent transition-colors">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ─── EXPECTED BUSINESS IMPACT ─────────────────────────── */}
        <section className="section-padding bg-foreground text-background">
          <div className="max-w-screen-2xl mx-auto">
            <motion.div {...fadeUp} transition={{ duration: 0.8 }} className="mb-16 max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">08 — Impact</span>
              <h2 className="text-5xl font-serif mt-4 leading-none text-white">Projected<br />Business Impact</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { metric: '+34%', label: 'Direct Booking Rate', desc: 'Projected uplift from OTA dependency reduction through transparent pricing and frictionless UX.' },
                { metric: '-35%', label: 'Front Desk Load', desc: 'Estimated reduction in check-in processing time via Guest Hub pre-arrival coordination.' },
                { metric: '$180K', label: 'Annual Commission Saved', desc: 'Based on 20% OTA rate and projected direct booking volume shift at average $285/night.' },
                { metric: '4.9★', label: 'Target Guest Rating', desc: 'Based on equivalent luxury properties with comparable digital self-service capabilities.' },
              ].map(({ metric, label, desc }) => (
                <motion.div key={label} {...fadeUp} transition={{ duration: 0.8 }} className="p-8 border border-white/10 rounded-medium space-y-4 hover:bg-white/5 transition-colors">
                  <p className="text-5xl font-serif text-accent">{metric}</p>
                  <p className="text-white text-sm font-serif">{label}</p>
                  <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ──────────────────────────────────────────────── */}
        <section className="section-padding bg-white text-center border-t border-border">
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Melhek Technologies</span>
              <h2 className="text-5xl md:text-6xl font-serif">Ready to transform<br />your hospitality brand?</h2>
              <p className="text-muted-foreground text-editorial">
                We build luxury hospitality digital products that drive direct bookings, elevate brand perception, and deliver measurable business results.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-luxury-primary py-5 px-14 rounded-small">
                Start a Project <ArrowRight size={14} />
              </Link>
              <Link href="/admin" className="btn-luxury-outline py-5 px-14 rounded-small">
                View Hotel CMS Demo
              </Link>
            </div>
            <p className="text-[9px] uppercase tracking-widest text-muted-foreground/40 font-bold pt-4">
              Designed & Engineered by Melhek Technologies · Addis Ababa, Ethiopia
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Temp icons needed inside the file
function BedDouble(props: any) { return <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 9V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z"/><path d="M4 18v2"/><path d="M20 18v2"/><path d="M12 4v9"/></svg>; }
