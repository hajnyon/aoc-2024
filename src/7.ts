export default (lines: string[]) => {
	let result = 0;

	const solve = (nums: number[], test: number, index: number, acc = 0) => {
		if (index === nums.length) {
			return {
				isCorrect: test === acc,
				acc,
			};
		}
		const addRes = solve(nums, test, index + 1, acc + nums[index]);
		const multRes = solve(nums, test, index + 1, acc * nums[index]);
		const concRes = solve(
			nums,
			test,
			index + 1,
			Number(`${acc}${nums[index]}`),
		);
		return addRes.isCorrect ? addRes : multRes.isCorrect ? multRes : concRes;
	};

	for (const line of lines) {
		const parsed = line.split(": ");
		const test = Number(parsed[0]);
		const nums = parsed[1].split(" ").map((num) => Number(num));

		const res = solve(nums, test, 1, nums[0]);
		if (res.isCorrect) {
			result += res.acc;
		}
	}

	return result;
};
