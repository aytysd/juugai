import { sub } from './cordinate/OrthCord.js';
// import { create ,all } from 'mathjs'
export class Node {
    nodeName;
    pos;
    constructor(nodeName, posX, posY) {
        this.nodeName = nodeName;
        this.pos = { x: posX, y: posY };
    }
    getPointFromNode(p) {
        return sub(p, this.pos);
    }
}
const node1 = new Node("node1", 70, 70);
const node2 = new Node("node2", -70, 70);
const node3 = new Node("node3", -70, -70);
const node4 = new Node("node4", 70, -70);
const nodes = new Map();
nodes.set("node1", node1);
nodes.set("node2", node2);
nodes.set("node3", node3);
nodes.set("node4", node4);
export default nodes;
//# sourceMappingURL=Node.js.map