'use client';

import { useState } from 'react';
import { Search, Globe, ChevronLeft, ShoppingBag, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    category: 'Breakfast',
    name: 'Ethiopian Breakfast Platter',
    description: 'Chechebsa, Kinche, Firfir, and organic highlands honey with fresh bread.',
    price: 18,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600'
  },
  {
    id: '2',
    category: 'Breakfast',
    name: 'Continental Buffet Selection',
    description: 'Freshly baked pastries, assorted cheeses, cold cuts, and fresh fruit.',
    price: 22,
    image: 'https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?q=80&w=600'
  },
  {
    id: '3',
    category: 'Main Course',
    name: 'Doro Wat with Injera',
    description: 'Traditional slow-cooked spicy chicken stew served with hard-boiled eggs and fresh injera.',
    price: 28,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=600'
  },
  {
    id: '4',
    category: 'Main Course',
    name: 'Pan-Seared Nile Perch',
    description: 'Locally sourced fresh fish fillet served with seasonal vegetables and lemon butter sauce.',
    price: 32,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600'
  },
  {
    id: '5',
    category: 'Beverages',
    name: 'Single-Origin Ethiopian Coffee',
    description: 'Freshly roasted and brewed traditional Yirgacheffe coffee.',
    price: 6,
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600'
  }
];

const CATEGORIES = ['All', 'Breakfast', 'Main Course', 'Desserts', 'Beverages'];

export default function QRDiningPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('EN');

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-muted/10 font-sans sm:max-w-md sm:mx-auto sm:border-x border-border sm:shadow-2xl relative bg-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted/20 transition-colors">
            <ChevronLeft size={24} />
          </Link>
          <div className="text-center">
            <h1 className="font-serif text-xl font-bold">Nexus In-Room Dining</h1>
            <p className="text-[10px] uppercase tracking-widest text-accent font-bold">Room Service</p>
          </div>
          <button 
            onClick={() => setLanguage(lang => lang === 'EN' ? 'AM' : 'EN')}
            className="w-10 h-10 flex flex-col items-center justify-center rounded-full bg-muted/10 hover:bg-muted/20 transition-colors"
          >
            <Globe size={16} />
            <span className="text-[8px] font-bold mt-0.5">{language}</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text"
            placeholder={language === 'EN' ? "Search menu..." : "ምናሌ ፈልግ..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted/10 border border-transparent focus:border-accent focus:bg-white transition-all py-3 pl-12 pr-4 rounded-full text-sm outline-none"
          />
        </div>
      </header>

      {/* Categories */}
      <div className="overflow-x-auto hide-scrollbar border-b border-border bg-white">
        <div className="flex px-4 py-4 gap-3 min-w-max">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === category 
                  ? 'bg-foreground text-background shadow-md' 
                  : 'bg-muted/10 text-muted-foreground hover:bg-muted/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu List */}
      <main className="p-4 space-y-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-sm">No items found matching your search.</p>
          </div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} className="flex gap-4 bg-white p-3 rounded-medium border border-border shadow-sm">
              <div className="w-24 h-24 shrink-0 relative rounded-sm overflow-hidden bg-muted/20">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 className="font-serif text-sm font-bold line-clamp-2">{item.name}</h3>
                  <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-sm text-accent">${item.price}</span>
                  <button className="w-8 h-8 rounded-full bg-foreground text-white flex items-center justify-center hover:scale-105 transition-transform">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </main>

      {/* Floating Cart (Mockup) */}
      <div className="fixed sm:absolute bottom-6 left-0 right-0 px-6 sm:px-4 z-50">
        <button className="w-full bg-accent text-white shadow-xl rounded-full py-4 px-6 flex items-center justify-between hover:bg-foreground transition-colors group">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-2 bg-white text-accent text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </div>
            <span className="text-xs uppercase tracking-widest font-bold">View Order</span>
          </div>
          <span className="font-serif font-bold">$0.00</span>
        </button>
      </div>
    </div>
  );
}
