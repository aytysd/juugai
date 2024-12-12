export var PredictPointResultType;
(function (PredictPointResultType) {
    PredictPointResultType[PredictPointResultType["DATA_NOT_ENOUGH"] = 0] = "DATA_NOT_ENOUGH";
    PredictPointResultType[PredictPointResultType["SUCCESS"] = 1] = "SUCCESS";
    PredictPointResultType[PredictPointResultType["FAILED"] = 2] = "FAILED";
})(PredictPointResultType || (PredictPointResultType = {}));
;
;
let lastPredictedPoint = [0, 0];
export default function PredictPoint(data) {
    if (data.length <= 2) {
        return {
            type: PredictPointResultType.FAILED,
            result: undefined
        };
    }
    // 数値微分による偏導関数
    const partialDerivativeX = (f, x, y, h = 1e-5) => {
        const result = (f(x + h, y) - f(x - h, y)) / (2 * h);
        return result;
    };
    const partialDerivativeY = (f, x, y, h = 1e-5) => {
        const result = (f(x, y + h) - f(x, y - h)) / (2 * h);
        return result;
    };
    // ヤコビアン行列の計算
    const jacobian = (alpha, beta) => {
        return [
            [
                partialDerivativeX(g1, alpha, beta),
                partialDerivativeY(g1, alpha, beta)
            ],
            [
                partialDerivativeX(g2, alpha, beta),
                partialDerivativeY(g2, alpha, beta)
            ]
        ];
    };
    // 2x2行列の逆行列計算
    const inverseMatrix = (m) => {
        const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
        return [
            [m[1][1] / det, -m[0][1] / det],
            [-m[1][0] / det, m[0][0] / det]
        ];
    };
    // ベクトルの減算
    const subtractVectors = (v1, v2) => {
        return [v1[0] - v2[0], v1[1] - v2[1]];
    };
    // 行列とベクトルの乗算
    const multiplyMatrixVector = (m, v) => {
        return [
            (m[0][0] * v[0] + m[0][1] * v[1]),
            (m[1][0] * v[0] + m[1][1] * v[1])
        ];
    };
    let options = [];
    for (const item of data) {
        const option = {
            ci1: item.x,
            ci2: item.y,
            mu: item.distance,
            sigma: 0.7
        };
        options.push(option);
    }
    const g1 = (alpha, beta) => {
        // Σ((α - ci1)(log√((α - ci1)^2 + (β - ci2)^2) - μi) / σi^2)
        const result = options.reduce((sum, point) => {
            const { ci1, ci2, mu, sigma } = point;
            const distance = Math.sqrt((alpha - ci1) ** 2 + (beta - ci2) ** 2);
            const result = (-1) * ((distance - mu) * (alpha - ci1)) / (distance * (sigma ** 2));
            return sum + result;
        }, 0);
        return result;
    };
    const g2 = (alpha, beta) => {
        const result = options.reduce((sum, point) => {
            const { ci1, ci2, mu, sigma } = point;
            const distance = Math.sqrt((alpha - ci1) ** 2 + (beta - ci2) ** 2);
            const result = (-1) * ((distance - mu) * (beta - ci2)) / (distance * (sigma ** 2));
            return sum + result;
        }, 0);
        return result;
    };
    // ニュートン法の実装
    const newtonMethod = (initialAlpha, initialBeta, maxIterations = 500, tolerance = 1e-6) => {
        let x = [initialAlpha, initialBeta];
        console.log(`initial g1: ${g1(initialAlpha, initialBeta)}`);
        console.log(`initial g2: ${g2(initialAlpha, initialBeta)}`);
        for (let i = 0; i < maxIterations; i++) {
            const [alpha, beta] = x;
            const gx = [g1(alpha, beta), g2(alpha, beta)];
            const J = jacobian(alpha, beta);
            const Jinv = inverseMatrix(J);
            const delta = multiplyMatrixVector(Jinv, gx);
            x = subtractVectors(x, delta);
            // if (Math.abs(delta[0]) < tolerance && Math.abs(delta[1]) < tolerance) {
            //   console.log(`Converged after ${i + 1} iterations`);
            //   return x;
            // }
        }
        console.log(`g1: ${g1(x[0], x[1])}`);
        console.log(`g2: ${g2(x[0], x[1])}`);
        // console.log(x);
        console.log(`Did not converge after ${maxIterations} iterations`);
        return x;
    };
    const result = newtonMethod(lastPredictedPoint[0], lastPredictedPoint[1]);
    if (result[0] && result[1]) {
        lastPredictedPoint = result;
    }
    else {
        lastPredictedPoint = [0, 0];
    }
    const p = { x: result[0], y: result[1] };
    return {
        type: PredictPointResultType.SUCCESS,
        result: p
    };
}
//# sourceMappingURL=PredictPoint.js.map