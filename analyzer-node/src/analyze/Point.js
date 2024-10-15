import * as math from 'mathjs';

export class PolarCoordinate {
  constructor(r, theta) {
    this.r = r;
    while (theta < 0) {
      theta += 2 * Math.PI;
    }

    while (theta >= 2 * Math.PI) {
      theta -= 2 * Math.PI;
    }
    this.theta = theta;


  }

  //メソッドを追加できます
  toCartesian() {
    const x = this.r * Math.cos(this.theta);
    const y = this.r * Math.sin(this.theta);
    return { x, y };
  }
}


export class Point {
  constructor(...args) {
    if(args.length === 1) {
      this.x = args[0].x;
      this.y = args[0].y;
    } else if (args.length === 2) {
      this.x = args[0];
      this.y = args[1];
    }
  }

  getPolarCoordinate() {
    const x = this.x;
    const y = this.y;
    const r = Math.sqrt(x * x + y * y);
    let theta = Math.atan2(y, x);

    const polar = new PolarCoordinate(r, theta)

    return polar;

  }

  sub(p) {
    const result = new Point(this.x - p.x, this.y - p.y);
    return result;
  }

}

export function getDistance(p1, p2) {
  const x1 = p1.x;
  const y1 = p1.y;

  const x2 = p2.x;
  const y2 = p2.y;

  const distance = Math.sqrt((x1 - x2)**2 + (y1 - y2)**2);

  return distance;

}
