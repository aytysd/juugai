"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindIntersectionsResultType = void 0;
exports.findIntersections = findIntersections;
;
var FindIntersectionsResultType;
(function (FindIntersectionsResultType) {
    FindIntersectionsResultType[FindIntersectionsResultType["FOUND"] = 0] = "FOUND";
    FindIntersectionsResultType[FindIntersectionsResultType["NO_INTERSECS"] = 1] = "NO_INTERSECS";
    FindIntersectionsResultType[FindIntersectionsResultType["INSIDE"] = 2] = "INSIDE";
    FindIntersectionsResultType[FindIntersectionsResultType["OVERLAPPING"] = 3] = "OVERLAPPING";
})(FindIntersectionsResultType || (exports.FindIntersectionsResultType = FindIntersectionsResultType = {}));
;
;
function findIntersections(circle1, circle2) {
    const dx = circle2.center.x - circle1.center.x;
    const dy = circle2.center.y - circle1.center.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    // console.log(`d: ${d}`);
    // 円が重なっていない場合
    if (d > circle1.radius + circle2.radius) {
        return {
            type: FindIntersectionsResultType.NO_INTERSECS,
            results: undefined
        };
    }
    // 一方の円がもう一方の円の内部にある場合
    if (d < Math.abs(circle1.radius - circle2.radius)) {
        return {
            type: FindIntersectionsResultType.INSIDE,
            results: undefined
        };
    }
    // 円が完全に一致している場合
    if (d === 0 && circle1.radius === circle2.radius) {
        return {
            type: FindIntersectionsResultType.OVERLAPPING,
            results: undefined
        };
    }
    const a = (circle1.radius * circle1.radius - circle2.radius * circle2.radius + d * d) / (2 * d);
    const h = Math.sqrt(circle1.radius * circle1.radius - a * a);
    const pointX = circle1.center.x + (dx * a) / d;
    const pointY = circle1.center.y + (dy * a) / d;
    const offsetX = -dy * (h / d);
    const offsetY = dx * (h / d);
    const x1 = pointX + offsetX;
    const y1 = pointY + offsetY;
    const x2 = pointX - offsetX;
    const y2 = pointY - offsetY;
    // console.log(`x1: ${x1}, y1: ${y1}`);
    // console.log(`x2: ${x2}, y2: ${y2}`);
    // return [
    //   new Point(pointX + offsetX, pointY + offsetY),
    //   new Point(pointX - offsetX, pointY - offsetY)
    // ];
    return {
        type: FindIntersectionsResultType.FOUND,
        results: [
            { x: pointX + offsetX, y: pointY + offsetY },
            { x: pointX - offsetX, y: pointY - offsetY }
        ]
    };
}
//# sourceMappingURL=Circle.js.map