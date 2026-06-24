'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BedDouble, Tag, CalendarDays, UtensilsCrossed,
  ImageIcon, Settings, LogOut, ChevronRight, TrendingUp,
  TrendingDown, Users, DollarSign, Star, CheckCircle2, Clock, AlertCircle,
  Plus, Edit3, Trash2, Eye, Search, Bell,
  Calendar, Phone, Mail, Globe, ArrowUpRight, Percent,
  Shield, ChevronDown, X, Save, Upload, MapPin, Link2
} from 'lucide-react';
import { HOTEL_BRAND, ROOMS } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

// ─── MOCK DATA ──────────────────────────────────────────────────────────────
const OCCUPANCY_DATA = { rate: 87, rooms: 306, occupied: 266, available: 40, checkins: 12, checkouts: 8 };

const BOOKING_REQUESTS = [
  { id: 'SKY-2026-AA14', guest: 'H.E. Ambassador Yonas Fekadu', room: 'Diplomatic Suite', dates: 'Jun 24–Jul 2', nights: 8, total: '$6,000', status: 'Pending', tier: 'VIP' },
  { id: 'SKY-2026-BB22', guest: 'Dr. Aisha Mensah-Quartey', room: 'Executive Business Room', dates: 'Jun 25–Jun 28', nights: 3, total: '$855', status: 'Confirmed', tier: 'Business' },
  { id: 'SKY-2026-CC31', guest: 'Francesca Ricci', room: 'Deluxe King Room', dates: 'Jun 26–Jun 29', nights: 3, total: '$585', status: 'Confirmed', tier: 'Leisure' },
  { id: 'SKY-2026-DD09', guest: 'James Okafor', room: 'Executive Suite', dates: 'Jun 27–Jul 4', nights: 7, total: '$2,940', status: 'Pending', tier: 'Business' },
  { id: 'SKY-2026-EE55', guest: 'Li Wei & Partner', room: 'Presidential Penthouse', dates: 'Jun 30–Jul 7', nights: 7, total: '$16,800', status: 'VIP Hold', tier: 'Prestige' },
];

const EVENT_REQUESTS = [
  { name: 'IGAD Ministerial Summit', type: 'Conference', date: 'Jul 8–10, 2026', guests: 450, space: 'Grand Ballroom', status: 'Confirmed', value: '$68,000' },
  { name: 'Kebede – Alemu Wedding Banquet', type: 'Wedding', date: 'Jul 12, 2026', guests: 320, space: 'Grand Ballroom', status: 'Deposit Paid', value: '$42,000' },
  { name: 'EthioTelecom Board Strategy', type: 'Meeting', date: 'Jun 28, 2026', guests: 24, space: 'Diplomatic Boardroom', status: 'Confirmed', value: '$4,200' },
  { name: 'USAID Regional Leadership Forum', type: 'Conference', date: 'Jul 20–21, 2026', guests: 180, space: 'Grand Ballroom', status: 'Proposal', value: '$28,000' },
];

const RESTAURANT_RESERVATIONS = [
  { time: '12:30', name: 'Ambassador Tesfaye', restaurant: "Ta'em Traditional", guests: 4, notes: 'Vegan options required', status: 'Confirmed' },
  { time: '13:00', name: 'World Bank Delegation', restaurant: 'Grand Pavilion', guests: 12, notes: 'Private dining room', status: 'Confirmed' },
  { time: '19:30', name: 'Dr. Yonas Mulugeta', restaurant: "Ta'em Traditional", guests: 2, notes: 'Anniversary — rose petals & champagne', status: 'Special' },
  { time: '20:00', name: 'Corporate Group — Shell EA', restaurant: 'Grand Pavilion', guests: 8, notes: 'Halal menu', status: 'Pending' },
];

const INQUIRIES = [
  { from: 'sarah.johnson@un.org', subject: 'Security Protocol for Delegation — 18 Pax', time: '2h ago', priority: 'High', type: 'VIP' },
  { from: 'events@afdb.org', subject: 'Annual Board Meeting Package — Q3 2026', time: '4h ago', priority: 'High', type: 'Corporate' },
  { from: 'honeymoon@kenyatravel.com', subject: 'Honeymoon Suite Inquiry — August', time: '6h ago', priority: 'Normal', type: 'Leisure' },
  { from: 'press@cnn.com', subject: 'Media Accommodation Request — AU Summit Coverage', time: '1d ago', priority: 'Normal', type: 'Media' },
];

