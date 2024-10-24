import analyze from './components/analyze.js';

import express, { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 2000;

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb:any) : void{
    cb(null, 'src/database/');
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

    const filename = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}.json`;

    cb(null, filename);
  }
});

const upload = multer({ storage: storage });


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const databaseFile = __dirname + "/public/database/user.json";
const databaseFile =`${__dirname}/database/user.json`;

app.use(express.json());
app.use(express.urlencoded({extended:true}));


// 接待したポートでサーバを待機状態にする
app.listen(port, () => {
    console.log(`Start app at http://localhost:${port}`);
    console.log(`Datafile directory : ${databaseFile}`);
});

app.post("/database" , upload.single('file'), (req: Request, res: Response) => {
    // console.log(`Datafile directory : ${databaseFile}`);

  console.log('File  uploaded:', req.file);

  if (req.file) {
    const outputFilePath = analyze(`/app/${req.file.path}`);
    fs.readFile(outputFilePath as string, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      let jsonText = data;

      try {
        res.send(jsonText);
      } catch (err) {
        console.log(err);
        res.send(false);
      }

    });

  }

})
