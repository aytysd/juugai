
export interface SensorDataRow {
    timestamp: string;
    distance: number;
    y: number;
    x: number;
    cordinalDirection: string;
};
export type SensorData = SensorDataRow[];