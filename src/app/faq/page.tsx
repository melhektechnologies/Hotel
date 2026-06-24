'use client';

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    question: "What is the best time to visit Skylight Hotel Addis Ababa?",
    answer: "Addis Ababa enjoys a pleasant highland climate year-round. The dry, sunny season from October to May is popular for international corporate summits, weddings, and tourism. June to August brings the main rainy season, but the hotel operates at full capacity year-round, serving as the central hub for diplomatic assemblies.",
  },
  {
    question: "How do I reach the hotel from Bole International Airport?",
    answer: "Skylight Hotel is located just five minutes (2 km) from Bole International Airport. We provide a complimentary luxury shuttle coach for all guests. Chauffeur transfers in our executive Mercedes-Benz S-Class or private delegation motorcades can be arranged through the Protocol Desk.",
  },
  {
    question: "What is included in my room or suite rate?",
    answer: "All rates include a traditional Ethiopian & continental buffet breakfast, complimentary airport shuttle transfers, high-speed fiber Wi-Fi, and access to the fitness center and outdoor pool. Executive and Suite bookings include exclusive access to the Skylight Club Lounge.",
  },
  {
    question: "Are security and protocol services available for delegations?",
    answer: "Yes, we specialize in hosting diplomatic delegations, embassy sessions, and international summit delegates. Our team coordinates with local protocol authorities, provides secured entry channels, biometric boardroom options, and accommodates specialized security details.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Standard Deluxe rooms may be cancelled up to 24 hours prior to the scheduled arrival date. Executive and Diplomatic suites require 48 to 72 hours notice, while Presidential Penthouses require wire-transfer validation and are non-refundable.",
  },
  {
    question: "Are pets allowed at the hotel?",
    answer: "Only certified service animals and medical companion dogs are permitted inside the hotel premises. Standard pets cannot be accommodated due to health and safety protocols for our international dining venues.",
  },
  {
    question: "Do you offer private floor buyouts?",
    answer: "Yes, we offer exclusive floor buyouts with private service entrances and restricted elevator access for embassy staff, diplomatic missions, or corporate executives. Contact our Protocol Desk for arrangements.",
  },
  {
    question: "What languages does your staff speak?",
    answer: "Our team is highly multilingual, speaking Amharic, English, French, Arabic, Mandarin, Spanish, and German fluently. Professional translation services can be arranged for events in our boardrooms and ballrooms.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-7 text-left gap-6 group"
      >
        <span className="text-lg font-serif group-hover:text-accent transition-colors">{q}</span>
        <ChevronDown
          size={20}
          className={cn("shrink-0 text-muted-foreground transition-transform duration-300", open && "rotate-180 text-accent")}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-muted-foreground leading-relaxed pr-10">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-40 pb-20 text-center px-6">
        <span className="text-xs uppercase tracking-[0.6em] text-accent font-bold mb-6 block">Guest Information</span>
        <h1 className="text-5xl md:text-7xl font-serif mb-6">Frequently Asked Questions</h1>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Everything you need to know before your arrival at Skylight Hotel Addis Ababa. If you cannot find your answer below, our concierge is available 24/7.
        </p>
      </section>

      <section className="pb-32 px-6 max-w-3xl mx-auto">
        <div className="divide-y divide-border">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} q={faq.question} a={faq.answer} />
          ))}
        </div>

        <div className="mt-20 p-12 bg-foreground text-background text-center space-y-6">
          <h3 className="text-3xl font-serif">Still have questions?</h3>
          <p className="opacity-70">Our concierge team is available around the clock to assist you.</p>
          <button className="px-10 py-4 bg-accent text-white text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-500">
            Contact Concierge
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
