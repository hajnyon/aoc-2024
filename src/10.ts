export default (lines: string[]) => {
	const zeroArray = new Array(lines[0].length + 2).fill(0);
	const map = [
		zeroArray,
		...lines.map((line) => [
			0,
			...line.split("").map((char) => Number(char)),
			0,
		]),
		zeroArray,
	];

	let result = 0;

	const bfs = (r: number, c: number) => {
		let position = map[r][c];
		const visited = new Set<string>();

		visited.add(`${r},${c}`);
		const queue = [{ row: r, col: c }];

		while (queue.length > 0) {
			const { row, col } = queue.shift();

			position = map[row]?.[col];
			for (const [i, j] of [
				[0, 1],
				[0, -1],
				[1, 0],
				[-1, 0],
			]) {
				const neighbor = map[row + i]?.[col + j];
				const neighborPos = `${row + i},${col + j}`;
				if (visited.has(neighborPos)) {
					continue;
				}
				if (neighbor - 1 === position) {
					queue.push({ row: row + i, col: col + j });
					visited.add(neighborPos);
					if (neighbor === 9) {
						result++;
					}
				}
			}
		}
	};

	for (let row = 1; row < map.length - 1; row++) {
		for (let col = 1; col < map[row].length - 1; col++) {
			if (map[row][col] === 0) {
				bfs(row, col);
			}
		}
	}

	return result;
};
