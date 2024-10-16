"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractFileData;
const fs = __importStar(require("fs"));
const moment_1 = __importDefault(require("moment"));
const Node_1 = __importDefault(require("./Node"));
"use strict";
function extractFileData(fp) {
    try {
        // JSONファイルを読み込み、パースして変数に格納
        const rawData = fs.readFileSync(fp, 'utf8');
        const jsonData = JSON.parse(rawData);
        var processedJsonData = jsonData.map((value, index, array) => {
            const ts = (0, moment_1.default)(value["timestamp"], "HH-mm-ss-SSSS");
            const distance = parseFloat(value["distance"]);
            const node = Node_1.default.get(value["node"]);
            const cordinalDirectionInStr = value["cordinal direction"];
            let newValue = {
                timestamp: ts,
                node: node,
                distance: distance,
                cordinalDirection: cordinalDirectionInStr
            };
            return newValue;
        });
        // console.log(jsonData);
        return processedJsonData;
        // ここでjsonDataを使用できます
    }
    catch (error) {
        console.error('エラーが発生しました:', error);
        return undefined;
    }
}
//# sourceMappingURL=fileIO.js.map