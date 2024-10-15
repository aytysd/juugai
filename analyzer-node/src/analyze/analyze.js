"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyze = analyze;
const sensorData_js_1 = __importDefault(require("./sensorData.js"));
const PathPredictor_js_1 = __importDefault(require("./PathPredictor.js"));
// const fs = require('fs');
const fs_1 = __importDefault(require("fs"));
function analyze(fp) {
    console.log(`fp: ${fp}`);
    // console.log(process.argv[2]);
    // let filePath = process.argv[2];
    let filePath = fp;
    let output_file_path = '/app/src/output/test.json';
    const sensorData = new sensorData_js_1.default(filePath);
    //   let data = sensorData.selectData(function(row) {
    //       if(row["timestamp"] == '16-31-57') {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //   });
    let pathPredictor = new PathPredictor_js_1.default(sensorData, 700);
    let jsonData = pathPredictor.execute();
    jsonData = JSON.stringify(jsonData, null, 2);
    // ファイルに書き込む
    fs_1.default.writeFile('/app/src/output/test.json', jsonData, (err) => {
        if (err) {
            console.error('エラーが発生しました:', err);
            return;
        }
        console.log('JSONファイルが正常に作成されました');
    });
    return '/app/src/output/test.json';
}
// analyze('/app/src/database/2024-10-02-16-31-56.json');
// if (require.main === module) {
//   analyze('/app/src/database/2024-10-02-16-31-56.json');
// }
