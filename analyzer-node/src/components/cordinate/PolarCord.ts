import { Point } from './OrthCord';

export type PolarCord = {
    r: number;
    theta: number;
};

export function convertPolar2Orth(p: PolarCord) : Point {
    const x = p.r * Math.cos(p.theta);
    const y = p.r * Math.sin(p.theta);


    return { x, y };
}

