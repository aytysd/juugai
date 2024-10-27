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
      const node = nodes.get(value["node"] as string); 
      const cordinalDirectionInStr = value["cordinalDirection"] as string;

      let newValue : SensorDataRow = {
        timestamp: ts,
        node: node,
        distance: distance,
        cordinalDirection: cordinalDirectionInStr
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

