import React from "react";

import { useSelectedDataContext } from "@/src/providers/SelectedDataProvider";
import { useSelectedTimingContext } from "@/src/providers/SelectedTimingProvider";
import { PathRow } from '../(Path)/AnimalPathComponent';

interface TimeSelectorProps {
  children?: React.ReactNode;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({children}) => {
    const { path } = useSelectedDataContext();
    const { selectedTiming, update } = useSelectedTimingContext();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            {path.map((data: PathRow, index: number) => {
                return (
                    <li 
                    key={index}
                    onClick={() => update(data.timestamp)} 
                    >
                        {data.timestamp}
                    </li>
                );
            })}
        </div>
    );
}


export default TimeSelector;