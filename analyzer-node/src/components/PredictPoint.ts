import { SensorData } from '@/types/SensorData.js';
import { FindIntersectionsResultType, Circle, findIntersections } from './Circle.js';
import { Point, getDistance } from './cordinate/OrthCord.js';
import nodes from './Node.js';


export enum PredictPointResultType {
  DATA_NOT_ENOUGH,
  SUCCESS,
  FAILED
};

export interface PredictPointResult {
  type: PredictPointResultType;
  result: Point | undefined;
};



export default function PredictPoint(data: SensorData) : PredictPointResult {
  if(data.length <= 2) {
    console.log("data is not enough....");
    console.log(`data.length: ${data.length}`);
    return {
      type: PredictPointResultType.DATA_NOT_ENOUGH,
      result: undefined
    };
  }

  let circles : Circle[] = [];
  // let thirdNode: Node | undefined = undefined;

  for(let i = 0; i < 3; i++) {
    const element = data[i];
    const node = element["node"]!;
    const distance = element["distance"];
    
    let circle: Circle = { center: node.pos, radius: distance };
    circles.push(circle);

    var thirdNode = node;

  }

  let intersecs = findIntersections(circles[0], circles[1]);

  if(intersecs.type == FindIntersectionsResultType.FOUND) {

    const d1 = getDistance(intersecs.results![0], thirdNode!.pos);
    const d2 = getDistance(intersecs.results![1], thirdNode!.pos);

    console.log('intersecs[0].x:', intersecs.results![0].x);
    console.log('intersecs[1].x:', intersecs.results![1].x);

    return d1 < d2 ? {
        type: PredictPointResultType.SUCCESS,
        result: intersecs.results![0]
      } : {
        type: PredictPointResultType.SUCCESS,
        result: intersecs.results![0]
      };

  } else {
    return {
      type: PredictPointResultType.FAILED,
      result: undefined
    };
  }
  
}

