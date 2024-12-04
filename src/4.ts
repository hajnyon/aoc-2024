/**
 * Very ugly solution.
 * It transforms the 2d array into diagonals, then matches the SAM/MAS strings,
 * and compares middle coordinates of the matched strings between the two diagonals.
 * Stupid, difficult, not-performant, but it works.
 */

type Data = {
	row: number;
	col: number;
	str: string[];
};

export default (lines: string[]) => {
	const searchString = (data: Data, dir = true): [number, number][] => {
		const str = data.str.join("");
		const r = /(?=(MAS|SAM))./g;

		const results: [number, number][] = [];
		let match: RegExpExecArray | null = null;

		while (true) {
			match = r.exec(str);
			if (match == null) {
				break;
			}
			if (dir) {
				results.push([data.row + match.index + 1, data.col + match.index + 1]);
			} else {
				results.push([data.row + match.index + 1, data.col - match.index - 1]);
			}
		}

		return results;
	};

	let result = 0;

	// diagonal
	const diagX: Map<number, Data> = new Map();
	const diagY: Map<number, Data> = new Map();
	for (let row = 0; row < lines.length; row++) {
		for (let col = 0; col < lines.length; col++) {
			const indexX = col - row;
			const indexY = col + row;
			diagX.has(indexX)
				? diagX.get(indexX)?.str.push(lines[row][col])
				: diagX.set(indexX, { row, col, str: [lines[row][col]] });
			diagY.has(indexY)
				? diagY.get(indexY)?.str.push(lines[row][col])
				: diagY.set(indexY, { row, col, str: [lines[row][col]] });
		}
	}

	let diagXResult: [number, number][] = [];
	for (const val of diagX.values()) {
		diagXResult = [...diagXResult, ...searchString(val)];
	}

	let diagYResult: [number, number][] = [];
	for (const val of diagY.values()) {
		diagYResult = [...diagYResult, ...searchString(val, false)];
	}

	for (const valX of diagXResult) {
		if (
			diagYResult.findIndex((valY) => valX[0] === valY[0] && valX[1] === valY[1]) !== -1
		) {
			result++;
		}
	}

	return result;
};
