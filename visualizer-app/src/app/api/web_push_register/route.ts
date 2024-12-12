import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';


export async function POST(req) {


  // リクエストボディをJSONとして取得
  const { auth, endpoint, p256dh } = await req.json();

  // デバッグ用に受け取ったデータをコンソールに表示
  console.log('Received auth:', auth);
  console.log('Received endpoint:', endpoint);
  console.log('Received p256dh:', p256dh);

  // pushSubscriptionオブジェクトを作成
  const pushSubscription = {
    auth,
    endpoint,
    p256dh
  };

  // ここでpushSubscriptionを使って何らかの処理を行うことができます

  const results = {
    message: 'Push subscription received successfully',
    subscription: pushSubscription
  };

  try {
    const response = await fetch('http://192.168.10.3:2000/web-push-register', {
      method: 'POST', // メソッドをPOSTに設定
      headers: {
        'Content-Type': 'application/json', // ヘッダーにContent-Typeを設定
      },
      body: JSON.stringify(pushSubscription), // ボディにデータをJSON形式で設定
    });

    // レスポンスがOKでない場合はエラーをスロー
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json(); // レスポンスボディをJSONとして取得
    console.log('Success:', result); // 成功した場合の結果を表示
  } catch (error) {
    console.error('Error:', error); // エラーハンドリング
  }

  // 結果をJSON形式で返す
  return NextResponse.json(results);
}
