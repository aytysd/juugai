import * as path from 'path';

import extractFileData from './fileIO.js';
import PredictPath from './PredictPath.js';

import * as fs from 'fs';

export default function main(fp: string) {

  console.log(`fp: ${fp}`);

  const filename = path.basename(fp);
  const nameWithoutExt = path.parse(filename).name;

  const outputFilePath = `/app/database/PredictedPathData/${nameWithoutExt}-out.json`;


  const sensorData = extractFileData(fp);

  if(sensorData != undefined) {
    var jsonData = PredictPath(sensorData, 0.3);
  } else {
    return;
  }


  const outData = JSON.stringify(jsonData, null, 2);

  fs.writeFile(outputFilePath, outData, (err) => {
    if (err) {
      console.error('エラーが発生しました:', err);
      return;
    }
    console.log('JSONファイルが正常に作成されました');
  });

  return outputFilePath;


};

// main('./database/SensorData/2024-10-22-13-49-57.json');
