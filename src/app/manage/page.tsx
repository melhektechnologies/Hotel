'use client';

import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortalSidebar from "@/components/layout/PortalSidebar";
import DataTable from "@/components/ui/DataTable";
import { getReservationById, updateGuestPreferences, type ReservationDetails } from "@/lib/actions/manage";
import { HOTEL_BRAND } from '@/lib/constants';
import { 
  Search, Calendar, MapPin, ChevronRight, Loader2, ArrowRight, 
  Sparkles, CheckCircle2, AlertCircle, Info, Plane, Thermometer, 
  BedDouble, Heart, Flame, ShieldAlert, FileText, Check, Printer
} from "lucide-react";
import Image from "next/image";

// Mock Spa & Dining Data for Tables
const SPA_TREATMENTS = [
  { id: "spa-1", name: "Ethio-Coffee Body Polish", duration: "90 min", category: "Traditional", price: "$180", status: "Available" },
  { id: "spa-2", name: "Nile Frankincense Massage", duration: "75 min", category: "Therapeutic", price: "$210", status: "Available" },
  { id: "spa-3", name: "Tsebel Hot Springs Ritual", duration: "90 min", category: "Traditional", price: "$195", status: "Available" },
  { id: "spa-4", name: "Highlands Herb Revitalization", duration: "60 min", category: "Aesthetic", price: "$160", status: "Available" },
  { id: "spa-5", name: "Aesthetic Oxygen Infusion", duration: "75 min", category: "Clinic", price: "$280", status: "Available" }
];

const DINING_OPTIONS = [
  { id: "dining-1", name: "Ta'em Traditional Room", chef: "Tigist Hailemariam", concept: "Ethiopian Heritage", hours: "12:00 - 23:00", status: "Optimal" },
  { id: "dining-2", name: "The Grand Pavilion", chef: "Jean-Marc Dubois", concept: "East African Fine Dining", hours: "06:00 - 23:00", status: "Optimal" },
  { id: "dining-3", name: "VIP Executive Club Lounge", chef: "Lounge Chef Detail", concept: "Continental & Cocktails", hours: "06:00 - 22:00", status: "Bespoke" }
];

// Mock ESG ledger logs
const ESG_LOGS = [
  { id: "esg-1", type: "Solar Hot Water Offset", value: "38.5% Savings", verifiedBy: "Addis Energy Bureau", date: "2026-06-13", status: "Active" },
  { id: "esg-2", type: "Local Farmer Sourcing", value: "84.3% Ingredients", verifiedBy: "Ethio-Agri Group", date: "2026-06-10", status: "Verified" },
  { id: "esg-3", type: "Greywater Recycling", value: "95.5% Irrigation", verifiedBy: "Addis Water & Sewerage", date: "2026-06-08", status: "Optimal" },
  { id: "esg-4", type: "Single-Use Plastic Reduction", value: "99.8% Diverted", verifiedBy: "UNEP Africa", date: "2026-06-05", status: "Active" }
];

