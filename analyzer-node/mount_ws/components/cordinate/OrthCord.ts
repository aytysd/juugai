import * as math from 'mathjs';

import { PolarCord } from './PolarCord';

export type Point = {
  x: number;
  y: number;
}

export type Points = Point[];

export function convertOrth2Polar(p: Point): PolarCord {
  const x = p.x;
  const y = p.y;
  const r = Math.sqrt(x * x + y * y);
  let theta = Math.atan2(y, x);

  while (theta < 0) {
    theta += 2 * Math.PI;
  }

  while (theta >= 2 * Math.PI) {
    theta -= 2 * Math.PI;
  }

  const polar = { r, theta };

  return polar;

}

export function sub(p1: Point, p2: Point) : Point{
  const result = {
    x: p1.x - p2.x, 
    y: p1.y - p2.y
  };

  return result;
}


export function getDistance(p1: Point, p2: Point) {
  const x1 = p1.x;
  const y1 = p1.y;

  const x2 = p2.x;
  const y2 = p2.y;

  const distance = Math.sqrt((x1 - x2)**2 + (y1 - y2)**2);

  return distance;

}
