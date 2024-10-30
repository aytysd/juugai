var g1 = function (alpha, beta) {
    var K = options.length;
    // 2Kα
    var term1 = 2 * K * alpha;
    // -2Σci1
    var term2 = -2 * options.reduce(function (sum, point) {
        var result = sum + point.ci1;
        return result;
    }, 0);
    // Σ((α - ci1)(log√((α - ci1)^2 + (β - ci2)^2) - μi) / σi^2)
    var term3 = options.reduce(function (sum, point) {
        var ci1 = point.ci1, ci2 = point.ci2, mu = point.mu, sigma = point.sigma;
        var distance = Math.sqrt(Math.pow((alpha - ci1), 2) + Math.pow((beta - ci2), 2));
        var logTerm = Math.log(distance) - mu;
        return sum + ((alpha - ci1) * logTerm) / (Math.pow(sigma, 2));
    }, 0);
    return term1 + term2 + term3;
};
var g2 = function (alpha, beta) {
    var K = options.length;
    // 2Kβ
    var term1 = 2 * K * beta;
    // -2Σci2
    var term2 = -2 * options.reduce(function (sum, point) { return sum + point.ci2; }, 0);
    // Σ((β - ci2)(log√((α - ci1)^2 + (β - ci2)^2) - μi) / σi^2)
    var term3 = options.reduce(function (sum, point) {
        var ci1 = point.ci1, ci2 = point.ci2, mu = point.mu, sigma = point.sigma;
        var distance = Math.sqrt(Math.pow((alpha - ci1), 2) + Math.pow((beta - ci2), 2));
        var logTerm = Math.log(distance) - mu;
        return sum + ((beta - ci2) * logTerm) / (Math.pow(sigma, 2));
    }, 0);
    return term1 + term2 + term3;
};
var resultx = g1(0.0032129532947714743);
var resulty = g2(0.030746093203120817);
console.log(resultx);
console.log(resulty);
