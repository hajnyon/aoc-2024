export default (lines: string[]) => {
	const COLS = 101;
	const ROWS = 103;
	const SECS = 10000;

	for (let sec = 0; sec <= SECS; sec++) {
		const map: number[][] = Array.from({ length: ROWS }, () =>
			new Array(COLS).fill(0),
		);
		for (const line of lines) {
			const lineMatch = line.match(/p=(\d+)\,(\d+)\sv=(-?\d+),(-?\d+)/);
			const pX = Number(lineMatch?.[1]);
			const pY = Number(lineMatch?.[2]);
			let vX = Number(lineMatch?.[3]);
			// transform velocity to positive value
			if (vX < 0) {
				vX = vX + COLS;
			}
			let vY = Number(lineMatch?.[4]);
			if (vY < 0) {
				vY = vY + ROWS;
			}
			const posX = (vX * sec + pX) % COLS;
			const posY = (vY * sec + pY) % ROWS;

			map[posY][posX] = map[posY][posX] + 1;
		}

		const l = map.map((r) => r.map((c) => (c > 0 ? "#" : ".")).join(""));
		if (l.some((row) => row.includes("######"))) {
			console.log(sec, "\n", l.join("\n"));
		}
	}

	return 0;
};
