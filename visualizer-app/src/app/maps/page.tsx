"use client";

import BaseGraphComponent from "./(BaseGraph)/BaseGraphComponent";
import MapComponent from "./Map";
import SensorNodesComponent from './(SensorNode)/SensorNodesComponent';
import AnimalPathComponent from './(Path)/AnimalPathComponent';
import DateTimeSelector from './(DateTime)/DateTimeUI';
import TimeSelector from './(Time)/TimeUI';

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
        </>
    )
}