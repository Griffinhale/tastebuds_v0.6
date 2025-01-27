"use client";

import React, { createContext, useContext, useState } from "react";

interface AppUIContextType {
  selectedItem: string | null;
  setSelectedItem: (itemId: string | null) => void;
  isExpandedView: boolean;
  toggleExpandedView: () => void;
}

const AppUIContext = createContext<AppUIContextType>({
  selectedItem: null,
  setSelectedItem: () => {},
  isExpandedView: false,
  toggleExpandedView: () => {},
});

export function AppUIProvider({ children }: { children: React.ReactNode }) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isExpandedView, setIsExpandedView] = useState(false);

  function toggleExpandedView() {
    setIsExpandedView(prev => !prev);
  }

  return (
    <AppUIContext.Provider
      value={{
        selectedItem,
        setSelectedItem,
        isExpandedView,
        toggleExpandedView,
      }}
    >
      {children}
    </AppUIContext.Provider>
  );
}

// Custom hook to consume the context
export function useAppUI() {
  return useContext(AppUIContext);
}
