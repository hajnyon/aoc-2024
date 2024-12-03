export default (lines: string[]) => {
	const input = lines.join("");

	const re = /(do\(\)|don\'t\(\)|mul\((\d{1,3}),(\d{1,3})\))/g;

	let result = 0;
	let part: RegExpExecArray | null = null;
	let enabled = true;
	while (true) {
		part = re.exec(input);
		if (part === null) {
			break;
		}
		const [, expr, a, b] = part;
		if (expr === "don't()") {
			enabled = false;
			part = re.exec(input);
			continue;
		}
		if (expr === "do()") {
			enabled = true;
			continue;
		}

		if (enabled) {
			result += Number(a) * Number(b);
		}
	}

	return result;
};
