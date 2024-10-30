const fs = require('fs');

const file = './2024-10-29-14-40-06.json';
// JSONファイルの読み込み
fs.readFile(file, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // JSONデータのパース
  const jsonData = JSON.parse(data);

  // 新しいデータを追加するためのマッピング
  const nodeCoordinates = {
    node1: { y: 70, x: 70 },
    node2: { y: 70, x: -70 },
    node3: { y: -70, x: 70 },
    node4: { y: -70, x: -70 }
  };

  // 処理
  const updatedData = jsonData.filter(item => {
    if (nodeCoordinates[item.node]) {
      // 対応する座標を持つノードの場合、削除
      return false;
    }
    return true; // その他のノードは保持
  });

  // 新しい座標を追加
  for (const item of jsonData) {
    if (nodeCoordinates[item.node]) {
      updatedData.push({
        timestamp: item.timestamp, // 元のタイムスタンプを保持
        distance: item.distance,
        y: nodeCoordinates[item.node].y,
        x: nodeCoordinates[item.node].x,
        cordinalDirection: item.cordinalDirection
      });
    }
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