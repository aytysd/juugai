const compression = require('compression');
const express = require('express');
const webPush = require('web-push');

const app = express();
//const port = 443;
const port = 80;

// HTTPSサーバー起動
const fs = require('fs');
const https = require('https');
var options = {
  key:  fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};
var server = https.createServer(options,app);

// サーバ起動時に、秘密鍵と公開鍵を作成
//const vapidKeys = webPush.generateVAPIDKeys();
//console.log(vapidKeys.publicKey)
//console.log(vapidKeys.privateKey)

const VAPID_PUBLIC_KEY = "";
const VAPID_PRIVATE_KEY = "";

// Push 通知機能を初期化
webPush.setVapidDetails(
    'mailto:xxxxxxx@xxxxx.example',
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
);


// CHANGE TO YOUR TOKEN FOR TEST
const pushSubscription1 = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fXbyGY04zHY:APA91bE-EZI...",
    "expirationTime": null,
    "keys": {
        "p256dh": "BHqcQRz0HXwdZXZOT5GkQC_d5P1XFcevTkNPuJqh...",
        "auth": "o3SJkOwZFr7deVnT98..."
    }
};


let pushData = JSON.stringify({
    "title": "Push title",
    "body": "Additional text with some description",
    // "icon": "",
    // "image": "",
    "data": {
        "url": "https://github.com/",
        "message_id": "your_internal_unique_message_id_for_tracking"
    }
});

app.use(compression());
app.use(express.json());

// POST を受けたら、5秒後に Push 通知を送信するアクション
// app.post('/webpushtest', (req, res) => {
//     console.log(req.body);
//     try {
//         setTimeout(async _ => { // ちょっと遅延させて通知
//             await webPush.sendNotification(req.body, JSON.stringify({
//                 title: 'Web Push通知テスト',
//             }));
//         }, 5000);
//         res.json({ success: true });
//     } catch (err) {
//         console.log(err);
//     }
// })

app.get('/webpushsignal', (req, res) => {
    try {
        async _ => await webpush.sendNotification(pushSubscription, pushData);


        // async _ => await webPush.sendNotification(bd, JSON.stringify({
        //     title: 'Web Push通知テスト',
        // }));
        res.json({ success: true });
    } catch (err) {
        console.log(err);
    }
})

// 上記URLでヒットしないなら、public の中を表示する
app.use('/', express.static(__dirname + '/public'));

//http.createServer((express()).all("*", function (request, response) {
//    response.redirect(`https://${request.hostname}${request.url}`);
//})).listen(80);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

