"use client";

import { useState, useEffect } from 'react'

type Props = {
  title: string
}

const SubscribeButton = ({ title }: Props) => {
    const [pushSubscription, setPushSubscription] = useState<PushSubscription | null>(null);

    const encodeToBase64 = (arrayBuffer: ArrayBuffer | null) => {
        if (!arrayBuffer) return '';
        return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    };
    
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                });
        } else {
            console.error('Service workers are not supported.');
        }

    }, [])

    useEffect(() => {
        if (!('Notification' in window)) {
            console.log('This browser does not support desktop notification')
        } else if (Notification.permission === 'granted') {
            new Notification(title)
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    new Notification(title)
                }
            });
        }

    }, [title])

    useEffect(() => {
        const registerPushNotification = async () => {
            try {
                const p256dh = encodeToBase64(pushSubscription?.getKey('p256dh') as ArrayBuffer | null);
                const endpoint = pushSubscription?.endpoint;
                const auth = encodeToBase64(pushSubscription?.getKey('auth') as ArrayBuffer | null);

                const response = await fetch('/api/web_push_register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // 必要に応じてヘッダーを設定
                    },
                    body: JSON.stringify({
                        auth: auth,
                        endpoint: endpoint,
                        p256dh: p256dh
                    }),
                });

                if (!response.ok) {
                    throw new Error(
                        `HTTP error! status: ${response.status}, message: ${response.statusText}`
                    );
                }

                const data = await response.json(); // レスポンスデータを取得
                console.log('Response data:', data); // レスポンスデータをログに表示

            } catch (err) {
                console.error('Error fetching file list:', err);
            }
        };

        registerPushNotification(); // 非同期関数を呼び出す

    }, [pushSubscription])

    const handleClick = async () => {
        const getPushSubscription = async () => {
            if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
                return;
                // return show('このブラウザはプッシュ通知に対応していません');
            }

            const permission = await Notification.requestPermission();
            if (permission === 'denied' || permission === 'default') {
                // return show(
                //     t(
                //         'プッシュ通知が許可されていません。ブラウザの設定を変更してください',
                //     ),
                // );
                return;
            }

            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: 'BLBJ5I5FUwS-byVf3J-a1W-V9QsXraz6gCQH_yNJm7xd77UrnBlJ0a8Fdq6whPK6GJKAh2qGe5B-2SpDZZ3S8lI',
            });

            setPushSubscription(subscription);
        };

        await getPushSubscription();

    }

        return <button onClick={() => handleClick()}>Subscribe</button>
    }

    export default SubscribeButton