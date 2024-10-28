
export interface PathRow {
    timestamp: string;
    x: number;
    y: number;
};

export type Path = PathRow[];


export interface PathGeoRow {
    timestamp: string;
    lon: number;
    lat: number;
};

export type PathGeo = PathGeoRow[];