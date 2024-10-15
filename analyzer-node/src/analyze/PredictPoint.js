"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
exports.default = PredictPoint;
const Circle_js_1 = require("./Circle.js");
const Point_js_1 = require("./Point.js");
const Node_js_1 = __importDefault(require("./Node.js"));
exports.Result = {
    FAILED: 'FAILED',
    SUCCESS: 'SUCCESS'
};
function PredictPoint(data) {
    if (data.length <= 2) {
        console.log("data is not enough....");
        console.log(`data.length: ${data.length}`);
    }
    let circles = [];
    let thirdNode = null;
    for (let i = 0; i < 3; i++) {
        const element = data[i];
        const nodeStr = element["node"];
        const node = Node_js_1.default[nodeStr];
        const distance = element["distance"];
        let circle = new Circle_js_1.Circle(node.pos, distance);
        circles.push(circle);
        thirdNode = node;
        // console.log(circle);
    }
    let intersecs = (0, Circle_js_1.findIntersections)(circles[0], circles[1]);
    if (intersecs.length != 0) {
        const d1 = (0, Point_js_1.getDistance)(intersecs[0], thirdNode.pos);
        const d2 = (0, Point_js_1.getDistance)(intersecs[1], thirdNode.pos);
        // console.log('intersecs[0]:', typeof intersecs[0]);
        // console.log('intersecs[1]:', typeof intersecs[1]);
        console.log('intersecs[0].x:', intersecs[0].x);
        console.log('intersecs[1].x:', intersecs[1].x);
        //
        // console.log(`d1: ${d1}`);
        // console.log(`d2: ${d2}`);
        //
        return d1 < d2 ? intersecs[0] : intersecs[1];
    }
    else {
        return new Point_js_1.Point(0, 0);
    }
}
