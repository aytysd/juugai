"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertPolar2Orth = convertPolar2Orth;
function convertPolar2Orth(p) {
    const x = p.r * Math.cos(p.theta);
    const y = p.r * Math.sin(p.theta);
    return { x, y };
}
//# sourceMappingURL=PolarCord.js.map