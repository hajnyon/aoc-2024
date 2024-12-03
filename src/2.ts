const isCorrect = (records: number[], multiplier: number) => {
	for (let i = 1; i < records.length; i++) {
		const diff = (records[i - 1] - records[i]) * multiplier;
		if (diff < 1 || diff > 3) {
			return false;
		}
	}

	return true;
};

export default (lines: string[]) => {
	let result = 0;

	for (const line of lines) {
		const records = line.split(" ").map((r) => Number.parseInt(r));
		const isIncreasing = records[0] < records[1];
		const multiplier = isIncreasing ? -1 : 1;

		const correct = isCorrect(records, multiplier);
		if (correct) {
			result++;
		} else {
			for (let i = 0; i < records.length; i++) {
				const newRecords = [...records];
				newRecords.splice(i, 1);
				const newIsIncreasing = newRecords[0] < newRecords[1];
				const newMultiplier = newIsIncreasing ? -1 : 1;
				const newCorrect = isCorrect(newRecords, newMultiplier);
				if (newCorrect) {
					result++;
					break;
				}
			}
		}
	}

	return result;
};
