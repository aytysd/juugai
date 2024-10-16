"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PredictPath;
const moment_1 = __importDefault(require("moment"));
const PredictPoint_js_1 = __importStar(require("./PredictPoint.js"));
function PredictPath(sensorData, ttr) {
    const startTime = sensorData[0]["timestamp"];
    const endTime = sensorData[sensorData.length - 1]["timestamp"];
    let predictedPath = [];
    for (let t = startTime; t.isBefore(endTime); t.add(1, 'seconds')) {
        console.log(t.format('HH-mm-ss'));
        const selectedSensorData = sensorData.filter((data) => {
            const dataTime = (0, moment_1.default)(data["timestamp"], "HH-mm-ss-SSSS");
            const diff = Math.abs(t.diff(dataTime));
            if (diff <= ttr)
                return true;
            else
                return false;
        });
        let predictedPoint = (0, PredictPoint_js_1.default)(selectedSensorData);
        if (predictedPoint.type == PredictPoint_js_1.PredictPointResultType.SUCCESS) {
            predictedPath.push({
                timestamp: t,
                p: predictedPoint.result
            });
        }
    }
    return sensorData;
}
//# sourceMappingURL=PredictPath.js.map