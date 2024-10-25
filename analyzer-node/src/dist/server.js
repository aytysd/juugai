import analyze from './components/analyze.js';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const port = 2000;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.originalname === "traj.json") {
            cb(null, '/app/database/PathData');
        }
        else if (file.originalname === "sensorData.json") {
            cb(null, '/app/database/SensorData');
        }
    },
    filename: function (req, file, cb) {
        const jstOffset = 9 * 60 * 60 * 1000; // 9時間をミリ秒に変換
        const now = new Date(Date.now() + jstOffset);
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // 月は0から始まるため +1
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        let filename = "";
        if (file.originalname === "traj.json") {
            filename = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}-traj.json`;
        }
        else if (file.originalname === "sensorData.json") {
            filename = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}.json`;
        }
        cb(null, filename);
    }
});
const upload = multer({ storage: storage });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 接待したポートでサーバを待機状態にする
app.listen(port, () => {
    console.log(`Start app at http://localhost:${port}`);
    console.log(`Datafile directory : /app/database`);
});
app.post("/sensor-data", upload.single('file'), (req, res) => {
    console.log('File  uploaded:', req.file);
    if (req.file) {
        analyze(req.file.path);
        res.send("success!!");
    }
    res.send("failed!!");
});
app.post("/traj-data", upload.single('file'), (req, res) => {
    console.log('File  uploaded:', req.file);
});
//# sourceMappingURL=server.js.map