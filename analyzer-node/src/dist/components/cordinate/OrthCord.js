export function convertOrth2Polar(p) {
    const x = p.x;
    const y = p.y;
    const r = Math.sqrt(x * x + y * y);
    let theta = Math.atan2(y, x);
    while (theta < 0) {
        theta += 2 * Math.PI;
    }
    while (theta >= 2 * Math.PI) {
        theta -= 2 * Math.PI;
    }
    const polar = { r, theta };
    return polar;
}
export function sub(p1, p2) {
    const result = {
        x: p1.x - p2.x,
        y: p1.y - p2.y
    };
    return result;
}
export function getDistance(p1, p2) {
    const x1 = p1.x;
    const y1 = p1.y;
    const x2 = p2.x;
    const y2 = p2.y;
    const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    return distance;
}
//# sourceMappingURL=OrthCord.js.map