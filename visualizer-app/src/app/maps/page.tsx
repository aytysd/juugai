"use client";

import BaseGraphComponent from "./(BaseGraph)/BaseGraphComponent";
import MapComponent from "./Map";
import SensorNodesComponent from './(SensorNode)/SensorNodesComponent';
import AnimalPathComponent from './(Path)/AnimalPathComponent';
import DateTimeSelector from './DateTimeUI';
import TimeSelector from './(Time)/TimeUI';
import PathAccuracyComponent from "./PathAccuracy";

export default function Home() {
    return (
        <>
            <MapComponent>
                {undefined}
            </MapComponent>
            <DateTimeSelector>
                <TimeSelector>
                </TimeSelector>
            </DateTimeSelector> 
            <PathAccuracyComponent/>    
        </>
    )
}