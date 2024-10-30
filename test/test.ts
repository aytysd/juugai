const g1 = (alpha: number, beta: number): number => {
	const K = options.length;

	// 2Kα
	const term1 = 2 * K * alpha;

	// -2Σci1
	const term2 = -2 * options.reduce((sum, point) => {
			const result = sum + point.ci1
			return result;
			}, 0);

	// Σ((α - ci1)(log√((α - ci1)^2 + (β - ci2)^2) - μi) / σi^2)
	const term3 = options.reduce((sum, point) => {
			const { ci1, ci2, mu, sigma } = point;
			const distance = Math.sqrt((alpha - ci1) ** 2 + (beta - ci2) ** 2);
			const logTerm = Math.log(distance) - mu;
			return sum + ((alpha - ci1) * logTerm) / (sigma ** 2);
			}, 0);

	return term1 + term2 + term3;
}

const g2 = (alpha: number, beta: number): number => {
	const K = options.length;

	// 2Kβ
	const term1 = 2 * K * beta;

	// -2Σci2
	const term2 = -2 * options.reduce((sum, point) => sum + point.ci2, 0);

	// Σ((β - ci2)(log√((α - ci1)^2 + (β - ci2)^2) - μi) / σi^2)
    const term3 = options.reduce((sum, point) => {
      const { ci1, ci2, mu, sigma } = point;
      const distance = Math.sqrt((alpha - ci1) ** 2 + (beta - ci2) ** 2);
      const logTerm = Math.log(distance) - mu;
      return sum + ((beta - ci2) * logTerm) / (sigma ** 2);
    }, 0);

    return term1 + term2 + term3;
  }


const resultx = g1(0.0032129532947714743);
const resulty = g2(0.030746093203120817);

console.log(resultx);
console.log(resulty);
