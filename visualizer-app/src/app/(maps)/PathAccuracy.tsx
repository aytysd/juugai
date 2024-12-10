import { useDisplayDataContext } from "@/providers/SelectedDataProvider";
import { Path } from "leaflet";
import React from "react";




export interface PathAccuracyComponentProps {

}

const PathAccuracyComponent: React.FC<PathAccuracyComponentProps> = ({}) => {
    const { path, predictedPath } = useDisplayDataContext();

    const calculateTotalDeviation = () => {
        let totalDeviation = 0;
        if (predictedPath) {
            for (const item of path) {
                const predictedItem = predictedPath.find(i => item.timestamp === i.timestamp);
                if (predictedItem) {
                    const deviation = Math.sqrt((predictedItem.x - item.x) ** 2 + (predictedItem.y - item.y) ** 2);
                    totalDeviation += deviation;
                }
            }

        }

        return totalDeviation;
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: '80%',
                left: '30%'
            }}
        >
            <h2>Total Deviation</h2>
            <p>TD: {calculateTotalDeviation().toFixed(2)}</p>
        </div>
    );
}

export default PathAccuracyComponent;