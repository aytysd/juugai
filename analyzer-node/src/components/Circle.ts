import { off } from 'process';
import { Point, Points } from './cordinate/OrthCord.js';


export interface Circle {
  center: Point;
  radius: number
};

export enum FindIntersectionsResultType {
  FOUND,
  NO_INTERSECS,
  INSIDE,
  OVERLAPPING,
};

export interface FindIntersectionsResult {
  type: FindIntersectionsResultType; 
  results: Points | undefined;
};

export function findIntersections(circle1: Circle, circle2: Circle) : FindIntersectionsResult {
  const dx = circle2.center.x - circle1.center.x;
  const dy = circle2.center.y - circle1.center.y;
  const d = Math.sqrt(dx * dx + dy * dy);

  // console.log(`d: ${d}`);

  // 円が重なっていない場合
  if (d > circle1.radius + circle2.radius) {
    return {
      type: FindIntersectionsResultType.NO_INTERSECS,
      results: undefined
    };
  }
  // 一方の円がもう一方の円の内部にある場合
  if (d < Math.abs(circle1.radius - circle2.radius)) {
    return {
      type: FindIntersectionsResultType.INSIDE,
      results: undefined
    };
  }
  // 円が完全に一致している場合
  if (d === 0 && circle1.radius === circle2.radius) {
    return {
      type: FindIntersectionsResultType.OVERLAPPING,
      results: undefined
    };
    
  }

  const a = (circle1.radius * circle1.radius - circle2.radius * circle2.radius + d * d) / (2 * d);
  const h = Math.sqrt(circle1.radius * circle1.radius - a * a);

  const pointX = circle1.center.x + (dx * a) / d;
  const pointY = circle1.center.y + (dy * a) / d;

  const offsetX = -dy * (h / d);
  const offsetY = dx * (h / d);

  const x1 = pointX + offsetX;
  const y1 = pointY + offsetY;
  const x2 = pointX - offsetX;
  const y2 = pointY - offsetY;

  // console.log(`x1: ${x1}, y1: ${y1}`);
  // console.log(`x2: ${x2}, y2: ${y2}`);

  // return [
  //   new Point(pointX + offsetX, pointY + offsetY),
  //   new Point(pointX - offsetX, pointY - offsetY)
  // ];

  return {
    type: FindIntersectionsResultType.FOUND,
    results: [
      { x: pointX + offsetX, y: pointY + offsetY },
      { x: pointX - offsetX, y: pointY - offsetY }
    ]
  };
}
