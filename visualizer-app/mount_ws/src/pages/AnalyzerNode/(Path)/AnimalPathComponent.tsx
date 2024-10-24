import React, { useContext } from 'react';

import { graphContext } from '../(BaseGraph)/BaseGraphComponent';
import { useSelectedDataContext } from '@/src/providers/SelectedDataProvider';
import { useSelectedTimingContext } from '@/src/providers/SelectedTimingProvider';

interface AnimalPathComponentProps {
    children?: React.ReactNode;
};

export interface PathRow {
    timestamp: string;
    x: number;
    y: number;
};

export type Path = PathRow[];

const AnimalPathComponent: React.FC<AnimalPathComponentProps> = ({children}) => {

    const pathStroke = "black";
    const pathStrokeWidth = "1";
    const predictedPathStroke = "blue";
    const predictedPathStrokeWidth = "1";

    const graph = useContext(graphContext);
    const { path, predictedPath } = useSelectedDataContext(); 

    return (
        <>
            {path ? 
                path.map((p: PathRow, index: number) => {
                if (index === path.length - 1) return null;

                const x1 = graph?.scaleX(p["x"]);
                const y1 = graph?.scaleY(p["y"]);

                const x2 = graph?.scaleX(path[index + 1]["x"]);
                const y2 = graph?.scaleY(path[index + 1]["y"]);

                return (
                    <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={pathStroke}
                        strokeWidth={pathStrokeWidth}
                    />
                );
            }) : null},
            {predictedPath ? 
                predictedPath.map((p: PathRow, index: number) => {
                if (index === predictedPath.length - 1) return null;

                const x1 = graph?.scaleX(p["x"]);
                const y1 = graph?.scaleY(p["y"]);

                const x2 = graph?.scaleX(predictedPath[index + 1]["x"]);
                const y2 = graph?.scaleY(predictedPath[index + 1]["y"]);

                return (
                    <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={predictedPathStroke}
                        strokeWidth={predictedPathStrokeWidth}
                    />
                );
            }) : null},
        
        </>
    );
} 



export default AnimalPathComponent;