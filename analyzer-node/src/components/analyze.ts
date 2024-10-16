import extractFileData from './fileIO.js';
import PredictPath from './PredictPath.js';

// const fs = require('fs');
import * as fs from 'fs';

export default function main(fp: string) {

  console.log(`fp: ${fp}`);

  let outputFilePath = '/app/src/output/test.json';


  const sensorData = extractFileData(fp);

  if(sensorData != undefined) {
    let jsonData = PredictPath(sensorData, 0.3);
  } else {
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

  return '/app/src/output/test.json'


};

main('../src/database/2024-10-02-16-31-56.json');
