if (navigator.serviceWorker) {
    initServiceWorker();
}

async function initServiceWorker() {
    let swRegistration = await navigator.serviceWorker.register('./serviceworker')
    let pushManager = swRegistration.pushManager;

    if (!isPushManagerActive(pushManager)) {
        return;
    }

    let permissionState = await pushManager.permissionState({userVisibleOnly: true});
    switch (permissionState) {
        case 'prompt':
            document.getElementById('subscribe_btn').style.display = 'block';
            break;
        case 'granted':
            displaySubscriptionInfo(await pushManager.getSubscription())
            break;
        case 'denied':
            document.getElementById('subscribe_btn').style.display = 'none';
            document.getElementById('active_sub').style.display = 'block';
            document.getElementById('active_sub').innerHTML = 'User denied push permission';
    }
}

function isPushManagerActive(pushManager) {
    if (!pushManager) {
        if (window.navigator.standalone) {
            throw new Error('PushManager is not active');
        }
        document.getElementById('subscribe_btn').style.display = 'none';
        return false;
    } else {
        return true;
    }
}

async function subscribeToPush() {
    // Public part of VAPID key, generation of that covered in README
    // All subscription tokens associated with that key, so if you change it - you may lose old subscribers
    const VAPID_PUBLIC_KEY = '';

    convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
    console.log(`vapidPublicKey: ${vapidPublicKey}`);

    let swRegistration = await navigator.serviceWorker.getRegistration();
    let pushManager = swRegistration.pushManager;
    if (!isPushManagerActive(pushManager)) {
        return;
    }


    let subscriptionOptions = {
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
    };
    console.log(subscriptionOptions);
    try {
        let subscription = await pushManager.subscribe(subscriptionOptions);
        displaySubscriptionInfo(subscription);
        // Here you can send fetch request with subscription data to your backend API for next push sends from there
    } catch (error) {
        document.getElementById('active_sub').style.display = 'block';
        document.getElementById('active_sub').innerHTML = 'User denied push permission';
    }
}

function displaySubscriptionInfo(subscription) {
    document.getElementById('subscribe_btn').style.display = 'none';
    document.getElementById('active_sub').style.display = 'block';
    document.getElementById('active_sub').innerHTML = '<b>Active subscription:</b><br><br>'
        + JSON.stringify(subscription.toJSON());
    document.getElementById('test_send_btn').style.display = 'block';
}

function testSend() {
    const title = "Push title";
    const options = {
        body: "Additional text with some description",
        // icon: "",
        // image: "",
        data: {
            url: "https://github.com/",
            message_id: "your_internal_unique_message_id_for_tracking"
        }
    };
    navigator.serviceWorker.ready.then(async function (serviceWorker) {
        await serviceWorker.showNotification(title, options);
    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}