"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictPointResultType = void 0;
exports.default = PredictPoint;
const Circle_js_1 = require("./Circle.js");
const OrthCord_js_1 = require("./cordinate/OrthCord.js");
var PredictPointResultType;
(function (PredictPointResultType) {
    PredictPointResultType[PredictPointResultType["DATA_NOT_ENOUGH"] = 0] = "DATA_NOT_ENOUGH";
    PredictPointResultType[PredictPointResultType["SUCCESS"] = 1] = "SUCCESS";
    PredictPointResultType[PredictPointResultType["FAILED"] = 2] = "FAILED";
})(PredictPointResultType || (exports.PredictPointResultType = PredictPointResultType = {}));
;
;
function PredictPoint(data) {
    if (data.length <= 2) {
        console.log("data is not enough....");
        console.log(`data.length: ${data.length}`);
        return {
            type: PredictPointResultType.DATA_NOT_ENOUGH,
            result: undefined
        };
    }
    let circles = [];
    // let thirdNode: Node | undefined = undefined;
    for (let i = 0; i < 3; i++) {
        const element = data[i];
        const node = element["node"];
        const distance = element["distance"];
        let circle = { center: node.pos, radius: distance };
        circles.push(circle);
        var thirdNode = node;
    }
    let intersecs = (0, Circle_js_1.findIntersections)(circles[0], circles[1]);
    if (intersecs.type == Circle_js_1.FindIntersectionsResultType.FOUND) {
        const d1 = (0, OrthCord_js_1.getDistance)(intersecs.results[0], thirdNode.pos);
        const d2 = (0, OrthCord_js_1.getDistance)(intersecs.results[1], thirdNode.pos);
        console.log('intersecs[0].x:', intersecs.results[0].x);
        console.log('intersecs[1].x:', intersecs.results[1].x);
        return d1 < d2 ? {
            type: PredictPointResultType.SUCCESS,
            result: intersecs.results[0]
        } : {
            type: PredictPointResultType.SUCCESS,
            result: intersecs.results[0]
        };
    }
    else {
        return {
            type: PredictPointResultType.FAILED,
            result: undefined
        };
    }
}
//# sourceMappingURL=PredictPoint.js.map