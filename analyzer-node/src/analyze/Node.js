"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const Point_js_1 = require("./Point.js");
// import { create ,all } from 'mathjs'
class Node {
    constructor(nodeName, posX, posY) {
        this.nodeName = nodeName;
        this.pos = new Point_js_1.Point(posX, posY);
    }
    integrate(f, start, end, step) {
        let total = 0;
        step = step || 0.01;
        for (let x = start; x < end; x += step) {
            total += f(x + step / 2) * step;
        }
        return total;
    }
    createEvalFunc(measuredDist, cordinalDirection) {
        let func = null;
        let range = null;
        switch (cordinalDirection) {
            case "North":
                range = (theta) => {
                    return (Math.PI / 4 <= theta && theta < 3 * Math.PI / 4);
                };
                break;
            case "East":
                range = (theta) => {
                    return ((7 * Math.PI / 4 <= theta && theta < 2 * Math.PI) ||
                        (0 <= theta && theta < Math.PI / 4));
                };
                break;
            case "West":
                range = (theta) => {
                    return (3 * Math.PI / 4 <= theta && theta < 5 * Math.PI / 4);
                };
                break;
            case "South":
                range = (theta) => {
                    return (5 * Math.PI / 4 <= theta && theta < 7 * Math.PI / 4);
                };
                break;
            default:
                break;
        }
        //     range = (theta) => {
        //       const result = (3*Math.PI/4 <= theta && theta < 5*Math.PI/4);
        //       console.log(`theta: ${theta}`);
        //       console.log(`result: ${result}`);
        //       return result;
        //     }
        return (vec) => {
            const vecFromNode = this.getVecFromNode(vec);
            let polar = vecFromNode.getPolarCoordinate();
            if (range(polar.theta)) {
                if (0 <= polar.r && polar.r < measuredDist)
                    return this.evalWithinD(vecFromNode, measuredDist);
                else
                    return this.evalBeyondD(vecFromNode, measuredDist);
            }
            else {
                return 0;
            }
        };
    }
    getVecFromNode(vec) {
        return vec.sub(this.pos.vec);
    }
    evalWithinD(vec, d) {
        let polar = vec.getPolarCoordinate();
        return Math.pow(polar.r / d, 3);
    }
    evalBeyondD(vec, d) {
        let polar = vec.getPolarCoordinate();
        return 1 / (1 + Math.pow(polar.r / d - 1, 2));
    }
    getAveragePoint() {
        const r = this.distance;
        let integrandX = null;
        let integrandY = null;
        switch (this.cordinalDirection) {
            case "North":
                integrandX = function (x) {
                    return r * Math.cos(Math.PI / 4 + Math.PI * x / 2);
                };
                integrandY = function (x) {
                    return r * Math.sin(Math.PI / 4 + Math.PI * x / 2);
                };
                break;
            case "East":
                integrandX = function (x) {
                    return r * Math.cos(7 * Math.PI / 4 + Math.PI * x / 2);
                };
                integrandY = function (x) {
                    return r * Math.sin(7 * Math.PI / 4 + Math.PI * x / 2);
                };
                break;
            case "West":
                integrandX = function (x) {
                    return r * Math.cos(3 * Math.PI / 4 + Math.PI * x / 2);
                };
                integrandY = function (x) {
                    return r * Math.sin(3 * Math.PI / 4 + Math.PI * x / 2);
                };
                break;
            case "South":
                integrandX = function (x) {
                    return r * Math.cos(5 * Math.PI / 4 + Math.PI * x / 2);
                };
                integrandY = function (x) {
                    return r * Math.sin(5 * Math.PI / 4 + Math.PI * x / 2);
                };
                break;
            default:
        }
        const aveX = this.integrate(integrandX, 0, 1) + this.posX;
        const aveY = this.integrate(integrandY, 0, 1) + this.posY;
        //     console.log(`node: ${this.nodeName}`);
        //     console.log(`cardinal direction: ${this.cordinalDirection}`);
        //     console.log(`distance: ${this.distance}`);
        //     console.log(`aveX: ${aveX}`);
        //     console.log(`aveY: ${aveY}`);
        return [aveX, aveY];
    }
}
exports.Node = Node;
const node1 = new Node("node1", 70, 70);
const node2 = new Node("node2", -70, 70);
const node3 = new Node("node3", -70, -70);
const node4 = new Node("node4", 70, -70);
const nodes = {
    "node1": node1,
    "node2": node2,
    "node3": node3,
    "node4": node4
};
exports.default = nodes;
