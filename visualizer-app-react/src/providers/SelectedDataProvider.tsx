import React, { createContext, useState, useContext } from "react";

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
    isLoading: Boolean;
    error: string | null;
    update: (selectedDateTime: string) => void;
}

const SelectedDataContext = createContext<SelectedDataContextType | undefined>(undefined);

export const SelectedDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [path, setPath] = useState<Path>([]);
    const [sensorData, setSensorData] = useState<SensorData>([]);
    const [predictedPath, setPredictedPath] = useState<Path>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const update = async (selectedDateTime: string) => {
        setIsLoading(true);
        setError(null);
        try {
            // const response = await axios.get<string[]>('/api/files');
            const response = await fetch('/file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ datetime: selectedDateTime })
            });
            const { path, sensorData, predictedPath } = await response.json();
            console.log(path);
            console.log(predictedPath);
            console.log(sensorData);

            setPath(path);
            setSensorData(sensorData);
            setPredictedPath(predictedPath);
        } catch (err) {
            setError('ファイルリストの取得に失敗しました');
            console.error('Error fetching file list:', err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SelectedDataContext.Provider value={{ path, sensorData, predictedPath, update, isLoading, error }}>
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