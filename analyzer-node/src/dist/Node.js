"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const OrthCord_js_1 = require("./cordinate/OrthCord.js");
// import { create ,all } from 'mathjs'
class Node {
    constructor(nodeName, posX, posY) {
        this.nodeName = nodeName;
        this.pos = { x: posX, y: posY };
    }
    getPointFromNode(p) {
        return (0, OrthCord_js_1.sub)(p, this.pos);
    }
}
exports.Node = Node;
const node1 = new Node("node1", 70, 70);
const node2 = new Node("node2", -70, 70);
const node3 = new Node("node3", -70, -70);
const node4 = new Node("node4", 70, -70);
const nodes = new Map();
nodes.set("node1", node1);
nodes.set("node2", node2);
nodes.set("node3", node3);
nodes.set("node4", node4);
exports.default = nodes;
//# sourceMappingURL=Node.js.map