const OFFERS_DATA = [
  { name: 'Diplomatic Welcome Package', category: 'Corporate', price: '$950 / night', discount: '15% off', validUntil: 'Dec 31, 2026', status: 'Active', bookings: 34 },
  { name: 'Ethiopian Heritage Weekend', category: 'Cultural', price: '$380 / night', discount: 'Includes Coffee Ceremony', validUntil: 'Sep 30, 2026', status: 'Active', bookings: 67 },
  { name: 'Honeymoon Serenity Suite', category: 'Romance', price: '$1,200 / stay', discount: 'Includes Spa & Dining', validUntil: 'Dec 31, 2026', status: 'Active', bookings: 22 },
  { name: 'MICE Corporate Rate', category: 'Corporate', price: '$245 / night', discount: '25% off rack', validUntil: 'Jun 30, 2027', status: 'Draft', bookings: 0 },
];

const MENU_ITEMS = {
  "Ta'em Traditional": [
    { name: 'Doro Wat (Traditional)', category: 'Main', price: '$32', featured: true, allergens: 'None' },
    { name: 'Kitfo with Tibs', category: 'Main', price: '$28', featured: true, allergens: 'None' },
    { name: 'Injera Combination Platter', category: 'Sharing', price: '$45', featured: false, allergens: 'Gluten' },
    { name: 'Ethiopian Coffee Ceremony', category: 'Beverage', price: '$18 pp', featured: true, allergens: 'None' },
  ],
  "Grand Pavilion": [
    { name: 'Pan-Seared Nile Perch', category: 'Main', price: '$54', featured: true, allergens: 'Fish' },
    { name: 'Highland Lamb Rack', category: 'Main', price: '$68', featured: true, allergens: 'None' },
    { name: 'Foie Gras Amuse-Bouche', category: 'Starter', price: '$24', featured: false, allergens: 'Dairy' },
    { name: 'Cellar Reserve Sommelier Selection', category: 'Wine', price: '$120', featured: false, allergens: 'Sulphites' },
  ]
};

