import moment from 'moment';
import PredictPoint, { PredictPointResultType } from './PredictPoint.js';
export default function PredictPath(sensorData, ttr) {
    const startTime = moment(sensorData[0]["timestamp"], "HH-mm-ss").clone();
    const endTime = moment(sensorData[sensorData.length - 1]["timestamp"], "HH-mm-ss").clone();
    let predictedPath = [];
    for (let t = startTime; t.isBefore(endTime); t.add(1, 'seconds')) {
        const selectedSensorData = sensorData.filter((data) => {
            const dataTime = moment(data["timestamp"], "HH-mm-ss");
            if (t.isSame(dataTime)) {
                return true;
            }
            else {
                return false;
            }
        });
        let predictedPoint = PredictPoint(selectedSensorData);
        // console.log(predictedPoint.type);
        // console.log(predictedPoint.type == PredictPointResultType.SUCCESS);
        if (predictedPoint.type == PredictPointResultType.SUCCESS) {
            predictedPath.push({
                timestamp: t.format("HH-mm-ss"),
                x: predictedPoint.result.x,
                y: predictedPoint.result.y
            });
        }
    }
    return predictedPath;
}
//# sourceMappingURL=PredictPath.js.map