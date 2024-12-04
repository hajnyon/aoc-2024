export default (lines: string[]) => {
	const match = (str: string): number => {
		return (str.match(/XMAS/g) || []).length;
	};

	const searchString = (str): number => {
		const reversed = str.split("").reverse().join("");
		return match(str) + match(reversed);
	};

	let result = 0;

	// horizontal
	for (let row = 0; row < lines.length; row++) {
		const str = lines[row];
		result += searchString(str);
	}

	// vertical
	for (let col = 0; col < lines[0].length; col++) {
		const str = lines.map((line) => line[col]).join("");
		result += searchString(str);
	}

	// diagonal
	const diagX = new Map();
	const diagY = new Map();
	for (let row = 0; row < lines.length; row++) {
		for (let col = 0; col < lines.length; col++) {
			const indexX = col - row;
			const indexY = col + row;
			diagX.has(indexX)
				? diagX.get(indexX).push(lines[row][col])
				: diagX.set(indexX, [lines[row][col]]);
			diagY.has(indexY)
				? diagY.get(indexY).push(lines[row][col])
				: diagY.set(indexY, [lines[row][col]]);
		}
	}
	for (const str of diagX.values()) {
		result += searchString(str.join(""));
	}
	for (const str of diagY.values()) {
		result += searchString(str.join(""));
	}

	return result;
};
