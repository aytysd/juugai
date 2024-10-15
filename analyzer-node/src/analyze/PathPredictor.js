"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const PointPredictor_js_1 = __importDefault(require("./PointPredictor.js"));
const Node_js_1 = __importDefault(require("./Node.js"));
// const Node = require('./Node.js');
// import { Node1, Node2, Node3, Node4 } from './Node.js';
class PathPredictor {
    constructor(jsonData, timeToleranceRange) {
        this.jsonData = jsonData;
        this.TTR = timeToleranceRange;
    }
    exec1(selectedData) {
        let jsonData = [];
        // console.log(`filtering time: ${t.format('HH-mm-ss')}`);
        let evalFuncs = [];
        for (let i = 0; i < selectedData.length; i++) {
            let d = selectedData[i];
            let node = Node_js_1.default[d["node"]];
            let distance = d["distance"];
            let cordinalDirection = d["cordinal direction"];
            evalFuncs.push(node.createEvalFunc(distance, cordinalDirection));
        }
        const evalFunc = function (vec) {
            return evalFuncs.reduce((result, func) => {
                return result + func(vec);
            }, 0);
        };
        let highestScore = 0;
        let highestVec = new (-70, -70);
        //       let tempVec = new Vector(-70, -30);
        //       let totalScore = 0;
        // 
        //       for(const func of evalFuncs) {
        //         const score = func(tempVec);
        //         totalScore += score;
        //         console.log(`score: ${score}`);
        // 
        //       } 
        for (let row = -70; row <= 70; row++) {
            for (let col = -70; col <= 70; col++) {
                let vec = new Vector(row, col);
                const score = evalFunc(vec);
                if (score >= highestScore) {
                    highestScore = score;
                    highestVec = vec;
                }
            }
        }
        jsonData.push({
            "timestamp": t.format('HH-mm-ss'),
            "x": highestVec.getX(),
            "y": highestVec.getY()
        });
        return jsonData;
    }
    execute() {
        const startTime = this.jsonData.getFirstTimestamp();
        const endTime = this.jsonData.getLastTimestamp();
        console.log(`startTime: ${startTime}`);
        console.log(`endTime: ${endTime}`);
        // const startTime = this.jsonData[0]["timestamp"];
        // let time = moment(startTime, "HH-mm-ss");
        //
        let jsonData = [];
        for (let t = startTime; t.isBefore(endTime); t.add(1, 'seconds')) {
            let selectedData = this.jsonData.filter((data) => {
                const dataTime = (0, moment_1.default)(data["timestamp"], "HH-mm-ss-SSSS");
                const diff = Math.abs(t.diff(dataTime));
                // console.log(`t: ${t}`);
                // console.log(`dataTime: ${dataTime}`);
                // console.log(`diff: ${diff}`);
                if (diff <= this.TTR)
                    return true;
                else
                    return false;
            });
            let predictedPoint = (0, PointPredictor_js_1.default)(selectedData);
            jsonData.push({
                "timestamp": t.format('HH-mm-ss'),
                "x": predictedPoint.x,
                "y": predictedPoint.y
            });
        }
        return jsonData;
    }
}
exports.default = PathPredictor;
