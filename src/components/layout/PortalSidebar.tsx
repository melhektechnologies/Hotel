'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, LayoutDashboard, Compass, UtensilsCrossed, 
  Sparkles, Plane, ShieldCheck, Heart, LogOut, Command, Menu, X
} from 'lucide-react';

type NavItem = {
  label: string;
  icon: React.ReactNode;
  value: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

interface PortalSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  guestName: string;
  guestTier: string;
  onExit: () => void;
}

export default function PortalSidebar({
  activeSection,
  onSectionChange,
  guestName,
  guestTier,
  onExit
}: PortalSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigationGroups: NavGroup[] = [
    {
      title: "Workspace",
      items: [
        { label: "Overview Hub", icon: <LayoutDashboard size={16} />, value: "overview" },
        { label: "Sanctuary Details", icon: <Compass size={16} />, value: "sanctuary" },
      ]
    },
    {
      title: "Experiences",
      items: [
        { label: "Gastronomy Menu", icon: <UtensilsCrossed size={16} />, value: "dining" },
        { label: "Sacred Spa", icon: <Heart size={16} />, value: "spa" },
        { label: "Airport Transfer", icon: <Plane size={16} />, value: "transfer" },
      ]
    },
    {
      title: "Governance",
      items: [
        { label: "Impact Ledger", icon: <ShieldCheck size={16} />, value: "impact" },
      ]
    }
  ];

  const sidebarWidth = collapsed ? "w-20" : "w-64";

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <>
      {/* Mobile Sticky Bar */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md border-b border-border/80 px-6 py-4 flex justify-between items-center z-40">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-widest font-bold">Skylight OS</span>
          <span className="text-[9px] opacity-40 font-mono">Guest Workspace</span>
        </div>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 border border-border/80 rounded-medium bg-white shadow-subtle hover:bg-muted/10 transition-colors"
        >
          {mobileOpen ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 256 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`hidden lg:flex flex-col h-screen fixed left-0 top-0 bg-white border-r border-border/60 z-30 overflow-hidden select-none`}
      >
        {/* Brand Header */}
        <div className="p-6 flex items-center justify-between border-b border-border/50 h-24">
          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col"
            >
              <span className="text-sm font-serif tracking-[0.2em] uppercase font-bold text-foreground">Skylight OS</span>
              <span className="text-[8px] tracking-[0.4em] uppercase text-accent font-bold">Property Hub</span>
            </motion.div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center rounded-sm font-serif font-bold text-xs shadow-md">
              A
            </div>
          )}
          
          <button 
            onClick={toggleSidebar}
            className="p-1.5 border border-border/80 rounded-medium hover:bg-muted/10 transition-colors"
          >
            {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 py-8 px-4 space-y-8 overflow-y-auto scrollbar-hide">
          {navigationGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-3">
              {!collapsed && (
                <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-foreground/60 px-4">
                  {group.title}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = activeSection === item.value;
                  return (
                    <button
                      key={item.value}
                      onClick={() => onSectionChange(item.value)}
                      className={`w-full flex items-center gap-4 px-4 py-3 text-xs font-semibold rounded-medium transition-all group cursor-pointer ${
                        isActive 
                        ? 'bg-foreground text-background shadow-md' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                      }`}
                    >
                      <div className={`transition-transform duration-500 group-hover:scale-110 ${isActive ? 'text-accent' : 'text-muted-foreground/80 group-hover:text-accent'}`}>
                        {item.icon}
                      </div>
                      {!collapsed && (
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="truncate uppercase tracking-wider text-[10px]"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Profile and Logout Section */}
        <div className="p-4 border-t border-border/50 bg-muted/20">
          {!collapsed ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 px-2">
                <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center font-serif text-accent font-bold">
                  {guestName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-foreground truncate">{guestName}</h4>
                  <p className="text-[8px] uppercase tracking-widest text-accent font-bold flex items-center gap-1">
                    <Sparkles size={8} className="animate-pulse" /> {guestTier}
                  </p>
                </div>
              </div>
              <button 
                onClick={onExit}
                className="w-full flex items-center justify-center gap-2 py-3 border border-border/80 rounded-medium bg-white text-muted-foreground hover:text-foreground text-[10px] uppercase tracking-widest font-bold shadow-subtle hover:bg-muted/10 transition-all cursor-pointer"
              >
                <LogOut size={12} /> Exit Workspace
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-2">
              <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center font-serif text-accent font-bold shadow-inner">
                {guestName.charAt(0)}
              </div>
              <button 
                onClick={onExit}
                className="p-3 border border-border/80 rounded-medium bg-white text-muted-foreground hover:text-foreground shadow-subtle hover:bg-muted/10 transition-all cursor-pointer"
              >
                <LogOut size={12} />
              </button>
            </div>
          )}
        </div>
      </motion.aside>

      {/* Mobile Sidebar Overlay Drawer */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: mobileOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="lg:hidden fixed top-0 left-0 w-80 h-screen bg-white z-50 shadow-high border-r border-border/80 flex flex-col pt-24"
      >
        <div className="flex-1 py-8 px-6 space-y-8 overflow-y-auto">
          {navigationGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-4">
              <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-foreground/60 px-4">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = activeSection === item.value;
                  return (
                    <button
                      key={item.value}
                      onClick={() => {
                        onSectionChange(item.value);
                        setMobileOpen(false);
                      }}
                      className={`w-full flex items-center gap-4 px-4 py-3.5 text-xs font-semibold rounded-medium transition-all group cursor-pointer ${
                        isActive 
                        ? 'bg-foreground text-background' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                      }`}
                    >
                      <div className={isActive ? 'text-accent' : 'text-muted-foreground/80'}>
                        {item.icon}
                      </div>
                      <span className="truncate uppercase tracking-wider text-[10px]">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-border/50 bg-muted/20 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center font-serif text-accent font-bold">
              {guestName.charAt(0)}
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">{guestName}</h4>
              <p className="text-[8px] uppercase tracking-widest text-accent font-bold flex items-center gap-1">
                <Sparkles size={8} /> {guestTier}
              </p>
            </div>
          </div>
          <button 
            onClick={() => {
              onExit();
              setMobileOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-3.5 border border-border/80 rounded-medium bg-white text-muted-foreground hover:text-foreground text-[10px] uppercase tracking-widest font-bold shadow-subtle hover:bg-muted/10 transition-all cursor-pointer"
          >
            <LogOut size={12} /> Exit Workspace
          </button>
        </div>
      </motion.aside>

      {/* Dimmed Overlay when mobile drawer is open */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-background/50 backdrop-blur-sm z-40 transition-all duration-500" 
        />
      )}
    </>
  );
}
