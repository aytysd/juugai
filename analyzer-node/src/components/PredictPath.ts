import { Point } from './cordinate/OrthCord.js';
import { PolarCord } from './cordinate/PolarCord.js';
import moment from 'moment';
import PredictPoint, { PredictPointResultType } from './PredictPoint.js';
import nodes from './Node.js';

import { SensorData } from '@/types/SensorData';
import { PathData } from '@/types/PathData';


export default function PredictPath(sensorData: SensorData, ttr: number) {
  const startTime = sensorData[0]["timestamp"];
  const endTime = sensorData[sensorData.length - 1]["timestamp"];

  let predictedPath: PathData = [];

  for (let t = startTime; t.isBefore(endTime); t.add(1, 'seconds')) {
    console.log(t.format('HH-mm-ss'))

    const selectedSensorData = sensorData.filter(
      (data) => {
        const dataTime = moment(data["timestamp"], "HH-mm-ss-SSSS");
        const diff = Math.abs(t.diff(dataTime));

        if (diff <= ttr) return true;
        else return false;
      }
    );


    let predictedPoint = PredictPoint(selectedSensorData);

    if (predictedPoint.type == PredictPointResultType.SUCCESS) {
      predictedPath.push({
        timestamp: t,
        p: predictedPoint.result!
      });

    }
  }

  return sensorData;
}



