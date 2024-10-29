import { SensorData, SensorDataRow } from '@/types/SensorData.js';
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


function getCombinations<T>(array: T[], size: number): T[][] {
  if (size > array.length) return [];
  if (size === 1) return array.map(elem => [elem]);

  return array.reduce((acc, current, index) => {
    const smallerCombinations = getCombinations(array.slice(index + 1), size - 1);
    const combinationsWithCurrent = smallerCombinations.map(smallerComb => [current, ...smallerComb]);
    return [...acc, ...combinationsWithCurrent];
  }, [] as T[][]);
}


export default function PredictPoint(data: SensorData) : PredictPointResult {
  if(data.length <= 2) {
    console.log("data is not enough....");
    console.log(`data.length: ${data.length}`);
    return {
      type: PredictPointResultType.DATA_NOT_ENOUGH,
      result: undefined
    };
  }

  const combination = getCombinations<SensorDataRow>(data, 3);
  let likelihoods = [];
  // let thirdNode: Node | undefined = undefined;

  for(let i = 0; i < combination.length; i++) {
    const targetData = combination[i];
    for(let k = 0; k < 3; k++) {
      let circles : Circle[] = [];
      let evalElement = undefined;

      for (let j = 0; j < 3; j++) {
        const element = targetData[j];
        if(j === k) {
          evalElement = element!;
        } else {
          const node = element["node"]!;
          const distance = element["distance"];
          const circle: Circle = { center: node.pos, radius: distance };
          circles.push(circle);
        }


      }

      const intersecs = findIntersections(circles[0], circles[1]);
      if (intersecs.type == FindIntersectionsResultType.FOUND) {

        const d1 = getDistance(intersecs.results![0], evalElement!.node!.pos);
        const d2 = getDistance(intersecs.results![1], evalElement!.node!.pos);

        const likelihood1 = Math.abs(d1 - evalElement!.distance);
        const likelihood2 = Math.abs(d2 - evalElement!.distance);

        likelihoods.push({
          p: likelihood1 < likelihood2 ? intersecs.results![0] : intersecs.results![1],
          l: likelihood1 < likelihood2 ? likelihood1 : likelihood2,
        })
      }


    }
  }

  const mostLikely = likelihoods.reduce((min, current) => {
    return (current.l < min.l) ? current : min
  }, likelihoods[0]);


  return {
    type: PredictPointResultType.SUCCESS,
    result: mostLikely.p
  }
  
}

