'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';

type Message = {
  id: string;
  sender: 'ai' | 'user';
  text: string;
};

const SUGGESTED_QUERIES = [
  "Room inquiries",
  "Airport pickup",
  "Check-in times",
  "Restaurant questions",
  "QR Dining",
  "Conference booking"
];

export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Welcome to Swiss Inn Nexus Hotel. I am your Digital Concierge. How may I assist you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      let reply = "I would be delighted to assist you with that. A member of our team has been notified and will prepare the arrangements.";
      const lower = text.toLowerCase();
      
      if (lower.includes('room') || lower.includes('inquiry')) {
        reply = "We offer a variety of luxurious accommodations, from our Deluxe King Rooms to our Presidential Penthouse. Would you like me to check availability for specific dates?";
      } else if (lower.includes('airport') || lower.includes('pickup')) {
        reply = "We offer complimentary luxury airport pickup from Bole International Airport. Please provide your flight details in the Booking section, or I can notify the protocol desk now.";
      } else if (lower.includes('check-in') || lower.includes('check in') || lower.includes('time')) {
        reply = "Standard check-in is at 14:00, and check-out is at 12:00. Early check-in or late check-out can be requested subject to availability.";
      } else if (lower.includes('restaurant') || lower.includes('dining')) {
        reply = "We have several dining options, including Ta'em Traditional for Ethiopian cuisine and The Grand Pavilion for fine dining. You can also explore our new QR Dining experience from your room.";
      } else if (lower.includes('conference') || lower.includes('event')) {
        reply = "Our Premier Conference Facilities can host up to 2,000 delegates. Would you like me to direct you to our Events planning team?";
      }

      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[600px] max-h-[80vh] bg-white border border-border shadow-2xl rounded-medium flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-foreground text-background p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Bot size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-lg leading-none">Nexus AI</h3>
                  <p className="text-[9px] uppercase tracking-widest text-accent font-bold mt-1">Digital Concierge</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10"
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.sender === 'user' ? 'bg-foreground text-background' : 'bg-accent/20 text-accent'
                  }`}>
                    {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`px-4 py-3 rounded-medium text-sm max-w-[80%] ${
                    msg.sender === 'user' 
                      ? 'bg-foreground text-white rounded-tr-sm' 
                      : 'bg-white border border-border rounded-tl-sm text-foreground shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white border border-border px-4 py-3 rounded-medium rounded-tl-sm shadow-sm flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length === 1 && !isTyping && (
              <div className="p-4 border-t border-border bg-white flex flex-wrap gap-2">
                {SUGGESTED_QUERIES.map(q => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-[10px] uppercase tracking-widest font-bold border border-border px-3 py-1.5 rounded-full hover:border-accent hover:text-accent transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
              className="p-4 bg-white border-t border-border flex items-center gap-3"
            >
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your stay..."
                className="flex-1 border-none focus:outline-none text-sm bg-transparent placeholder:text-muted-foreground"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center disabled:opacity-50 transition-colors"
              >
                <Send size={16} className="-ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
