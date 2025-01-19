"use client"; // Required for stateful/client-side context

import React, { createContext, useContext, useState } from "react";

interface SelectedPageContextType {
  selectedPage: string;
  setSelectedPage: (page: string) => void;
}

const SelectedPageContext = createContext<SelectedPageContextType>({
  selectedPage: "home",
  setSelectedPage: () => {}
});

export function SelectedPageProvider({ children }: { children: React.ReactNode }) {
  const [selectedPage, setSelectedPage] = useState("home"); // Default view
  
  return (
    <SelectedPageContext.Provider value={{ selectedPage, setSelectedPage }}>
      {children}
    </SelectedPageContext.Provider>
  );
}

// Custom hook to consume context
export function useSelectedPage() {
  return useContext(SelectedPageContext);
}