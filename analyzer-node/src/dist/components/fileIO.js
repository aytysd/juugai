import * as fs from 'fs';
import moment from 'moment';
"use strict";
export default function extractFileData(fp) {
    try {
        // JSONファイルを読み込み、パースして変数に格納
        const rawData = fs.readFileSync(fp, 'utf8');
        const jsonData = JSON.parse(rawData);
        var processedJsonData = jsonData.map((value, index, array) => {
            const ts = moment(value["timestamp"], "HH-mm-ss");
            const distance = value["distance"];
            const x = value["x"];
            const y = value["y"];
            const cordinalDirectionInStr = value["cordinalDirection"];
            let newValue = {
                timestamp: ts,
                x: x,
                y: y,
                distance: distance,
                cordinalDirection: cordinalDirectionInStr
            };
            return newValue;
        });
        // console.log(jsonData);
        return processedJsonData;
        // ここでjsonDataを使用できます
    }
    catch (error) {
        console.error('エラーが発生しました:', error);
        return undefined;
    }
}
//# sourceMappingURL=fileIO.js.map