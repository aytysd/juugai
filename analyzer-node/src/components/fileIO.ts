import * as fs from 'fs';
import moment from 'moment';

import type { SensorData, SensorDataRow } from '@/types/SensorData';
import nodes from './Node.js';

"use strict";

export default function extractFileData(fp: string) : SensorData | undefined {
  try {
    // JSONファイルを読み込み、パースして変数に格納
    const rawData = fs.readFileSync(fp, 'utf8');
    const jsonData = JSON.parse(rawData);

    var processedJsonData : SensorData = jsonData.map((value: any, index: number, array: any) => {
      const ts: moment.Moment = moment(value["timestamp"], "HH-mm-ss");
      const distance = value["distance"] as number;
      const x = value["x"] as number;
      const y = value["y"] as number;
      const cordinalDirectionInStr = value["cordinalDirection"] as string;
      const size = value["size"] as number;

      let newValue : SensorDataRow = {
        timestamp: ts,
        x: x,
        y: y,
        distance: distance,
        cordinalDirection: cordinalDirectionInStr,
        size: size
      };

      return newValue;
      
    });    

    // console.log(jsonData);
    return processedJsonData;
    // ここでjsonDataを使用できます
  } catch (error) {
    console.error('エラーが発生しました:', error);
    return undefined;
  }

}

