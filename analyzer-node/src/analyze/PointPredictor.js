import { Circle, findIntersections } from './Circle.js';
import { Point, getDistance } from './Point.js';
import nodes from './Node.js';

export default function PredictPoint(data) {
  if(data.length <= 2) {
    console.log("data is not enough....");
  }

  let circles = [];
  let thirdNode = null;

  for(let i = 0; i < 3; i++) {
    const element = data[i];
    const nodeStr = element["node"];
    const node = nodes[nodeStr]; 
    const distance = element["distance"];
    
    let circle = new Circle(node.pos, distance);
    circles.push(circle);

    thirdNode = node;

    // console.log(circle);

  }

  let intersecs = findIntersections(circles[0], circles[1]);

  if(intersecs.length != 0) {
    const d1 = getDistance(intersecs[0], thirdNode.pos);
    const d2 = getDistance(intersecs[1], thirdNode.pos);

    // console.log('intersecs[0]:', typeof intersecs[0]);
    // console.log('intersecs[1]:', typeof intersecs[1]);
    console.log('intersecs[0].x:', intersecs[0].x);
    console.log('intersecs[1].x:', intersecs[1].x);
    //
    // console.log(`d1: ${d1}`);
    // console.log(`d2: ${d2}`);
    //


    return d1 < d2 ? intersecs[0] : intersecs[1];
  } else {
    return new Point(0, 0);
  }
  
}

