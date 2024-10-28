// Expressフレームワーク
var express = require('express');
var app = express();

// HTTPSサーバー起動
var fs = require('fs');
var https = require('https');
var options = {
  key:  fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};
var server = https.createServer(options,app);

// ルート設定
app.get('/rest', function (req, res) {
    res.writeHead(200);
    res.end("Hello World.");
});

app.get('/maps', (req, res) => {
    res.sendFile(__dirname + '/public/maps.html');
});
app.use('/', express.static(__dirname + '/public'));
// イベント待機
server.listen(443);