export default function ManageBookingPage() {
  const [bookingId, setBookingId] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'error'>('idle');
  const [activeSection, setActiveSection] = useState("overview");
  const [reservationData, setReservationData] = useState<ReservationDetails | null>(null);

  // Guest Preferences State
  const [preferences, setPreferences] = useState({
    pillowType: "Feather",
    roomTemp: 21.5,
    dietary: "None",
    transferMode: "CHAUFFEUR",
    flightNumber: "QR 382",
    baggageCount: 2
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [isPending, startTransition] = useTransition();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId) return;
    setStatus('loading');
    
    startTransition(async () => {
      const res = await getReservationById(bookingId.toUpperCase().trim());
      if (res.success && res.data) {
        setReservationData(res.data);
        setPreferences({
          pillowType: res.data.preferences.pillowType,
          roomTemp: res.data.preferences.roomTemp,
          dietary: res.data.preferences.dietary,
          transferMode: res.data.preferences.transferMode,
          flightNumber: "QR 382",
          baggageCount: 2
        });
        setStatus('found');
      } else {
        setStatus('error');
      }
    });
  };

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    
    const res = await updateGuestPreferences(
      reservationData!.id,
      reservationData!.guestEmail,
      {
        pillowType: preferences.pillowType,
        roomTemp: preferences.roomTemp,
        dietary: preferences.dietary,
        transferMode: preferences.transferMode
      }
    );

    if (res.success) {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } else {
      alert(res.error || "Failed to update preferences.");
      setSaveStatus('idle');
    }
  };

  const handleBookService = (serviceType: string, serviceName: string) => {
    alert(`Reservation request submitted to Guest Services Concierge for: ${serviceName}`);
  };

  const handleCheckInOnline = () => {
    alert("Online Check-In complete! Your arrival protocol has been synchronized.");
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  if (status === 'found' && reservationData) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex">
        {/* Printable Receipt Summary (Hidden in screen media, active in print layouts) */}
        <div className="hidden print:block w-full p-16 space-y-12 text-black bg-white min-h-screen">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-serif tracking-[0.2em] uppercase font-bold">{HOTEL_BRAND.name}</h1>
            <p className="text-[10px] tracking-[0.4em] uppercase opacity-60">Resort Invoice & Summary Statement</p>
          </div>
          
          <div className="border-t border-b border-black/20 py-8 grid grid-cols-2 gap-8 text-xs font-semibold">
            <div className="space-y-2">
              <p className="opacity-40 uppercase tracking-widest text-[9px]">Registered Guest</p>
              <p className="text-sm">{reservationData.guestName}</p>
              <p className="opacity-60">{reservationData.guestEmail}</p>
            </div>
            <div className="space-y-2">
              <p className="opacity-40 uppercase tracking-widest text-[9px]">Reservation Details</p>
              <p className="font-mono font-bold text-sm">ID: {reservationData.id}</p>
              <p className="opacity-60">Sanctuary: {reservationData.roomName}</p>
            </div>
          </div>

          <div className="space-y-6 text-xs font-semibold">
            <div className="flex justify-between py-2 border-b border-black/5">
              <span className="opacity-60">Check-In Date</span>
              <span>{reservationData.checkIn}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-black/5">
              <span className="opacity-60">Check-Out Date</span>
              <span>{reservationData.checkOut}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-black/5">
              <span className="opacity-60">Pillow Suite Preference</span>
              <span>{preferences.pillowType}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-black/5">
              <span className="opacity-60">Room Climate Selection</span>
              <span>{preferences.roomTemp}°C</span>
            </div>
            <div className="flex justify-between py-4 border-t-2 border-black text-sm font-bold mt-12">
              <span>Total Accommodations Charges</span>
              <span className="text-lg font-mono">${reservationData.totalPrice.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="pt-24 text-center space-y-2 opacity-50 font-mono text-[9px]">
            <p>Skylight Hotel Addis Ababa • Bole Airport Area, Airport Road, Addis Ababa, Ethiopia</p>
            <p>Generated on {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Collapsible Sidebar (Hidden on Print) */}
        <div className="print:hidden">
          <PortalSidebar 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            guestName={reservationData.guestName}
            guestTier={reservationData.guestTier}
            onExit={() => {
              setStatus('idle');
              setBookingId("");
              setReservationData(null);
            }}
          />
        </div>

        {/* Scrollable Main Workspace Content (Hidden on Print) */}
        <main className="flex-1 lg:pl-64 min-h-screen flex flex-col pt-24 lg:pt-0 print:hidden">
          
          {/* Workspace Header */}
          <header className="px-8 lg:px-16 py-6 border-b border-border/50 bg-white/50 backdrop-blur-md sticky top-0 z-20 flex justify-between items-center h-20">
            <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
              <span>Guest Hub</span>
              <span className="opacity-40">/</span>
              <span className="text-foreground capitalize">{activeSection}</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest font-mono text-accent bg-accent/10 px-3 py-1 rounded-medium">
                ID: {reservationData.id}
              </span>
            </div>
          </header>

          {/* Panel Container */}
          <div className="flex-grow p-8 lg:p-16 max-w-screen-xl w-full mx-auto">
            <AnimatePresence mode="wait">
              {activeSection === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-12"
                >
                  {/* Summary Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                      <h2 className="text-4xl font-serif">Welcome Back, {reservationData.guestName.split(' ')[1] || reservationData.guestName}</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">Your stay begins on {reservationData.checkIn}. Explore your itinerary and manage preferences.</p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <button 
                        onClick={handlePrintInvoice}
                        className="btn-luxury-outline py-4 px-6 rounded-medium flex items-center gap-2 cursor-pointer"
                      >
                        <Printer size={14} /> Print Receipt
                      </button>
                      <button 
                        onClick={handleCheckInOnline}
                        className="btn-luxury-primary py-4 px-8 rounded-medium shadow-md flex items-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 size={14} className="text-accent" /> Confirm Arrival Protocol
                      </button>
                    </div>
                  </div>

                  {/* High-Fidelity Analytics / Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    <div className="bg-white border border-border/60 rounded-medium shadow-subtle p-6 space-y-4">
                      <div className="flex justify-between items-center text-accent">
                        <BedDouble size={20} strokeWidth={1.5} />
                        <span className="text-[9px] uppercase tracking-widest font-bold opacity-50">Residence</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-serif">{reservationData.roomName}</h4>
                        <p className="text-xs text-muted-foreground mt-1">Climate: {preferences.roomTemp}°C</p>
                      </div>
                    </div>

                    <div className="bg-white border border-border/60 rounded-medium shadow-subtle p-6 space-y-4">
                      <div className="flex justify-between items-center text-accent">
                        <Plane size={20} strokeWidth={1.5} />
                        <span className="text-[9px] uppercase tracking-widest font-bold opacity-50">Transfers</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-serif">Airport Transfer</h4>
                        <p className="text-xs text-muted-foreground mt-1">Active (Flight: {preferences.flightNumber})</p>
                      </div>
                    </div>

                    <div className="bg-white border border-border/60 rounded-medium shadow-subtle p-6 space-y-4">
                      <div className="flex justify-between items-center text-accent">
                        <Heart size={20} strokeWidth={1.5} />
                        <span className="text-[9px] uppercase tracking-widest font-bold opacity-50">Wellness</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-serif">Spa Scheduled</h4>
                        <p className="text-xs text-muted-foreground mt-1">Available sessions open</p>
                      </div>
                    </div>

                    <div className="bg-white border border-border/60 rounded-medium shadow-subtle p-6 space-y-4">
                      <div className="flex justify-between items-center text-accent">
                        <Flame size={20} strokeWidth={1.5} />
                        <span className="text-[9px] uppercase tracking-widest font-bold opacity-50">Folio Summary</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-serif">${reservationData.totalPrice.toLocaleString()}</h4>
                        <p className="text-xs text-muted-foreground mt-1">Verified Charge</p>
                      </div>
                    </div>

                  </div>

                  {/* Splitting Details / Hero Visualizer */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 bg-white border border-border/60 rounded-medium shadow-subtle overflow-hidden">
                      <div className="relative h-64 md:h-80">
                        <Image 
                          src="https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=1200" 
                          alt="Reserved Room" 
                          fill 
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-8 left-8 text-white">
                          <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-accent mb-2 block">Confirmed Stay</span>
                          <h2 className="text-3xl font-serif">{reservationData.roomName}</h2>
                        </div>
                      </div>
                      
                      <div className="p-8 space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-[10px] uppercase tracking-widest font-bold">
                           <div className="space-y-1">
                             <p className="opacity-40">Registered Guest</p>
                             <p>{reservationData.guestName}</p>
                           </div>
                           <div className="space-y-1">
                             <p className="opacity-40">Period</p>
                             <p>{reservationData.checkIn} — {reservationData.checkOut}</p>
                           </div>
                           <div className="space-y-1">
                             <p className="opacity-40">Total Charges</p>
                             <p className="text-accent">${reservationData.totalPrice.toLocaleString()}</p>
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-4 bg-white border border-border/60 rounded-medium shadow-subtle p-8 space-y-6">
                      <h3 className="text-lg font-serif">Concierge & Protocol Desk</h3>
                      <div className="space-y-4">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Our guest relations team is prepared to coordinate VIP protocol, airport transfers, early check-in, or custom requests.
                        </p>
                        <div className="p-4 bg-muted/30 rounded-medium border border-border/40 text-center">
                          <p className="text-[8px] uppercase tracking-widest font-bold opacity-40">VIP Guest Liaison</p>
                          <p className="text-sm font-serif font-bold mt-1">Protocol Liaison Yohannes Alemu</p>
                          <p className="text-accent text-xs tracking-widest font-bold mt-2">{HOTEL_BRAND.contact.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "sanctuary" && (
                <motion.div
                  key="sanctuary"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-12"
                >
                  <div className="space-y-2">
                    <h2 className="text-4xl font-serif">Preferences & Sanctuary Setup</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">Customize your room environment and sleeping setup. All preferences are synced immediately with host operations.</p>
                  </div>

                  <div className="max-w-2xl bg-white border border-border/60 rounded-medium shadow-subtle p-8 md:p-12">
                    <form onSubmit={handleSavePreferences} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Pillow Selection */}
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/85 block">Pillow Type</label>
                          <select 
                            value={preferences.pillowType}
                            onChange={(e) => setPreferences({...preferences, pillowType: e.target.value})}
                            className="w-full border-b border-border py-3 px-1 text-sm font-serif focus:outline-none focus:border-accent bg-transparent"
                          >
                            <option value="Feather">Signature Goose Down (Soft)</option>
                            <option value="Memory Foam">Orthopedic Memory Foam (Firm)</option>
                            <option value="Buckwheat">Traditional Buckwheat (Cooling)</option>
                            <option value="Lavender">Lavender-infused Hypoallergenic</option>
                          </select>
                        </div>

                        {/* Room Temp */}
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/85 flex justify-between">
                            <span>Room Climate</span>
                            <span className="text-accent font-mono">{preferences.roomTemp}°C</span>
                          </label>
                          <div className="flex items-center gap-4 pt-3">
                            <Thermometer size={16} className="text-muted-foreground" />
                            <input 
                              type="range"
                              min="18"
                              max="26"
                              step="0.5"
                              value={preferences.roomTemp}
                              onChange={(e) => setPreferences({...preferences, roomTemp: parseFloat(e.target.value)})}
                              className="w-full accent-accent bg-muted h-1 rounded-sm appearance-none cursor-pointer"
                            />
                          </div>
                        </div>

                        {/* Dietary Requirements */}
                        <div className="space-y-3 md:col-span-2">
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/85 block">Dietary Preferences & Notes</label>
                          <input 
                            type="text"
                            placeholder="Gluten-free, vegan options, nut allergies..."
                            value={preferences.dietary}
                            onChange={(e) => setPreferences({...preferences, dietary: e.target.value})}
                            className="w-full border-b border-border py-3 px-1 text-sm font-serif focus:outline-none focus:border-accent bg-transparent"
                          />
                        </div>

                        {/* Transfer Mode */}
                        <div className="space-y-3">
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/85 block">Airport Transfer Mode</label>
                          <select 
                            value={preferences.transferMode}
                            onChange={(e) => setPreferences({...preferences, transferMode: e.target.value})}
                            className="w-full border-b border-border py-3 px-1 text-sm font-serif focus:outline-none focus:border-accent bg-transparent"
                          >
                            <option value="MERCEDES_S_CLASS">Skylight Executive Mercedes S-Class</option>
                            <option value="SHUTTLE">Complimentary VIP Shuttle Coach</option>
                            <option value="MOTORCADE">Private Delegation Motorcade</option>
                            <option value="NONE">No Transfer Required</option>
                          </select>
                        </div>

                      </div>

                      <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                        <div>
                          {saveStatus === 'saved' && (
                            <motion.span 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-xs text-success font-semibold flex items-center gap-2"
                            >
                              <CheckCircle2 size={14} /> Preferences updated.
                            </motion.span>
                          )}
                        </div>
                        <button 
                          type="submit" 
                          disabled={saveStatus === 'saving'}
                          className="btn-luxury-primary py-4 px-12 rounded-medium flex items-center gap-2 cursor-pointer"
                        >
                          {saveStatus === 'saving' ? (
                            <>
                              <Loader2 size={12} className="animate-spin text-accent" />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <span>Save Preferences</span>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}

              {activeSection === "dining" && (
                <motion.div
                  key="dining"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-12"
                >
                  <div className="space-y-2">
                    <h2 className="text-4xl font-serif">Gastronomy & Fine Dining</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">Book reservations at our Michelin-starred concepts. Choose dining menus and custom timings.</p>
                  </div>

                  <DataTable 
                    data={DINING_OPTIONS}
                    columns={[
                      { header: "Restaurant", accessorKey: "name", sortable: true },
                      { header: "Chef", accessorKey: "chef" },
                      { header: "Concept", accessorKey: "concept", sortable: true },
                      { header: "Hours", accessorKey: "hours" },
                      { 
                        header: "Actions", 
                        accessorKey: (row) => (
                          <button 
                            onClick={() => handleBookService("dining", row.name)}
                            className="border border-border/80 text-[9px] uppercase tracking-widest font-bold px-4 py-2 hover:border-accent hover:text-accent transition-colors rounded-medium cursor-pointer"
                          >
                            Reserve Table
                          </button>
                        ) 
                      }
                    ]}
                    searchKey="name"
                    searchPlaceholder="Search dining concepts..."
                  />
                </motion.div>
              )}

              {activeSection === "spa" && (
                <motion.div
                  key="spa"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-12"
                >
                  <div className="space-y-2">
                    <h2 className="text-4xl font-serif">Sacred Spa Treatment Menu</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">Filter treatments based on your wellness category and check price details.</p>
                  </div>

                  <DataTable 
                    data={SPA_TREATMENTS}
                    columns={[
                      { header: "Treatment Name", accessorKey: "name", sortable: true },
                      { header: "Duration", accessorKey: "duration", sortable: true },
                      { header: "Category", accessorKey: "category", sortable: true },
                      { header: "Price", accessorKey: "price", sortable: true },
                      { 
                        header: "Actions", 
                        accessorKey: (row) => (
                          <button 
                            onClick={() => handleBookService("spa", row.name)}
                            className="btn-luxury-primary py-2 px-4 text-[9px] tracking-wider rounded-medium cursor-pointer"
                          >
                            Book Session
                          </button>
                        ) 
                      }
                    ]}
                    searchKey="name"
                    searchPlaceholder="Search treatment name..."
                    filterKey="category"
                    filterOptions={[
                      { label: "Ayurveda", value: "Ayurveda" },
                      { label: "Aesthetic Clinic", value: "Clinic" },
                      { label: "Mindfulness", value: "Mindfulness" }
                    ]}
                  />
                </motion.div>
              )}

              {activeSection === "transfer" && (
                <motion.div
                  key="transfer"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-12"
                >
                  <div className="space-y-2">
                    <h2 className="text-4xl font-serif">VIP Airport Transfer Tracker</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">Provide your flight details and track your luxury private chauffeur or VIP shuttle logistics.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 bg-white border border-border/60 rounded-medium shadow-subtle p-8 md:p-12 space-y-6">
                      <h3 className="text-lg font-serif">Arrival Information</h3>
                      <form onSubmit={handleSavePreferences} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold opacity-60">International Flight Number</label>
                            <input 
                              type="text"
                              value={preferences.flightNumber}
                              onChange={(e) => setPreferences({...preferences, flightNumber: e.target.value})}
                              className="w-full border-b border-border py-3 px-1 text-sm focus:outline-none focus:border-accent bg-transparent"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold opacity-60">Baggage Pieces</label>
                            <input 
                              type="number"
                              value={preferences.baggageCount}
                              onChange={(e) => setPreferences({...preferences, baggageCount: parseInt(e.target.value)})}
                              className="w-full border-b border-border py-3 px-1 text-sm focus:outline-none focus:border-accent bg-transparent"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end pt-4">
                          <button type="submit" className="btn-luxury-primary py-4 px-10 rounded-medium cursor-pointer">
                            Update details
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="lg:col-span-5 bg-white border border-border/60 rounded-medium shadow-subtle p-8 space-y-6">
                      <h3 className="text-lg font-serif">Transfer Logistics</h3>
                      <div className="space-y-6">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">Carrier Fleet</span>
                          <span className="font-semibold">Skylight Executive Fleet</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">Route</span>
                          <span className="font-semibold">Bole International Airport (ADD) → Skylight Hotel</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-muted-foreground">Logistics Status</span>
                          <span className="text-success font-bold flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-success animate-pulse" /> OPTIMAL
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "impact" && (
                <motion.div
                  key="impact"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-12"
                >
                  <div className="space-y-2">
                    <h2 className="text-4xl font-serif">Verified Regenerative Impact Ledger</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">Live audit reports showing carbon offsets and solar energy generated under our clean urban architecture.</p>
                  </div>

                  <DataTable 
                    data={ESG_LOGS}
                    columns={[
                      { header: "Impact Domain", accessorKey: "type", sortable: true },
                      { header: "Measured Value", accessorKey: "value", sortable: true },
                      { header: "Verification Authority", accessorKey: "verifiedBy", sortable: true },
                      { header: "Log Date", accessorKey: "date", sortable: true },
                      { 
                        header: "Status", 
                        accessorKey: (row) => (
                          <span className="text-success font-bold flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-success" /> {row.status}
                          </span>
                        ) 
                      }
                    ]}
                    searchKey="type"
                    searchPlaceholder="Search impact domain..."
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-white">
      <Navbar />

      <main className="pt-40 pb-32">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24">
          
          <header className="max-w-2xl mb-24 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.6em] text-accent font-bold block">Guest Portal</span>
            <h1 className="text-display">Manage Your <br /> <span className="italic font-light">Experience</span></h1>
            <p className="text-editorial text-muted-foreground">
              Retrieve your reservation details to manage dining preferences, spa appointments, and arrival arrangements.
            </p>
          </header>

          <div className="max-w-xl">
            <form onSubmit={handleSearch} className="space-y-12 bg-white border border-border p-8 md:p-16 rounded-medium shadow-subtle">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-60">Reservation ID</label>
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="E.G. ATH-2026-X82Q"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    className="w-full border-b border-border py-4 text-2xl font-serif focus:outline-none focus:border-accent transition-all uppercase"
                  />
                  {(status === 'loading' || isPending) && <Loader2 size={24} className="absolute right-0 top-1/2 -translate-y-1/2 animate-spin text-accent" />}
                </div>
              </div>

              {status === 'error' && (
                <p className="text-xs text-red-500 font-bold tracking-widest uppercase flex items-center gap-2">
                  <AlertCircle size={14} /> Reservation not found. Please verify your ID.
                </p>
              )}

              <button 
                type="submit"
                disabled={status === 'loading' || isPending}
                className="btn-luxury-primary w-full py-6 flex items-center justify-center gap-4 disabled:opacity-50 cursor-pointer"
              >
                Retrieve Sanctuary <ArrowRight size={18} />
              </button>
              
              <div className="pt-8 border-t border-border flex justify-between items-center text-[10px] uppercase tracking-widest font-bold opacity-40">
                <p>Lost your ID?</p>
                <button type="button" className="hover:text-accent transition-colors">Contact Concierge</button>
              </div>
            </form>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
