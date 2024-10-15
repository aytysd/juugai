import SensorData from './sensorData.js';
import PathPredictor from './PathPredictor.js';

// const fs = require('fs');
import fs from 'fs';

export function analyze(fp) {

  console.log(`fp: ${fp}`);

  // console.log(process.argv[2]);

  // let filePath = process.argv[2];
  let filePath = fp;
  let output_file_path = '/app/src/output/test.json';


  const sensorData = new SensorData(filePath);
//   let data = sensorData.selectData(function(row) {
//       if(row["timestamp"] == '16-31-57') {
//         return true;
//       } else {
//         return false;
//       }
//   });

  let pathPredictor = new PathPredictor(sensorData, 700);
  let jsonData = pathPredictor.execute();


  jsonData = JSON.stringify(jsonData, null, 2);

  // ファイルに書き込む
  fs.writeFile('/app/src/output/test.json', jsonData, (err) => {
    if (err) {
      console.error('エラーが発生しました:', err);
      return;
    }
    console.log('JSONファイルが正常に作成されました');
  });

  return '/app/src/output/test.json'


}

// analyze('/app/src/database/2024-10-02-16-31-56.json');


// if (require.main === module) {
//   analyze('/app/src/database/2024-10-02-16-31-56.json');
// }