const MEDIA_GALLERY = [
  { category: 'Rooms', url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=600', label: 'Diplomatic Suite — Bedroom' },
  { category: 'Rooms', url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600', label: 'Executive Suite — Living Area' },
  { category: 'Dining', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600', label: "Ta'em Traditional — Dining Hall" },
  { category: 'Dining', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600', label: 'Grand Pavilion — Interior' },
  { category: 'Events', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600', label: 'Grand Ballroom — Summit Setup' },
  { category: 'Wellness', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600', label: 'Tsebel Spa — Treatment Suite' },
  { category: 'Exterior', url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600', label: 'Hotel Facade — Bole Road' },
  { category: 'Exterior', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600', label: 'Hotel Pool & Garden Terrace' },
];

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'rooms', label: 'Rooms Manager', icon: BedDouble },
  { id: 'offers', label: 'Offers Manager', icon: Tag },
  { id: 'events', label: 'Events Manager', icon: CalendarDays },
  { id: 'restaurant', label: 'Restaurant Manager', icon: UtensilsCrossed },
  { id: 'media', label: 'Media Manager', icon: ImageIcon },
  { id: 'settings', label: 'Settings', icon: Settings },
];

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'Confirmed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Pending': 'bg-amber-50 text-amber-700 border-amber-200',
    'VIP Hold': 'bg-purple-50 text-purple-700 border-purple-200',
    'Active': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Draft': 'bg-zinc-100 text-zinc-500 border-zinc-200',
    'Deposit Paid': 'bg-blue-50 text-blue-700 border-blue-200',
    'Proposal': 'bg-amber-50 text-amber-700 border-amber-200',
    'Special': 'bg-rose-50 text-rose-600 border-rose-200',
    'High': 'bg-red-50 text-red-600 border-red-200',
    'Normal': 'bg-zinc-100 text-zinc-500 border-zinc-200',
    'Available': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Occupied': 'bg-red-50 text-red-600 border-red-200',
    'Maintenance': 'bg-amber-50 text-amber-700 border-amber-200',
  };
  return (
    <span className={`text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded border ${map[status] || 'bg-zinc-100 text-zinc-500 border-zinc-200'}`}>
      {status}
    </span>
  );
}

// ─── METRIC CARD ─────────────────────────────────────────────────────────────
function MetricCard({ label, value, sub, trend, icon: Icon, accent = false }:
  { label: string; value: string; sub?: string; trend?: 'up' | 'down'; icon: any; accent?: boolean }
) {
  return (
    <div className={`p-6 rounded-lg border space-y-4 ${accent ? 'bg-[#B4975A] border-[#B4975A] text-white' : 'bg-white border-zinc-200'}`}>
      <div className="flex items-center justify-between">
        <Icon size={20} strokeWidth={1.5} className={accent ? 'text-white/70' : 'text-[#B4975A]'} />
        {trend && (
          <span className={`flex items-center gap-1 text-[10px] font-bold ${trend === 'up' ? 'text-emerald-600' : 'text-red-500'} ${accent ? 'text-white/80' : ''}`}>
            {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          </span>
        )}
      </div>
      <div>
        <p className={`text-3xl font-serif ${accent ? 'text-white' : 'text-zinc-900'}`}>{value}</p>
        <p className={`text-[10px] uppercase tracking-[0.2em] font-bold mt-1 ${accent ? 'text-white/60' : 'text-zinc-400'}`}>{label}</p>
        {sub && <p className={`text-xs mt-1 ${accent ? 'text-white/50' : 'text-zinc-400'}`}>{sub}</p>}
      </div>
    </div>
  );
}

// ─── MAIN DASHBOARD ──────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [mediaFilter, setMediaFilter] = useState('All');
  const [selectedRestaurant, setSelectedRestaurant] = useState<keyof typeof MENU_ITEMS>("Ta'em Traditional");
  const [roomStatuses, setRoomStatuses] = useState<Record<string, string>>(
    Object.fromEntries(ROOMS.map((r, i) => [r.id, i % 3 === 2 ? 'Occupied' : 'Available']))
  );
  const [settings, setSettings] = useState({
    hotelName: HOTEL_BRAND.name,
    phone: HOTEL_BRAND.contact.phone,
    email: HOTEL_BRAND.contact.email,
    address: HOTEL_BRAND.contact.address,
    instagram: HOTEL_BRAND.social.instagram,
    facebook: HOTEL_BRAND.social.facebook,
    twitter: HOTEL_BRAND.social.twitter,
    metaTitle: 'Skylight Hotel Addis Ababa | Luxury Hotel in Bole District',
    metaDesc: "East Africa's premier diplomatic retreat and luxury hotel.",
    googleAnalytics: 'G-XXXXXXXXXX',
  });

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const panelVariants = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex font-sans">
      {/* Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-[200] bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 size={14} className="text-emerald-400" /> {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-[#0A0A0A] h-screen sticky top-0 flex flex-col transition-all duration-500 shrink-0 z-40`}>
        {/* Logo */}
        <div className={`p-6 border-b border-white/8 flex ${sidebarCollapsed ? 'justify-center' : 'items-center justify-between'}`}>
          {!sidebarCollapsed && (
            <div>
              <h1 className="text-white text-sm font-serif tracking-widest uppercase">Skylight</h1>
              <p className="text-white/30 text-[8px] tracking-[0.3em] uppercase mt-0.5">Admin Console</p>
            </div>
          )}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="text-white/30 hover:text-white transition-colors p-1">
            <ChevronRight size={16} className={`transition-transform duration-500 ${sidebarCollapsed ? '' : 'rotate-180'}`} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {SIDEBAR_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-4'} py-3.5 rounded-lg transition-all duration-300 group gap-3 cursor-pointer ${activeSection === id
                ? 'bg-[#B4975A] text-white'
                : 'text-white/40 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <Icon size={18} strokeWidth={1.5} />
              {!sidebarCollapsed && <span className="text-[11px] uppercase tracking-[0.2em] font-bold">{label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-white/8 space-y-1">
          <Link href="/" className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-4'} py-3 rounded-lg text-white/30 hover:text-white/70 transition-colors gap-3`}>
            <Globe size={16} strokeWidth={1.5} />
            {!sidebarCollapsed && <span className="text-[10px] uppercase tracking-widest font-bold">View Site</span>}
          </Link>
          <Link href="/admin" className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-4'} py-3 rounded-lg text-white/30 hover:text-red-400 transition-colors gap-3`}>
            <LogOut size={16} strokeWidth={1.5} />
            {!sidebarCollapsed && <span className="text-[10px] uppercase tracking-widest font-bold">Sign Out</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-zinc-200 px-8 h-16 flex items-center justify-between sticky top-0 z-30 shrink-0">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400">
              {SIDEBAR_ITEMS.find(s => s.id === activeSection)?.label}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
            </div>
            <div className="relative">
              <Bell size={18} className="text-zinc-400 hover:text-zinc-700 cursor-pointer transition-colors" strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold">3</span>
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-zinc-200">
              <div className="w-8 h-8 rounded-full bg-[#B4975A] flex items-center justify-center text-white text-[10px] font-bold">GM</div>
              {!sidebarCollapsed && <p className="text-xs font-bold text-zinc-700 hidden md:block">General Manager</p>}
            </div>
          </div>
        </header>

        {/* Panel */}
        <main className="flex-1 overflow-auto p-8">
          <AnimatePresence mode="wait">

            {/* ── DASHBOARD ─────────────────────────────────────── */}
            {activeSection === 'dashboard' && (
              <motion.div key="dashboard" variants={panelVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }} className="space-y-8 max-w-screen-xl">
                <div>
                  <h2 className="text-2xl font-serif text-zinc-900">Good morning, General Manager</h2>
                  <p className="text-zinc-400 text-xs mt-1 uppercase tracking-widest font-bold">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <MetricCard label="Occupancy Rate" value={`${OCCUPANCY_DATA.rate}%`} sub={`${OCCUPANCY_DATA.occupied} of ${OCCUPANCY_DATA.rooms} rooms`} trend="up" icon={Percent} accent />
                  <MetricCard label="Check-Ins Today" value={`${OCCUPANCY_DATA.checkins}`} sub="7 VIP protocols" trend="up" icon={Users} />
                  <MetricCard label="Revenue MTD" value="$284K" sub="+18% vs last month" trend="up" icon={DollarSign} />
                  <MetricCard label="Avg. Guest Rating" value="4.9" sub="Based on 847 reviews" trend="up" icon={Star} />
                </div>

                {/* Occupancy Gauge + Live Events */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Occupancy Visual */}
                  <div className="bg-white border border-zinc-200 rounded-lg p-6 space-y-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400">Room Inventory Status</p>
                    <div className="space-y-4">
                      {[
                        { label: 'Occupied', count: OCCUPANCY_DATA.occupied, color: '#B4975A', total: OCCUPANCY_DATA.rooms },
                        { label: 'Available', count: OCCUPANCY_DATA.available, color: '#10B981', total: OCCUPANCY_DATA.rooms },
                        { label: 'Maintenance', count: 2, color: '#F59E0B', total: OCCUPANCY_DATA.rooms },
                      ].map(({ label, count, color, total }) => (
                        <div key={label} className="space-y-2">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-zinc-600">{label}</span>
                            <span className="text-zinc-900">{count}</span>
                          </div>
                          <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(count / total) * 100}%` }}
                              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Today's Highlights */}
                  <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-lg p-6 space-y-4">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400">Today's Operations Highlights</p>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Users, label: 'Check-Ins', value: '12', color: '#10B981' },
                        { icon: ArrowUpRight, label: 'Check-Outs', value: '8', color: '#3B82F6' },
                        { icon: CalendarDays, label: 'Active Events', value: '2', color: '#B4975A' },
                        { icon: UtensilsCrossed, label: 'Dining Covers', value: '184', color: '#8B5CF6' },
                      ].map(({ icon: Icon, label, value, color }) => (
                        <div key={label} className="p-4 bg-zinc-50 rounded-lg flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + '15' }}>
                            <Icon size={18} strokeWidth={1.5} style={{ color }} />
                          </div>
                          <div>
                            <p className="text-xl font-serif text-zinc-900">{value}</p>
                            <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">{label}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Booking Requests Table */}
                <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-700">Booking Requests</p>
                    <button className="btn-luxury-primary py-2 px-4 text-[9px] rounded-sm cursor-pointer" onClick={() => showToast('Syncing booking requests...')}>
                      <Plus size={12} /> New Booking
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-zinc-100">
                          {['ID', 'Guest', 'Room', 'Dates / Nights', 'Total', 'Status', 'Actions'].map(h => (
                            <th key={h} className="text-left py-3 px-4 text-[9px] uppercase tracking-widest font-bold text-zinc-400">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {BOOKING_REQUESTS.map((b) => (
                          <tr key={b.id} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                            <td className="py-4 px-4 font-mono text-[10px] text-[#B4975A] font-bold">{b.id}</td>
                            <td className="py-4 px-4">
                              <p className="text-sm font-serif text-zinc-900">{b.guest}</p>
                              <span className="text-[8px] uppercase tracking-widest font-bold text-zinc-400">{b.tier}</span>
                            </td>
                            <td className="py-4 px-4 text-xs text-zinc-600 font-medium">{b.room}</td>
                            <td className="py-4 px-4 text-xs text-zinc-600">{b.dates} · {b.nights}N</td>
                            <td className="py-4 px-4 text-sm font-serif font-bold text-zinc-900">{b.total}</td>
                            <td className="py-4 px-4"><StatusBadge status={b.status} /></td>
                            <td className="py-4 px-4">
                              <div className="flex gap-2">
                                <button onClick={() => showToast(`Booking ${b.id} confirmed`)} className="p-1.5 hover:bg-emerald-50 rounded text-zinc-400 hover:text-emerald-600 transition-colors cursor-pointer">
                                  <CheckCircle2 size={14} />
                                </button>
                                <button onClick={() => showToast(`Viewing booking ${b.id}`)} className="p-1.5 hover:bg-zinc-100 rounded text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer">
                                  <Eye size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Events + Inquiries Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Event Requests */}
                  <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-zinc-100">
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-700">Upcoming Events</p>
                    </div>
                    <div className="divide-y divide-zinc-50">
                      {EVENT_REQUESTS.slice(0, 3).map((ev) => (
                        <div key={ev.name} className="px-6 py-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                          <div className="space-y-1">
                            <p className="text-sm font-serif text-zinc-900">{ev.name}</p>
                            <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">{ev.type} · {ev.date} · {ev.guests} guests</p>
                          </div>
                          <div className="text-right space-y-1">
                            <p className="text-sm font-bold text-zinc-900">{ev.value}</p>
                            <StatusBadge status={ev.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inquiries */}
                  <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center">
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-700">Open Inquiries</p>
                      <span className="text-[9px] font-bold text-zinc-400">{INQUIRIES.length} unread</span>
                    </div>
                    <div className="divide-y divide-zinc-50">
                      {INQUIRIES.map((inq) => (
                        <div key={inq.from} className="px-6 py-4 hover:bg-zinc-50 transition-colors cursor-pointer group" onClick={() => showToast('Opening inquiry thread...')}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1 flex-1 min-w-0">
                              <p className="text-xs font-bold text-zinc-900 truncate">{inq.subject}</p>
                              <p className="text-[9px] text-zinc-400 font-mono truncate">{inq.from}</p>
                            </div>
                            <div className="text-right shrink-0 space-y-1">
                              <p className="text-[9px] text-zinc-400">{inq.time}</p>
                              <StatusBadge status={inq.priority} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Restaurant Reservations */}
                <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-zinc-100">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-700">Today's Restaurant Covers</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-zinc-100">
                          {['Time', 'Guest', 'Restaurant', 'Covers', 'Notes', 'Status'].map(h => (
                            <th key={h} className="text-left py-3 px-4 text-[9px] uppercase tracking-widest font-bold text-zinc-400">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {RESTAURANT_RESERVATIONS.map((r) => (
                          <tr key={r.time + r.name} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                            <td className="py-3 px-4 font-mono text-xs font-bold text-[#B4975A]">{r.time}</td>
                            <td className="py-3 px-4 text-sm font-serif">{r.name}</td>
                            <td className="py-3 px-4 text-xs text-zinc-600">{r.restaurant}</td>
                            <td className="py-3 px-4 text-xs text-zinc-600">{r.guests} pax</td>
                            <td className="py-3 px-4 text-xs text-zinc-500 italic max-w-[200px] truncate">{r.notes}</td>
                            <td className="py-3 px-4"><StatusBadge status={r.status} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── ROOMS MANAGER ─────────────────────────────────── */}
            {activeSection === 'rooms' && (
              <motion.div key="rooms" variants={panelVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }} className="space-y-6 max-w-screen-xl">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-serif text-zinc-900">Room Inventory</h2>
                    <p className="text-zinc-400 text-xs mt-1 uppercase tracking-widest font-bold">{ROOMS.length} Residences & Suites</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {ROOMS.map((room) => {
                    const roomStatus = roomStatuses[room.id] || 'Available';
                    return (
                      <div key={room.id} className="bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="grid grid-cols-12 gap-0">
                          <div className="col-span-3 relative h-40">
                            <Image src={room.images[0]} alt={room.name} fill className="object-cover" />
                          </div>
                          <div className="col-span-9 p-6 flex items-center justify-between gap-6">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-start gap-4">
                                <div className="space-y-1 flex-1">
                                  <span className="text-[9px] uppercase tracking-widest font-bold text-[#B4975A]">{room.category} · {room.floor}</span>
                                  <h3 className="text-lg font-serif text-zinc-900">{room.name}</h3>
                                </div>
                                <StatusBadge status={roomStatus} />
                              </div>
                              <div className="flex flex-wrap gap-6 text-[10px] uppercase tracking-widest font-bold text-zinc-400">
                                <span>Size: <span className="text-zinc-700">{room.size}</span></span>
                                <span>Capacity: <span className="text-zinc-700">{room.capacity}</span></span>
                                <span>View: <span className="text-zinc-700">{room.view}</span></span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {room.features.slice(0, 3).map(f => (
                                  <span key={f} className="text-[9px] bg-zinc-50 border border-zinc-200 px-2 py-1 rounded font-bold uppercase tracking-wider text-zinc-500">{f}</span>
                                ))}
                              </div>
                            </div>
                            <div className="text-right space-y-4 shrink-0">
                              <div>
                                <p className="text-2xl font-serif text-zinc-900">${room.basePrice}</p>
                                <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">/ night</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <select
                                  value={roomStatus}
                                  onChange={(e) => {
                                    setRoomStatuses(prev => ({ ...prev, [room.id]: e.target.value }));
                                    showToast(`${room.name} status updated to ${e.target.value}`);
                                  }}
                                  className="text-[9px] uppercase tracking-widest font-bold border border-zinc-200 rounded px-2 py-1.5 bg-white focus:outline-none focus:border-[#B4975A] cursor-pointer"
                                >
                                  <option value="Available">Available</option>
                                  <option value="Occupied">Occupied</option>
                                  <option value="Maintenance">Maintenance</option>
                                </select>
                                <button onClick={() => showToast(`Editing ${room.name} details...`)} className="p-2 hover:bg-zinc-100 rounded transition-colors cursor-pointer">
                                  <Edit3 size={14} className="text-zinc-400" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ── OFFERS MANAGER ────────────────────────────────── */}
            {activeSection === 'offers' && (
              <motion.div key="offers" variants={panelVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }} className="space-y-6 max-w-screen-xl">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-serif text-zinc-900">Offers & Promotions</h2>
                    <p className="text-zinc-400 text-xs mt-1 uppercase tracking-widest font-bold">Seasonal campaigns and curated packages</p>
                  </div>
                  <button onClick={() => showToast('Creating new offer...')} className="btn-luxury-primary py-3 px-6 text-[9px] rounded-sm cursor-pointer flex items-center gap-2">
                    <Plus size={12} /> New Offer
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {OFFERS_DATA.map((offer) => (
                    <div key={offer.name} className="bg-white border border-zinc-200 rounded-lg p-6 space-y-5 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase tracking-widest font-bold text-[#B4975A]">{offer.category}</span>
                          <h3 className="text-lg font-serif text-zinc-900">{offer.name}</h3>
                        </div>
                        <StatusBadge status={offer.status} />
                      </div>
                      <div className="grid grid-cols-3 gap-4 py-4 border-y border-zinc-100">
                        <div className="space-y-1">
                          <p className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold">Rate</p>
                          <p className="text-sm font-serif text-zinc-900">{offer.price}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold">Benefit</p>
                          <p className="text-sm font-serif text-zinc-700">{offer.discount}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold">Bookings</p>
                          <p className="text-sm font-serif text-zinc-900">{offer.bookings}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">Valid until {offer.validUntil}</p>
                        <div className="flex gap-2">
                          <button onClick={() => showToast(`Editing "${offer.name}"...`)} className="p-2 hover:bg-zinc-100 rounded transition-colors cursor-pointer">
                            <Edit3 size={14} className="text-zinc-400" />
                          </button>
                          <button onClick={() => showToast(`"${offer.name}" archived`)} className="p-2 hover:bg-red-50 rounded transition-colors cursor-pointer">
                            <Trash2 size={14} className="text-zinc-400 hover:text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── EVENTS MANAGER ────────────────────────────────── */}
            {activeSection === 'events' && (
              <motion.div key="events" variants={panelVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }} className="space-y-6 max-w-screen-xl">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-serif text-zinc-900">Events & Banquets</h2>
                    <p className="text-zinc-400 text-xs mt-1 uppercase tracking-widest font-bold">Weddings · Conferences · Diplomatic Summits</p>
                  </div>
                  <button onClick={() => showToast('Creating new event request...')} className="btn-luxury-primary py-3 px-6 text-[9px] rounded-sm cursor-pointer flex items-center gap-2">
                    <Plus size={12} /> New Event
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Events This Month', value: '6', icon: CalendarDays },
                    { label: 'Total Delegates', value: '1,162', icon: Users },
                    { label: 'Events Revenue', value: '$142K', icon: DollarSign },
                    { label: 'Avg. Rating', value: '4.8★', icon: Star },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="bg-white border border-zinc-200 rounded-lg p-4 flex items-center gap-4">
                      <Icon size={20} strokeWidth={1.5} className="text-[#B4975A]" />
                      <div>
                        <p className="text-xl font-serif text-zinc-900">{value}</p>
                        <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  {EVENT_REQUESTS.map((ev) => (
                    <div key={ev.name} className="bg-white border border-zinc-200 rounded-lg p-6">
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <span className="text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border border-zinc-300 text-zinc-500">{ev.type}</span>
                            <StatusBadge status={ev.status} />
                          </div>
                          <h3 className="text-xl font-serif text-zinc-900">{ev.name}</h3>
                          <div className="flex flex-wrap gap-6 text-[10px] uppercase tracking-widest font-bold text-zinc-400">
                            <span className="flex items-center gap-1.5"><Calendar size={10} /> {ev.date}</span>
                            <span className="flex items-center gap-1.5"><Users size={10} /> {ev.guests} Delegates</span>
                            <span className="flex items-center gap-1.5"><MapPin size={10} /> {ev.space}</span>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="text-2xl font-serif text-zinc-900">{ev.value}</p>
                          <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">Event Value</p>
                          <div className="flex gap-2 justify-end">
                            <button onClick={() => showToast(`Editing event: ${ev.name}`)} className="p-2 hover:bg-zinc-100 rounded transition-colors cursor-pointer">
                              <Edit3 size={14} className="text-zinc-400" />
                            </button>
                            <button onClick={() => showToast(`Viewing proposal for ${ev.name}`)} className="btn-luxury-outline py-2 px-4 text-[9px] rounded-sm cursor-pointer">
                              View Proposal
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── RESTAURANT MANAGER ────────────────────────────── */}
            {activeSection === 'restaurant' && (
              <motion.div key="restaurant" variants={panelVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }} className="space-y-6 max-w-screen-xl">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-serif text-zinc-900">Restaurant Manager</h2>
                    <p className="text-zinc-400 text-xs mt-1 uppercase tracking-widest font-bold">Menu management and featured dishes</p>
                  </div>
                  <button onClick={() => showToast('Adding new menu item...')} className="btn-luxury-primary py-3 px-6 text-[9px] rounded-sm cursor-pointer flex items-center gap-2">
                    <Plus size={12} /> Add Dish
                  </button>
                </div>

                {/* Restaurant Selector */}
                <div className="flex gap-3">
                  {(Object.keys(MENU_ITEMS) as (keyof typeof MENU_ITEMS)[]).map(r => (
                    <button
                      key={r}
                      onClick={() => setSelectedRestaurant(r)}
                      className={`px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer ${selectedRestaurant === r
                        ? 'bg-[#B4975A] text-white'
                        : 'bg-white border border-zinc-200 text-zinc-500 hover:border-[#B4975A] hover:text-[#B4975A]'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-700">{selectedRestaurant} — Menu Items</p>
                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">{MENU_ITEMS[selectedRestaurant].length} Items</p>
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-zinc-100">
                        {['Dish', 'Category', 'Price', 'Allergens', 'Featured', 'Actions'].map(h => (
                          <th key={h} className="text-left py-3 px-6 text-[9px] uppercase tracking-widest font-bold text-zinc-400">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {MENU_ITEMS[selectedRestaurant].map((item) => (
                        <tr key={item.name} className="border-b border-zinc-50 hover:bg-zinc-50 transition-colors">
                          <td className="py-4 px-6 font-serif text-sm text-zinc-900">{item.name}</td>
                          <td className="py-4 px-6 text-[9px] uppercase tracking-widest text-zinc-500 font-bold">{item.category}</td>
                          <td className="py-4 px-6 font-bold text-sm text-zinc-900">{item.price}</td>
                          <td className="py-4 px-6 text-xs text-zinc-500">{item.allergens}</td>
                          <td className="py-4 px-6">
                            <button onClick={() => showToast(`Featured status updated for ${item.name}`)} className="cursor-pointer">
                              {item.featured
                                ? <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#B4975A]"><Star size={12} fill="currentColor" /> Featured</span>
                                : <span className="text-[9px] font-bold text-zinc-300 flex items-center gap-1.5"><Star size={12} /> Set Featured</span>
                              }
                            </button>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex gap-2">
                              <button onClick={() => showToast(`Editing ${item.name}...`)} className="p-1.5 hover:bg-zinc-100 rounded cursor-pointer"><Edit3 size={13} className="text-zinc-400" /></button>
                              <button onClick={() => showToast(`${item.name} removed from menu`)} className="p-1.5 hover:bg-red-50 rounded cursor-pointer"><Trash2 size={13} className="text-zinc-400 hover:text-red-500" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* ── MEDIA MANAGER ─────────────────────────────────── */}
            {activeSection === 'media' && (
              <motion.div key="media" variants={panelVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }} className="space-y-6 max-w-screen-xl">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-serif text-zinc-900">Media Manager</h2>
                    <p className="text-zinc-400 text-xs mt-1 uppercase tracking-widest font-bold">Photos · Videos · Brand Assets</p>
                  </div>
                  <button onClick={() => showToast('Opening upload manager...')} className="btn-luxury-primary py-3 px-6 text-[9px] rounded-sm cursor-pointer flex items-center gap-2">
                    <Upload size={12} /> Upload Media
                  </button>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 flex-wrap">
                  {['All', 'Rooms', 'Dining', 'Events', 'Wellness', 'Exterior'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setMediaFilter(cat)}
                      className={`px-4 py-2 rounded-full text-[9px] uppercase tracking-widest font-bold transition-all cursor-pointer ${mediaFilter === cat
                        ? 'bg-zinc-900 text-white'
                        : 'bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-400'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {MEDIA_GALLERY
                    .filter(m => mediaFilter === 'All' || m.category === mediaFilter)
                    .map((item) => (
                      <div key={item.url} className="group relative aspect-square overflow-hidden rounded-lg bg-zinc-100">
                        <Image src={item.url} alt={item.label} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300" />
                        <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-[10px] font-bold">{item.label}</p>
                          <span className="text-white/60 text-[8px] uppercase tracking-widest">{item.category}</span>
                        </div>
                        <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => showToast('Media downloaded')} className="p-1.5 bg-white/90 rounded text-zinc-700 hover:bg-white cursor-pointer">
                            <Eye size={12} />
                          </button>
                          <button onClick={() => showToast('Media deleted')} className="p-1.5 bg-white/90 rounded text-zinc-700 hover:bg-red-100 cursor-pointer">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* ── SETTINGS ──────────────────────────────────────── */}
            {activeSection === 'settings' && (
              <motion.div key="settings" variants={panelVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }} className="space-y-8 max-w-2xl">
                <div>
                  <h2 className="text-2xl font-serif text-zinc-900">System Settings</h2>
                  <p className="text-zinc-400 text-xs mt-1 uppercase tracking-widest font-bold">Contact, SEO, and social media configuration</p>
                </div>

                {/* Contact Details */}
                <div className="bg-white border border-zinc-200 rounded-lg p-6 space-y-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-700 border-b border-zinc-100 pb-4">Contact Details</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: 'Hotel Name', key: 'hotelName', icon: null },
                      { label: 'Phone Number', key: 'phone', icon: null },
                      { label: 'Email Address', key: 'email', icon: null },
                      { label: 'Physical Address', key: 'address', icon: null },
                    ].map(({ label, key }) => (
                      <div key={key} className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-400">{label}</label>
                        <input
                          type="text"
                          value={settings[key as keyof typeof settings]}
                          onChange={(e) => setSettings(prev => ({ ...prev, [key]: e.target.value }))}
                          className="w-full border-b border-zinc-200 focus:border-[#B4975A] py-2 text-sm focus:outline-none bg-transparent transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* SEO Settings */}
                <div className="bg-white border border-zinc-200 rounded-lg p-6 space-y-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-700 border-b border-zinc-100 pb-4">SEO Settings</p>
                  <div className="space-y-6">
                    {[
                      { label: 'Meta Title', key: 'metaTitle' },
                      { label: 'Meta Description', key: 'metaDesc' },
                      { label: 'Google Analytics ID', key: 'googleAnalytics' },
                    ].map(({ label, key }) => (
                      <div key={key} className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-400">{label}</label>
                        <input
                          type="text"
                          value={settings[key as keyof typeof settings]}
                          onChange={(e) => setSettings(prev => ({ ...prev, [key]: e.target.value }))}
                          className="w-full border-b border-zinc-200 focus:border-[#B4975A] py-2 text-sm focus:outline-none bg-transparent transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-white border border-zinc-200 rounded-lg p-6 space-y-6">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-700 border-b border-zinc-100 pb-4">Social Media Links</p>
                  <div className="space-y-4">
                    {[
                      { label: 'Instagram', key: 'instagram', icon: Link2 },
                      { label: 'Facebook', key: 'facebook', icon: Link2 },
                      { label: 'Twitter / X', key: 'twitter', icon: Link2 },
                    ].map(({ label, key, icon: Icon }) => (
                      <div key={key} className="flex items-center gap-4">
                        <Icon size={16} className="text-zinc-400 shrink-0" />
                        <div className="flex-1 space-y-1">
                          <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-400">{label}</label>
                          <input
                            type="text"
                            value={settings[key as keyof typeof settings]}
                            onChange={(e) => setSettings(prev => ({ ...prev, [key]: e.target.value }))}
                            className="w-full border-b border-zinc-200 focus:border-[#B4975A] py-2 text-sm focus:outline-none bg-transparent transition-colors"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => showToast('Settings saved successfully — changes published live')}
                  className="btn-luxury-primary py-4 px-12 rounded-sm cursor-pointer flex items-center gap-3"
                >
                  <Save size={14} /> Save All Settings
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-200 bg-white px-8 py-4 flex justify-between items-center shrink-0">
          <p className="text-[9px] uppercase tracking-widest text-zinc-300 font-bold">
            Skylight Hotel Addis Ababa · Property Management Suite
          </p>
          <p className="text-[9px] uppercase tracking-widest text-zinc-300 font-bold">
            Powered by Melhek Technologies
          </p>
        </footer>
      </div>
    </div>
  );
}
