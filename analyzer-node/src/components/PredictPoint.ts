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

export default function PredictPoint(data: SensorData) : PredictPointResult {
  if(data.length <= 2) {
    console.log("data is not enough....");
    console.log(`data.length: ${data.length}`);
    return {
      type: PredictPointResultType.DATA_NOT_ENOUGH,
      result: undefined
    };
  }

  const g1 = (alpha: number, beta: number, data: { ci1: number; ci2: number; mu: number; sigma: number }[]): number => {
    const K = data.length;

    // 2Kα
    const term1 = 2 * K * alpha;

    // -2Σci1
    const term2 = -2 * data.reduce((sum, point) => sum + point.ci1, 0);

    // Σ((α - ci1)(log√((α - ci1)^2 + (β - ci2)^2) - μi) / σi^2)
    const term3 = data.reduce((sum, point) => {
      const { ci1, ci2, mu, sigma } = point;
      const distance = Math.sqrt((alpha - ci1) ** 2 + (beta - ci2) ** 2);
      const logTerm = Math.log(distance) - mu;
      return sum + ((alpha - ci1) * logTerm) / (sigma ** 2);
    }, 0);

    return term1 + term2 + term3;
  }



  const g2 = (alpha: number, beta: number, data: { ci1: number; ci2: number; mu: number; sigma: number }[]): number => {
    const K = data.length;

    // 2Kβ
    const term1 = 2 * K * beta;

    // -2Σci2
    const term2 = -2 * data.reduce((sum, point) => sum + point.ci2, 0);

    // Σ((β - ci2)(log√((α - ci1)^2 + (β - ci2)^2) - μi) / σi^2)
    const term3 = data.reduce((sum, point) => {
      const { ci1, ci2, mu, sigma } = point;
      const distance = Math.sqrt((alpha - ci1) ** 2 + (beta - ci2) ** 2);
      const logTerm = Math.log(distance) - mu;
      return sum + ((beta - ci2) * logTerm) / (sigma ** 2);
    }, 0);

    return term1 + term2 + term3;
  }

  const partialDerivative = (f: (x: number) => number, x: number, h: number = 1e-5): number => {
    return (f(x + h) - f(x)) / h;
  }

  // ヤコビアン行列の計算
  const jacobian = (alpha: number, beta: number, data: DataPoint[]): Matrix => {
    return [
      [
        partialDerivative(g1, alpha, beta, data),
        partialDerivative((a, b, d) => g1(b, a, d), beta, alpha, data)
      ],
      [
        partialDerivative(g2, alpha, beta, data),
        partialDerivative((a, b, d) => g2(b, a, d), beta, alpha, data)
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
      m[0][0] * v[0] + m[0][1] * v[1],
      m[1][0] * v[0] + m[1][1] * v[1]
    ];
  }

  // ニュートン法の実装
  function newtonMethod(initialAlpha: number, initialBeta: number, data: DataPoint[], maxIterations: number = 100, tolerance: number = 1e-6): Vector {
    let x: Vector = [initialAlpha, initialBeta];

    for (let i = 0; i < maxIterations; i++) {
      const [alpha, beta] = x;
      const gx: Vector = [g1(alpha, beta, data), g2(alpha, beta, data)];
      const J = jacobian(alpha, beta, data);
      const Jinv = inverseMatrix(J);
      const delta = multiplyMatrixVector(Jinv, gx);
      x = subtractVectors(x, delta);

      if (Math.abs(delta[0]) < tolerance && Math.abs(delta[1]) < tolerance) {
        console.log(`Converged after ${i + 1} iterations`);
        return x;
      }
    }

    console.log(`Did not converge after ${maxIterations} iterations`);
    return x;


    return {
      type: PredictPointResultType.SUCCESS,
      result: mostLikely.p
    }

  }

