const VAPID_PUBLIC_KEY = '';
const VAPID_PRIVATE_KEY= '';

// npm install web-push
const webpush = require('web-push');

webpush.setVapidDetails(
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
);
const pushSubscription = {
	"endpoint":"https://web.push.apple.com/QD…",
        "expirationTime": null,
	"keys": {
		"p256dh":"BBa…",
		"auth":"o…"
	}
}

const pushSubscription2 = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cX…",
    "expirationTime": null,
    "keys" : {
            "auth": "_Ar…",
            "p256dh": "BAU…"
    }
}

const pushSubscription3 = {
    "endpoint":"https://web.push.apple.com/Q…",
    "expirationTime": null,
    "keys":{
        "p256dh":"B…",
        "auth":"3JX…"
    }
}

const pushSubscription4 = {
    "endpoint":"https://web.push.apple.com/QMu…",
    "expirationTime": null,
    "keys":{
        "p256dh":"BDFV…",
        "auth":"wRpq…"
    }
}

const pushSubscription5 = {
    "endpoint":"https://web.push.apple.com/QNxx…",
    "expirationTime": null,
    "keys":{
        "p256dh":"BBS_z…",
        "auth":"fV6A…"
    }
}
const pushSubscription6 = {
    "endpoint":"https://web.push.apple.com/QB…",
    "expirationTime": null,
    "keys":{
        "p256dh":"BP…",
        "auth":"DR-…"
    }
}
let pushData = JSON.stringify({
    "title": "Push title",
    "body": "Additional text with some description",
    "data": {
        "url": "https://domain.example/maps",
        "message_id": "your_internal_unique_message_id_for_tracking"
    }
});
//webpush.sendNotification(pushSubscription, pushData);
//webpush.sendNotification(pushSubscription2, pushData);
//webpush.sendNotification(pushSubscription3, pushData);
//webpush.sendNotification(pushSubscription4, pushData);
webpush.sendNotification(pushSubscription5, pushData);
//webpush.sendNotification(pushSubscription6, pushData);
