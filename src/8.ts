export default (lines: string[]) => {
	const map = new Map<string, [number, number][]>();

	for (const [index, line] of lines.entries()) {
		const chars = line.split("");
		for (const [indexC, char] of chars.entries()) {
			if (char === ".") {
				continue;
			}
			if (map.has(char)) {
				map.get(char)?.push([index, indexC]);
			} else {
				map.set(char, [[index, indexC]]);
			}
		}
	}

	const getAntidotes = (pairs: [number, number][]) => {
		const rowDist = Math.abs(pairs[0][0] - pairs[1][0]);
		const colDist = Math.abs(pairs[0][1] - pairs[1][1]);

		const antidote1 = [-1, -1];
		const antidote2 = [-1, -1];

		const isYBigger = pairs[0][0] > pairs[1][0];
		const isXBigger = pairs[0][1] > pairs[1][1];

		if (isYBigger) {
			if (isXBigger) {
				// x x
				// x A
				antidote1[0] = pairs[0][0] + rowDist;
				antidote1[1] = pairs[0][1] + colDist;
				antidote2[0] = pairs[1][0] - rowDist;
				antidote2[1] = pairs[1][1] - colDist;
			} else {
				// x x
				// A x
				antidote1[0] = pairs[0][0] + rowDist;
				antidote1[1] = pairs[0][1] - colDist;
				antidote2[0] = pairs[1][0] - rowDist;
				antidote2[1] = pairs[1][1] + colDist;
			}
		} else {
			if (isXBigger) {
				// x A
				// x x
				antidote1[0] = pairs[0][0] - rowDist;
				antidote1[1] = pairs[0][1] + colDist;
				antidote2[0] = pairs[1][0] + rowDist;
				antidote2[1] = pairs[1][1] - colDist;
			} else {
				// A x
				// x x
				antidote1[0] = pairs[0][0] - rowDist;
				antidote1[1] = pairs[0][1] - colDist;
				antidote2[0] = pairs[1][0] + rowDist;
				antidote2[1] = pairs[1][1] + colDist;
			}
		}

		return [antidote1, antidote2];
	};

	const res = new Set<string>();
	for (const antennas of map.values()) {
		for (const antenna of antennas) {
			const others = antennas.filter(
				// filter out antenna itself
				(antenna2) => antenna[0] !== antenna2[0] && antenna[1] !== antenna2[1],
			);
			for (const a of others) {
				const antidotes = getAntidotes([antenna, a]);
				for (const a of antidotes) {
					if (
						a[0] > -1 &&
						a[0] < lines.length &&
						a[1] > -1 &&
						a[1] < lines[0].length
					) {
						res.add(`${a[0]}-${a[1]}`);
					}
				}
			}
		}
	}

	return res.size;
};
