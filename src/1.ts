export default (lines: string[]) => {
	let l1: number[] = [];
	let l2: number[] = [];

	for (const line of lines) {
		const [a, b] = line.split("   ");
		l1.push(Number.parseInt(a));
		l2.push(Number.parseInt(b));
	}
	l1 = l1.sort((a, b) => a - b);
	l2 = l2.sort((a, b) => a - b);

	let result = 0;
	for (let i = 0; i < l1.length; i++) {
		const num = l1[i];
		const count = l2.filter((n) => n === num).length;
		result += num * count;
	}
	return result;
};
