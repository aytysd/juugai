import React, { createContext, useState, useEffect, useContext } from "react";

import { Path } from "../pages/AnalyzerNode/(Path)/AnimalPathComponent";
import { SensorData } from "../pages/AnalyzerNode/(SensorNode)/SensorNodesComponent";

// const pathDataContext = require.context('@/src/database/PathData');
import rawPath from '@/database/PathData/2024-10-22-13-49-57-traj.json';
import rawSensorData from '@/database/SensorData/2024-10-22-13-49-57.json';
import rawPredictedPath from '@/database/PredictedPathData/2024-10-22-13-49-57-out.json';


interface SelectedDataContextType {
    path: Path;
    sensorData: SensorData;
    predictedPath: Path; 
    update: (selectedDateTime: string) => void;
}

const SelectedDataContext = createContext<SelectedDataContextType | undefined>(undefined);

export const SelectedDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [path, setPath] = useState<Path>([]);
    const [sensorData, setSensorData] = useState<SensorData>([]);
    const [predictedPath, setPredictedPath] = useState<Path>([]);
    
    const update = async (selectedDateTime: string) => {
        // const pathDataPath = `@/src/database/PathData/${selectedDateTime}-traj.json`;
        // const pathDataPath = `../database/PathData/2024-10-22-13-49-04-traj.json`;
        // const pathDataPath = '@/src/database/temp.json'
        // const pathDataPath = '@/src/database/temp.json';
        // const sensorDataPath = `@/src/database/SensorData/${selectedDateTime}.json`;

        // const temp1 = await import('@/src/database/temp.json');
        const path = rawPath;
        // const temp2 = await import(sensorDataPath);
        const sensorData = rawSensorData;
        const predictedPath = rawPredictedPath;

        console.log('hello');

        setPath(path);
        setSensorData(sensorData);
        setPredictedPath(predictedPath);
    }

    return (
        <SelectedDataContext.Provider value={{ path, sensorData, predictedPath, update }}>
            {children}
        </SelectedDataContext.Provider>
    );
}

export const useSelectedDataContext = () => {
  const context = useContext(SelectedDataContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;

}