import React, { useContext } from 'react';

import { graphContext  } from '../(BaseGraph)/BaseGraphComponent';

import { useSelectedDataContext } from '@/src/providers/SelectedDataProvider';
import { useSelectedTimingContext } from '@/src/providers/SelectedTimingProvider';

interface SensorNodesComponentProps {
    children?: React.ReactNode;
};

interface SensorNodeComponentProps {
    posX: number;
    posY: number;
    sensorData: SensorData;
};


export interface SensorDataRow {
    timestamp: string;
    node: string;
    distance: number;
    cordinalDirection: string;
};
export type SensorData = SensorDataRow[];

const SensorNodesComponent: React.FC<SensorNodesComponentProps> = ({children}) => {

    const { sensorData } = useSelectedDataContext();

    const node1Data = sensorData.filter((data: SensorDataRow, index: number) => {
        if(data.node == "node1") return true; 
        else return false;
    });

    const node2Data = sensorData.filter((data: SensorDataRow, index: number) => {
        if(data.node == "node2") return true; 
        else return false;
    });

    const node3Data = sensorData.filter((data: SensorDataRow, index: number) => {
        if(data.node == "node3") return true; 
        else return false;
    });

    const node4Data = sensorData.filter((data: SensorDataRow, index: number) => {
        if(data.node == "node4") return true; 
        else return false;
    });

    console.log(node1Data);

    return (
        <>
            <SensorNodeComponent posX={70} posY={70} sensorData={node1Data}/>
            <SensorNodeComponent posX={-70} posY={70} sensorData={node2Data}/>
            <SensorNodeComponent posX={-70} posY={-70} sensorData={node3Data}/>
            <SensorNodeComponent posX={70} posY={-70} sensorData={node4Data}/>
            {children}
        </>
    )
}


const SensorNodeComponent: React.FC<SensorNodeComponentProps> = ({posX, posY, sensorData}) => {
    const width: number = 10;
    const height: number = 10;
    const fill = "black";
    const stroke = "red";
    const strokeWidth = "1";

    const graph = useContext(graphContext);
    const { selectedTiming } = useSelectedTimingContext();

    return (
        <>
            <rect
                x={graph?.scaleX(posX)}
                y={graph?.scaleY(posY)}
                width={width}
                height={height}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
            {sensorData.map((data, index) => {
                // if(data.timestamp.includes("15-47-25")) {
                if(selectedTiming === data.timestamp){
                    return (<circle
                        key={index}
                        cx={graph?.scaleX(posX)}
                        cy={graph?.scaleY(posY)}
                        r={data.distance}
                        fill="none"
                        stroke="blue"
                        strokeWidth={strokeWidth}
                    />);
                } else {
                    return null;
                }

            }).filter(item => item !== null)
            }
        </>
    )
}


export default SensorNodesComponent;