"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = main;
const fileIO_js_1 = __importDefault(require("./fileIO.js"));
const PredictPath_js_1 = __importDefault(require("./PredictPath.js"));
function main(fp) {
    console.log(`fp: ${fp}`);
    let outputFilePath = '/app/src/output/test.json';
    const sensorData = (0, fileIO_js_1.default)(fp);
    if (sensorData != undefined) {
        let jsonData = (0, PredictPath_js_1.default)(sensorData, 0.3);
    }
    else {
        return;
    }
    // jsonData = JSON.stringify(jsonData, null, 2);
    // ファイルに書き込む
    // fs.writeFile('/app/src/output/test.json', jsonData, (err) => {
    //   if (err) {
    //     console.error('エラーが発生しました:', err);
    //     return;
    //   }
    //   console.log('JSONファイルが正常に作成されました');
    // });
    return '/app/src/output/test.json';
}
;
main('../src/database/2024-10-02-16-31-56.json');
//# sourceMappingURL=analyze.js.map