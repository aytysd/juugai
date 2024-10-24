"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const analyze_js_1 = require("./components/analyze.js");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const app = (0, express_1.default)();
const port = 2000;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/database/');
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
        const filename = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}.json`;
        cb(null, filename);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path_1.default.dirname(__filename);
// const databaseFile = __dirname + "/public/database/user.json";
const databaseFile = `${__dirname}/database/user.json`;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// 接待したポートでサーバを待機状態にする
app.listen(port, () => {
    console.log(`Start app at http://localhost:${port}`);
    console.log(`Datafile directory : ${databaseFile}`);
});
app.post("/database", upload.single('file'), (req, res) => {
    // console.log(`Datafile directory : ${databaseFile}`);
    console.log("hello");
    console.log('File  uploaded:', req.file);
    const outputFilePath = (0, analyze_js_1.analyze)(`/app/${req.file.path}`);
    fs_1.default.readFile(outputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        let jsonText = data;
        try {
            res.send(jsonText);
        }
        catch (err) {
            console.log(err);
            res.send(false);
        }
    });
});
