import analyze from './components/analyze.js';

import express, { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import nodemailer from 'nodemailer';
import mysql, { RowDataPacket } from 'mysql2/promise';

const app = express();
const port = 2000;


const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb:any) : void{
    if(file.originalname === "traj.json") {
      cb(null, '/app/database/PathData');
    } else if(file.originalname === "sensorData.json") {
      cb(null, '/app/database/SensorData');
    }
  },
  filename: function (req: Request, file: Express.Multer.File, cb:any) : void{
    const jstOffset = 9 * 60 * 60 * 1000; // 9時間をミリ秒に変換
    const now = new Date(Date.now() + jstOffset);

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため +1
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    let filename = "";

    if(file.originalname === "traj.json") {
      filename = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}-traj.json`;
    } else if(file.originalname === "sensorData.json") {
      filename = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}.json`;
    }

    cb(null, filename);
  }
});

const upload = multer({ storage: storage });


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended:true}));


// 接待したポートでサーバを待機状態にする
app.listen(port, () => {
    console.log(`Start app at http://localhost:${port}`);
    console.log(`Datafile directory : /app/database`);
});


app.post("/sensor-data" , upload.single('file'), async (req: Request, res: Response) => {
  console.log('File  uploaded:', req.file);
  if (req.file) {
    analyze(req.file.path);

    const pass = "rayr owyj bxyc sydm"
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "animalmiru@gmail.com",
            pass: pass,
        }
    });

    const connection = await mysql.createConnection({
      host: '192.168.10.5',  // ホスト名
      user: 'root',
      password: 'root_password',
      database: 'user_db'
    });


    // connection.query('SELECT notification_email FROM users', (err: any, results: any, fields: any) => {
    //   for(const result of results) {
    //     const info = transporter.sendMail({
    //       from: "animalmiru@gmail.com",
    //       to: result.notification_email,
    //       subject: "TestMail",
    //       text: "This is a test mail",
    //     });
    //   }

    // });
    const [rows, fields] = await connection.execute('SELECT notification_email FROM users') as [RowDataPacket[], any];
    // connection.query('SELECT notification_email FROM users')
    // const emails = rows.map(row => row.notification_email)

    // const info = transporter.sendMail({
    //   from: "animalmiru@gmail.com",
    //   to: rows[0].notification_email,
    //   subject: "TestMail",
    //   text: "This is a test mail",

    const jstOffset = 9 * 60 * 60 * 1000; // 9時間をミリ秒に変換
    const jstTime = new Date(Date.now() + jstOffset);   // });

    rows.forEach(row => {
      const info = transporter.sendMail({
        from: "animalmiru@gmail.com",
        to: row.notification_email,
        subject: "動物を検知しました！！",
        text: `
        ${jstTime.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}に動物を検知しました。
        予想される動物の種類は鹿、熊、イノシシのいずれかです。

        破られたフェンスの座標は北緯35.123456、東経135.123456です。

        このメールは自動送信です。返信はできません。`,
        attachments: [
          {
            filename: 'detected_animal.jpg',
            content: fs.readFileSync('./test_path.png'),
            encoding: 'base64'
          }
        ]
      });
    }); // 

    res.send("success!!");
  }
  else{
    res.send("failed!!");

  }
})

app.post("/traj-data", upload.single('file'), (req: Request, res: Response) => {
  console.log('File  uploaded:', req.file);
})



