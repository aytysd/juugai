import React from "react";

import { useDisplayDataContext } from "@/providers/SelectedDataProvider";
import { useSelectedTimingContext } from "@/providers/SelectedTimingProvider";
import { PathRow } from "@/types/path";

import './TimeUI.css';

interface TimeSelectorProps {
  children?: React.ReactNode;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({children}) => {
    const { path } = useDisplayDataContext();
    const { selectedTiming, update } = useSelectedTimingContext();

    return (
        <div className="fixed-container">
            {path.map((data: PathRow, index: number) => {
                return (
                    <li 
                    className="button" 
                    key={index}
                    onClick={() => update(data.timestamp)} 
                    >
                        {data.timestamp}
                    </li>
                );
            })}
            <li
                className="button" 
                onClick={() => update()}
            >
                None
            </li>
        </div>
    );
}


export default TimeSelector;