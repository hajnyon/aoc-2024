export default (lines: string[]) => {
	const separatorIndex = lines.findIndex((line) => line === "");
	const rules = lines.slice(0, separatorIndex).map((line) => {
		const parts = line.split("|");
		return {
			a: Number(parts[0]),
			b: Number(parts[1]),
		};
	});
	const updates = lines.slice(separatorIndex + 1);

	let result = 0;

	for (const update of updates) {
		const page = update.split(",").map((part) => Number(part));
		let isCorrect = true;
		for (const rule of rules) {
			const ruleAPos = page.findIndex((val) => val === rule.a);
			const ruleBPos = page.findIndex((val) => val === rule.b);
			if (ruleAPos === -1 || ruleBPos === -1) {
				continue;
			}
			if (ruleAPos > ruleBPos) {
				isCorrect = false;
				break;
			}
		}
		if (isCorrect) {
			result += page[Math.ceil((page.length - 1) / 2)];
		}
	}

	return result;
};
