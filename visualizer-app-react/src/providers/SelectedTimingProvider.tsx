import React, { useContext, createContext, useState } from "react";

// interface TimeListContext

interface SelectedTimingProviderProps {
    children: React.ReactNode;
}

interface SelectedTimingContextType {
    selectedTiming: string;
    update: (timing: string) => void;
};

const SelectedTimingContext = createContext<SelectedTimingContextType | undefined>(undefined);

export const SelectedTimingProvider: React.FC<SelectedTimingProviderProps> = ({ children }) => {
    const [selectedTiming, setSelectedTiming] = useState('');

    const update = (timing: string) => {
        setSelectedTiming(timing);
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
