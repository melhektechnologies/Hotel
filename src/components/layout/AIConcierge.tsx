'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, Phone, ArrowRight } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
  actions?: { label: string; href?: string; type?: 'primary' | 'outline' }[];
};

const RESPONSES: Record<string, any> = {
  default: {
    text: "I am Skylight AI, your dedicated digital concierge. I can coordinate your pre-arrival requests, verify room configurations, or guide you through our hotel portal. How may I assist your stay in Addis Ababa today?",
    actions: [
      { label: "Book Accommodations", href: "/booking", type: "primary" },
      { label: "View Dining & Lounge", href: "/dining", type: "outline" }
    ]
  },
  booking: {
    text: "Our accommodations range from the contemporary Deluxe Rooms to the Diplomatic Suite and Presidential Penthouse. Would you like to check specific availability?",
    actions: [
      { label: "Check Availability", href: "/booking", type: "primary" },
      { label: "Speak to Reservations", type: "outline" }
    ]
  },
  wellness: {
    text: "The Skylight Spa is a haven of therapeutic wellness. We specialize in traditional Ethio-coffee body scrubs, hot spring rituals, and modern aesthetic therapy. Would you like to view our wellness services?",
    actions: [
      { label: "View Spa Menu", href: "/wellness", type: "primary" },
      { label: "Request Appointment", type: "outline" }
    ]
  },
  impact: {
    text: "Skylight Hotel operates under premium environmental guidelines. Our live ledger tracks energy savings, local sourcing metrics, and waste recycling records. Would you like to inspect the live dashboard?",
    actions: [
      { label: "View Operations Ledger", href: "/#impact", type: "primary" },
      { label: "Download ESG Report", type: "outline" }
    ]
  }
};

export default function AIConcierge() {
  const { state, setUserIntent } = useAppContext();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Welcome to Skylight OS. I am your Digital Concierge. I can coordinate your hotel bookings, arrange Bole Airport transfers, or provide local dining and event information. How may I assist you?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: msg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking & typing
    setTimeout(() => {
      let response = RESPONSES.default;
      const lower = msg.toLowerCase();
      if (lower.includes('book') || lower.includes('room') || lower.includes('stay')) {
        response = RESPONSES.booking;
        setUserIntent('booking');
      } else if (lower.includes('spa') || lower.includes('wellness') || lower.includes('massage')) {
        response = RESPONSES.wellness;
        setUserIntent('wellness');
      } else if (lower.includes('impact') || lower.includes('solar') || lower.includes('data') || lower.includes('sustainability')) {
        response = RESPONSES.impact;
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: response.actions
      };

      setIsTyping(false);
      setMessages(prev => [...prev, assistantMsg]);
    }, 1500);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 rounded-full bg-foreground text-background shadow-2xl flex items-center justify-center hover:bg-accent transition-all duration-500 group"
      >
        <div className="absolute inset-0 rounded-full border border-accent/20 scale-125 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700" />
        {open ? <X size={24} /> : <div className="relative"><MessageCircle size={24} /><Sparkles size={12} className="absolute -top-2 -right-2 text-accent" /></div>}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-28 right-8 z-[100] w-[400px] max-w-[calc(100vw-4rem)] bg-white border border-border shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-foreground p-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
                  <Bot size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-serif text-xl">Skylight AI</h4>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-bold">Online Concierge</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/20 hover:text-white transition-colors"><X size={20} /></button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 h-[450px] overflow-y-auto p-8 space-y-8 bg-muted/10 scrollbar-hide"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] space-y-3 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div 
                      className={`p-6 text-[13px] leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                        ? 'bg-foreground text-background rounded-2xl rounded-br-none' 
                        : 'bg-white text-foreground rounded-2xl rounded-bl-none border border-border'
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.actions && (
                      <div className="flex flex-col gap-2 w-full">
                        {msg.actions.map((action, i) => (
                          action.href ? (
                            <Link 
                              key={i} 
                              href={action.href}
                              className={`w-full py-3 px-6 text-[10px] uppercase tracking-widest font-bold text-center transition-all ${
                                action.type === 'primary' 
                                ? 'bg-accent text-white hover:bg-foreground' 
                                : 'border border-border hover:border-accent hover:text-accent'
                              }`}
                            >
                              {action.label}
                            </Link>
                          ) : (
                            <button 
                              key={i}
                              className="w-full py-3 px-6 text-[10px] uppercase tracking-widest font-bold text-center border border-border hover:border-accent hover:text-accent transition-all"
                            >
                              {action.label}
                            </button>
                          )
                        ))}
                      </div>
                    )}
                    <span className="text-[9px] uppercase tracking-widest opacity-30 font-bold px-1">{msg.time}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-border p-4 rounded-2xl rounded-bl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-accent/40 rounded-full animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-border space-y-4">
              <div className="relative group">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Inquire about your sanctuary..."
                  className="w-full bg-muted/30 border border-border rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-accent transition-all"
                />
                <button 
                  onClick={() => handleSend()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-foreground text-background rounded-lg flex items-center justify-center hover:bg-accent transition-all duration-300"
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="flex justify-center gap-4 text-[9px] uppercase tracking-widest font-bold opacity-30">
                <span className="flex items-center gap-1"><Sparkles size={10} /> Concierge Intelligence</span>
                <span className="flex items-center gap-1"><Phone size={10} /> VIP Priority</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
