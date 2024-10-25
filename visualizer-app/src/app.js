const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;




app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use(express.json());

app.use('/', express.static(__dirname + '/public', {  
  setHeaders: function (res, path) {
    if (path.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    }
  }})
);

app.get('/file_list', (req, res) => {
  fs.readdir('/app/database/SensorData', (err, files) => {
    if (err) {
      return console.error('Unable to scan directory: ' + err);
    }

    // JSONファイル名から日付部分を抽出
    const dateList = files
      .filter(file => file.endsWith('.json')) // JSONファイルのみフィルタリング
      .map(file => {
        const baseName = path.basename(file, '.json'); // 拡張子を取り除く
        return baseName; // 日付部分を返す
      });

    console.log(dateList); // 結果を表示
    res.json(dateList);
  });
});

app.post('/file', (req, res) => {
  console.log(req.body);
  const { datetime } = req.body;
  console.log('Received datetime: ', datetime);


  try {
    const filePath = '/app/database/SensorData/' + datetime + '.json';
    const jsonData = fs.readFileSync(filePath, 'utf8'); // ファイルを同期的に読み込む
    var sensorData = JSON.parse(jsonData); // JSON文字列をオブジェクトに変換
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }

  try {
    const filePath = '/app/database/PredictedPathData/' + datetime + '-out.json';
    const jsonData = fs.readFileSync(filePath, 'utf8'); // ファイルを同期的に読み込む
    var predictedPath = JSON.parse(jsonData); // JSON文字列をオブジェクトに変換
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }

  try {
    const filePath = '/app/database/PathData/' + datetime + '-traj.json';
    const jsonData = fs.readFileSync(filePath, 'utf8'); // ファイルを同期的に読み込む
    var path = JSON.parse(jsonData); // JSON文字列をオブジェクトに変換
  } catch (error) {
    console.error('Error reading JSON file:', error);
  }

  res.json({ sensorData, predictedPath, path });

})