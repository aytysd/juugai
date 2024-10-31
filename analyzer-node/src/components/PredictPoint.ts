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

type Vector = [number, number];
type Matrix = [Vector, Vector];

// データ型の定義
interface DataPoint {
    ci1: number;
    ci2: number;
    mu: number;
    sigma: number;
}

let lastPredictedPoint: Vector = [0, 0];

export default function PredictPoint(data: SensorData) : PredictPointResult {

  if(data.length <= 2) {
    return {
      type: PredictPointResultType.FAILED,
      result: undefined
    };
  }

  // 数値微分による偏導関数
  const partialDerivativeX = (f: (x: number, y: number) => number, x: number, y: number, h: number = 1e-5): number => {
    const result = (f(x + h, y) - f(x - h, y)) / (2 * h);
    return result;
  }

  const partialDerivativeY = (f: (x: number, y: number) => number, x: number, y: number, h: number = 1e-5): number => {
    const result = (f(x, y + h) - f(x, y - h)) / (2 * h);
    return result;
  }

  // ヤコビアン行列の計算
  const jacobian = (alpha: number, beta: number): Matrix => {
    return [
      [
        partialDerivativeX(g1, alpha, beta),
        partialDerivativeY(g1, alpha, beta)
      ],
      [
        partialDerivativeX(g2, alpha, beta),
        partialDerivativeY(g2, alpha, beta)
      ]
    ];
  }

  // 2x2行列の逆行列計算
  const inverseMatrix = (m: Matrix): Matrix => {
    const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
    return [
      [m[1][1] / det, -m[0][1] / det],
      [-m[1][0] / det, m[0][0] / det]
    ];
  }

  // ベクトルの減算
  const subtractVectors = (v1: Vector, v2: Vector): Vector => {
    return [v1[0] - v2[0], v1[1] - v2[1]];
  }

  // 行列とベクトルの乗算
  const multiplyMatrixVector = (m: Matrix, v: Vector): Vector => {
    return [
      (m[0][0] * v[0] + m[0][1] * v[1]),
      (m[1][0] * v[0] + m[1][1] * v[1])
    ];
  }

  let options = [];

  for (const item of data) {
    const option = {
      ci1: item.x,
      ci2: item.y,
      mu: item.distance,
      sigma: 0.7
    };

    options.push(option);
  }


  const g1 = (alpha: number, beta: number): number => {
    // Σ((α - ci1)(log√((α - ci1)^2 + (β - ci2)^2) - μi) / σi^2)
    const result = options.reduce((sum, point) => {
      const { ci1, ci2, mu, sigma } = point;
      const distance = Math.sqrt((alpha - ci1) ** 2 + (beta - ci2) ** 2);
      const result = (-1) * ((distance - mu) * (alpha - ci1)) / (distance * (sigma ** 2));
      return sum + result
    }, 0);

    return result;
  }

  const g2 = (alpha: number, beta: number): number => {
    const result = options.reduce((sum, point) => {
      const { ci1, ci2, mu, sigma } = point;
      const distance = Math.sqrt((alpha - ci1) ** 2 + (beta - ci2) ** 2);
      const result = (-1) * ((distance - mu) * (beta - ci2)) / (distance * (sigma ** 2));
      return sum + result
    }, 0);

    return result;
  }

  // ニュートン法の実装
  const newtonMethod = (initialAlpha: number, initialBeta: number, maxIterations: number = 500, tolerance: number = 1e-6): Vector => {
    let x: Vector = [initialAlpha, initialBeta];

    console.log(`initial g1: ${g1(initialAlpha, initialBeta)}`);
    console.log(`initial g2: ${g2(initialAlpha, initialBeta)}`);


    for (let i = 0; i < maxIterations; i++) {
      const [alpha, beta] = x;
      const gx: Vector = [g1(alpha, beta), g2(alpha, beta)];
      const J = jacobian(alpha, beta);
      const Jinv = inverseMatrix(J);
      const delta = multiplyMatrixVector(Jinv, gx);
      x = subtractVectors(x, delta);


      // if (Math.abs(delta[0]) < tolerance && Math.abs(delta[1]) < tolerance) {
      //   console.log(`Converged after ${i + 1} iterations`);
      //   return x;
      // }
    }

    console.log(`g1: ${g1(x[0], x[1])}`);
    console.log(`g2: ${g2(x[0], x[1])}`);

    // console.log(x);

    console.log(`Did not converge after ${maxIterations} iterations`);
    return x;

  }

  const result = newtonMethod(
    lastPredictedPoint[0],
    lastPredictedPoint[1],
  );

  if(result[0] && result[1]) {
    lastPredictedPoint = result;
  } else {
    lastPredictedPoint = [0, 0];
  }

  const p: Point = {x: result[0], y: result[1]};
  
  return {
    type: PredictPointResultType.SUCCESS,
    result: p
  };

}

