// Expressフレームワーク
var express = require('express');
var app = express();

const port = 80;
// const post = 443;

// HTTPSサーバー起動
// var fs = require('fs');
// var https = require('https');
// var options = {
//   key:  fs.readFileSync('./key.pem'),
//   cert: fs.readFileSync('./cert.pem')
// };
// var server = https.createServer(options,app);

// ルート設定

// app.get('/rest', function (req, res) {
//     res.writeHead(200);
//     res.end("Hello World.");
// });

// app.get('/another', (req, res) => {
//     console.log("access /another");
//     res.sendFile(__dirname + '/public/index.html');
// });

// app.get('/maps/ms', (req, res) => {
//     console.log("access /ms");
//     res.sendFile(__dirname + '/public/maps.html');
// });

app.use('/maps', express.static(__dirname + '/public'));
// app.get('/', (req, res) => {
//     res.contentType('text/plain;charset=utf-8');
//     let url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
//     res.write(url);
//     res.end();
// });


// イベント待機
// server.listen(port);
app.listen(port, () => {
    console.log(`Start app at http://localhost:${port}`);
});
