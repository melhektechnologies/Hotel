'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Phone, Mail, MessageCircle, Send, Loader2, Globe, Building2, UserCircle } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate production API delay
    setTimeout(() => {
      setStatus('success');
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-white">
      <Navbar />

      <main>
        {/* Editorial Header */}
        <header className="pt-48 pb-24 px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.6em] text-accent font-bold block">Connect</span>
              <h1 className="text-display">The Art of <br /> <span className="italic font-light">Service</span></h1>
              <p className="text-editorial text-muted-foreground max-w-xl">
                Our global concierge team is dedicated to orchestrating your perfect narrative. Whether you are beginning your journey or seeking to enhance an existing reservation, we are at your absolute disposal.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
               <div className="text-right">
                  <p className="text-[9px] uppercase tracking-widest font-bold opacity-30 mb-2">Response Protocol</p>
                  <p className="text-xl font-serif">Within 120 Minutes</p>
               </div>
            </div>
          </div>
        </header>

        <section className="pb-32 px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            
            {/* Contact Information Pillar */}
            <div className="lg:col-span-4 space-y-16">
              <div className="space-y-12">
                {[
                  { title: "Location", details: ["Gerji Mebrathaile Street, Bole", "Addis Ababa, Ethiopia"], icon: <MapPin size={20} /> },
                  { title: "Direct Line", details: ["+251 11 646 6868", "+251 11 646 6869"], icon: <Phone size={20} /> },
                  { title: "Correspondence", details: ["reservations@nexusaddis.net", "concierge@nexusaddis.net"], icon: <Mail size={20} /> },
                  { title: "Instant Access", details: ["Direct Protocol Desk", "Available 24/7"], icon: <MessageCircle size={20} /> }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group cursor-default">
                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-500">
                      {item.icon}
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-[10px] uppercase tracking-widest font-bold opacity-40">{item.title}</h4>
                       {item.details.map((d, j) => (
                         <p key={j} className="text-lg font-serif">{d}</p>
                       ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* World Map Reveal */}
              <div className="relative aspect-video rounded-sm overflow-hidden border border-border group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5471465225107!2d38.7884813!3d9.0063234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85aaf565f5df%3A0x867011d8b74681c6!2sEthiopian%20Skylight%20Hotel!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set"
                  className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-[2s]"
                  loading="lazy"
                />
                <div className="absolute inset-0 pointer-events-none border border-white/10" />
              </div>
            </div>

            {/* Inquiry Engine */}
            <div className="lg:col-span-8">
              <div className="bg-white border border-border p-8 md:p-20 shadow-2xl rounded-sm">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center py-24 space-y-8"
                    >
                      <div className="w-24 h-24 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto">
                        <Send size={40} />
                      </div>
                      <div className="space-y-4">
                        <h2 className="text-4xl font-serif">Narrative Received</h2>
                        <p className="text-muted-foreground text-editorial max-w-sm mx-auto">
                          Thank you for sharing your inquiry. A dedicated Experience Host has been assigned to your request and will respond within our 2-hour protocol.
                        </p>
                      </div>
                      <button 
                        onClick={() => setStatus('idle')}
                        className="text-[10px] uppercase tracking-widest font-bold border-b border-accent pb-1 text-accent hover:text-foreground hover:border-foreground transition-all"
                      >
                        Send Another Correspondence
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      onSubmit={handleSubmit} 
                      className="space-y-12"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-serif">Direct Correspondence</h2>
                        <p className="text-xs uppercase tracking-widest opacity-40 font-bold">Confidential & Encrypted</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase tracking-widest font-bold opacity-60">Full Identity</label>
                          <input
                            type="text"
                            required
                            placeholder="Ambassador Hanna Tesfaye"
                            className="w-full border-b border-border py-4 focus:outline-none focus:border-accent transition-all bg-transparent text-lg font-serif placeholder:opacity-20"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase tracking-widest font-bold opacity-60">Digital Address</label>
                          <input
                            type="email"
                            required
                            placeholder="alexander@domain.com"
                            className="w-full border-b border-border py-4 focus:outline-none focus:border-accent transition-all bg-transparent text-lg font-serif placeholder:opacity-20"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest font-bold opacity-60">Inquiry Classification</label>
                        <select
                          required
                          className="w-full border-b border-border py-4 focus:outline-none focus:border-accent transition-all bg-transparent text-lg font-serif appearance-none cursor-pointer"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        >
                           <option value="">Select Purpose...</option>
                           <option value="reservation">Room & Suite Reservation</option>
                           <option value="experiences">Curated Cultural Escapes</option>
                           <option value="events">Ballroom & Summit Events</option>
                           <option value="wellness">Therapeutic Spa Inquiry</option>
                           <option value="investor">Corporate Partnerships</option>
                        </select>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-widest font-bold opacity-60">Message Narrative</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="How may we elevate your upcoming stay?"
                          className="w-full border-b border-border py-4 focus:outline-none focus:border-accent transition-all bg-transparent text-lg font-serif placeholder:opacity-20 resize-none"
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="btn-luxury-primary w-full py-6 flex items-center justify-center gap-4 disabled:opacity-50"
                      >
                        {status === 'loading' ? <Loader2 size={20} className="animate-spin" /> : <Send size={18} />}
                        {status === 'loading' ? 'Transmitting...' : 'Dispatch Correspondence'}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Global Access Points - Investor Ready Section */}
        <section className="section-padding bg-muted/20 border-y border-border">
           <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                 <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Global Infrastructure</span>
                    <h2 className="text-4xl font-serif">Global Liaison Offices</h2>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 {[
                   { city: "London", region: "European HQ", icon: <Globe size={20} />, contact: "+44 20 7946 0101" },
                   { city: "New York", region: "Americas Liaison", icon: <Building2 size={20} />, contact: "+1 212 555 0123" },
                   { city: "Singapore", region: "APAC Hub", icon: <UserCircle size={20} />, contact: "+65 6789 0101" }
                 ].map((office, i) => (
                   <div key={i} className="p-10 bg-white border border-border space-y-6 hover:shadow-xl transition-all duration-700">
                      <div className="text-accent">{office.icon}</div>
                      <div className="space-y-2">
                         <h3 className="text-2xl font-serif">{office.city}</h3>
                         <p className="text-[9px] uppercase tracking-widest font-bold opacity-30">{office.region}</p>
                      </div>
                      <p className="text-sm font-bold tracking-widest">{office.contact}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
