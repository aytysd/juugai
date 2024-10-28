"use client";

import React, { useContext, createContext, useState } from "react";

// interface TimeListContext

interface SelectedTimingProviderProps {
    children: React.ReactNode;
}

interface SelectedTimingContextType {
    selectedTiming: string | undefined;
    update: (timing: string) => void;
};

const SelectedTimingContext = createContext<SelectedTimingContextType | undefined>(undefined);

export const SelectedTimingProvider: React.FC<SelectedTimingProviderProps> = ({ children }) => {
    const [selectedTiming, setSelectedTiming] = useState<string | undefined>('');

    const update = (timing?: string) => {
        if(timing) {
            setSelectedTiming(timing);
        } else {
            setSelectedTiming(undefined);
        }
    }


    return (
        <SelectedTimingContext.Provider value={{ selectedTiming, update }}>
            {children}
        </SelectedTimingContext.Provider>
    );
}


export const useSelectedTimingContext = () => {
  const context = useContext(SelectedTimingContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;

}
