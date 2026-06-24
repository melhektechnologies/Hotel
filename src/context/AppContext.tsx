'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppState = {
  isBookingOpen: boolean;
  userIntent: string | null;
  lastVisitedRoom: string | null;
  hasSeenPreloader: boolean;
};

type AppContextType = {
  state: AppState;
  setBookingOpen: (open: boolean) => void;
  setUserIntent: (intent: string | null) => void;
  setLastVisitedRoom: (roomId: string | null) => void;
  setHasSeenPreloader: (seen: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    isBookingOpen: false,
    userIntent: null,
    lastVisitedRoom: null,
    hasSeenPreloader: false,
  });

  const setBookingOpen = (open: boolean) => setState(s => ({ ...s, isBookingOpen: open }));
  const setUserIntent = (intent: string | null) => setState(s => ({ ...s, userIntent: intent }));
  const setLastVisitedRoom = (roomId: string | null) => setState(s => ({ ...s, lastVisitedRoom: roomId }));
  const setHasSeenPreloader = (seen: boolean) => setState(s => ({ ...s, hasSeenPreloader: seen }));

  return (
    <AppContext.Provider value={{ state, setBookingOpen, setUserIntent, setLastVisitedRoom, setHasSeenPreloader }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
