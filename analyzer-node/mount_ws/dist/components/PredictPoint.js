import { FindIntersectionsResultType, findIntersections } from './Circle.js';
import { getDistance } from './cordinate/OrthCord.js';
export var PredictPointResultType;
(function (PredictPointResultType) {
    PredictPointResultType[PredictPointResultType["DATA_NOT_ENOUGH"] = 0] = "DATA_NOT_ENOUGH";
    PredictPointResultType[PredictPointResultType["SUCCESS"] = 1] = "SUCCESS";
    PredictPointResultType[PredictPointResultType["FAILED"] = 2] = "FAILED";
})(PredictPointResultType || (PredictPointResultType = {}));
;
;
function getCombinations(array, size) {
    if (size > array.length)
        return [];
    if (size === 1)
        return array.map(elem => [elem]);
    return array.reduce((acc, current, index) => {
        const smallerCombinations = getCombinations(array.slice(index + 1), size - 1);
        const combinationsWithCurrent = smallerCombinations.map(smallerComb => [current, ...smallerComb]);
        return [...acc, ...combinationsWithCurrent];
    }, []);
}
export default function PredictPoint(data) {
    if (data.length <= 2) {
        console.log("data is not enough....");
        console.log(`data.length: ${data.length}`);
        return {
            type: PredictPointResultType.DATA_NOT_ENOUGH,
            result: undefined
        };
    }
    const combination = getCombinations(data, 3);
    let likelihoods = [];
    // let thirdNode: Node | undefined = undefined;
    for (let i = 0; i < combination.length; i++) {
        const targetData = combination[i];
        let circles = [];
        for (let j = 0; j < 2; j++) {
            const element = targetData[j];
            const node = element["node"];
            const distance = element["distance"];
            const circle = { center: node.pos, radius: distance };
            circles.push(circle);
        }
        const thirdNode = targetData[2].node;
        const intersecs = findIntersections(circles[0], circles[1]);
        console.log(intersecs.type);
        if (intersecs.type == FindIntersectionsResultType.FOUND) {
            const d1 = getDistance(intersecs.results[0], thirdNode.pos);
            const d2 = getDistance(intersecs.results[1], thirdNode.pos);
            const likelihood1 = Math.abs(d1 - targetData[2].distance);
            const likelihood2 = Math.abs(d2 - targetData[2].distance);
            console.log('intersecs[0].x:', intersecs.results[0].x);
            console.log('intersecs[1].x:', intersecs.results[1].x);
            likelihoods.push({
                p: likelihood1 < likelihood2 ? intersecs.results[0] : intersecs.results[1],
                l: likelihood1 < likelihood2 ? likelihood1 : likelihood2,
            });
        }
    }
    const mostLikely = likelihoods.reduce((min, current) => {
        return (current.l < min.l) ? current : min;
    }, likelihoods[0]);
    return {
        type: PredictPointResultType.SUCCESS,
        result: mostLikely.p
    };
}
//# sourceMappingURL=PredictPoint.js.map