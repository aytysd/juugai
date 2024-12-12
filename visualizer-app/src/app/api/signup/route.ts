import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import nodemailer from 'nodemailer';


export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const notificationEmail = formData.get('notification-email');
  const password = formData.get('password');
  const gwLat = formData.get('gw_lat');
  const gwLong = formData.get('gw_long');

  console.log("fullName:", name);
  console.log("email:", email);
  console.log("notificationEmail:", notificationEmail);
  console.log("password:", password);
  console.log("gwLat:", gwLat);
  console.log("gwLong:", gwLong);

  // ここでデータベースに保存する処理を追加
  // 例: await saveUser({ fullName, email, notificationEmail, password, gwLat, gwLong });

  const connection = await mysql.createConnection({
    host: '192.168.10.5',  // ホスト名
    user: 'root',
    password: 'root_password',
    database: 'user_db'
  });

    const [result] = await connection.execute(
        'INSERT INTO users (name, email, notification_email, password, gw_lat, gw_long) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, notificationEmail, password, gwLat, gwLong]
    );

    const pass = "rayr owyj bxyc sydm"
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "animalmiru@gmail.com",
            pass: pass,
        }
    });

    const info = transporter.sendMail({
        from: "animalmiru@gmail.com",
        to: notificationEmail,
        subject: "Animal Miruの登録完了しました。",
        text: "Animal Miruへの登録が完了しました。\n これからもAnimal Miruをよろしくお願いします。",
    });


    await connection.end();


    return NextResponse.json({ message: 'サインアップが成功しました' }, { status: 200 });
}

