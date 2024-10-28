import React, { createContext, useState, useContext } from "react";

import { Path, PathGeo } from "@/types/path";
import { SensorData } from "@/types/sensorData";
import { GWGeo } from "@/constants";


interface DisplayDataContextType {
    path: Path;
    sensorData: SensorData;
    predictedPath: Path; 
    isLoading: Boolean;
    error: string | null;
    update: (selectedDateTime: string) => void;
    getPredictedPathGeo: () => PathGeo;
    getPathGeo: () => PathGeo;
    convertXY2LatLng: (
        distanceEast: number,
        distanceNorth: number
    ) => { lat: number, lon: number };

}

const DisplayDataContext = createContext<DisplayDataContextType | undefined>(undefined);

const EARTH_RADIUS = 6371000;

export const DisplayDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [path, setPath] = useState<Path>([]);
    const [sensorData, setSensorData] = useState<SensorData>([]);
    const [predictedPath, setPredictedPath] = useState<Path>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const toRadians = (degrees: number): number => {
        return degrees * (Math.PI / 180);
    }

    // ラジアンを度に変換
    const toDegrees = (radians: number): number => {
        return radians * (180 / Math.PI);
    }

    
    const update = async (selectedDateTime: string) => {
        setIsLoading(true);
        setError(null);
        try {
            // const response = await axios.get<string[]>('/api/files');
            const response = await fetch('api/file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ datetime: selectedDateTime })
            });
            const { path, sensorData, predictedPath } = await response.json();

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


    const convertXY2LatLng = (
        distanceEast: number,
        distanceNorth: number
    ): { lat: number; lon: number } => {
        return calcNewGeo(
            GWGeo.lat,
            GWGeo.lon,
            distanceEast,
            distanceNorth
        );
    }


    const calcNewGeo = (
        lat: number,
        lon: number,
        distanceEast: number,
        distanceNorth: number
    ): { lat: number; lon: number } => {
        // 緯度経度をラジアンに変換
        const latRad = toRadians(lat);
        const lonRad = toRadians(lon);

        // 角度を計算（距離 / 地球の半径）
        const dLat = distanceNorth / EARTH_RADIUS;
        const dLon = distanceEast / (EARTH_RADIUS * Math.cos(latRad));

        // 新しい緯度経度を計算
        const newLat = latRad + dLat;
        const newLon = lonRad + dLon;

        // ラジアンを度に戻す
        return {
            lat: toDegrees(newLat),
            lon: toDegrees(newLon)
        };
    }


    const getPathGeo = () => {
        let pathGeo: PathGeo = path.map((row, index) => {
            const newRow = {
                timestamp: row.timestamp,
                ...calcNewGeo(GWGeo.lat, GWGeo.lon, row.x, row.y)
            };

            return newRow;
        })

        return pathGeo;
    }

    const getPredictedPathGeo = () => {
        let predictedPathGeo: PathGeo = predictedPath.map((row, index) => {
            const newRow = {
                timestamp: row.timestamp,
                ...calcNewGeo(GWGeo.lat, GWGeo.lon, row.x, row.y)
            };

            return newRow;
        })

        return predictedPathGeo;
    }

    return (
        <DisplayDataContext.Provider value={{ path, sensorData, predictedPath, update, isLoading, error, getPathGeo, getPredictedPathGeo, convertXY2LatLng }}>
            {children}
        </DisplayDataContext.Provider>
    );
}

export const useDisplayDataContext = () => {
  const context = useContext(DisplayDataContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;

}