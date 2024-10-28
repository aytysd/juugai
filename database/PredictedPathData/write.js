const fs = require('fs');

const file = './2024-10-25-18-49-27-out.json';
// JSONファイルの読み込み
fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // JSONデータのパース
  const jsonData = JSON.parse(data);
  let updatedData = [];

  // 新しい座標を追加
  for (const item of jsonData) {
    updatedData.push({
      timestamp: item.timestamp, // 元のタイムスタンプを保持
      lat: item.y,
      long: item.x
    });
  }

  // 更新されたデータをファイルに書き込む
  fs.writeFile(file, JSON.stringify(updatedData, null, 2), err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('ファイルが更新されました');
  });
});