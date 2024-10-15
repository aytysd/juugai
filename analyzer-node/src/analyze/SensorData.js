"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
"use strict";
class SensorData {
    constructor(filePath) {
        // console.log(`sensorData reading: ${filePath}`);
        this.filePath = filePath;
        this.extractFileData();
        // console.log(this.sensorData);
    }
    extractFileData() {
        try {
            // JSONファイルを読み込み、パースして変数に格納
            const rawData = fs_1.default.readFileSync(this.filePath, 'utf8');
            const jsonData = JSON.parse(rawData);
            // console.log(jsonData);
            this.sensorData = jsonData;
            // ここでjsonDataを使用できます
        }
        catch (error) {
            console.error('エラーが発生しました:', error);
        }
    }
    filter(func) {
        let data = [];
        // console.log("from here selected data");
        for (let i = 0; i < this.sensorData.length; i++) {
            if (func(this.sensorData[i])) {
                data.push(this.sensorData[i]);
                // console.log(this.sensorData[i]);
            }
        }
        return data;
    }
    getFirstTimestamp() {
        let firstRow = this.sensorData[0];
        // console.log(firstRow);
        return (0, moment_1.default)(firstRow["timestamp"], "HH-mm-ss-SSSS");
    }
    getLastTimestamp() {
        const dataLen = this.sensorData.length;
        let lastRow = this.sensorData[dataLen - 1];
        // console.log(lastRow);
        return (0, moment_1.default)(lastRow["timestamp"], "HH-mm-ss-SSSS");
    }
}
exports.default = SensorData;
// module.exports = SensorData;
