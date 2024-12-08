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

	const isOutOfBounds = ([row, col]: number[]) => {
		return (
			(row < 0 || row >= lines.length) && (col < 0 || col >= lines[0].length)
		);
	};

	const getAntidotes = (pairs: [number, number][]) => {
		console.log("🚀 ~ getAntidotes ~ pairs:", pairs);
		const rowDist = Math.abs(pairs[0][0] - pairs[1][0]);
		const colDist = Math.abs(pairs[0][1] - pairs[1][1]);

		const antidotes: [number, number][] = [];

		const isYBigger = pairs[0][0] > pairs[1][0];
		const isXBigger = pairs[0][1] > pairs[1][1];

		if (isYBigger) {
			if (isXBigger) {
				// x x
				// x A
				let A = [...pairs[0]];
				let B = [...pairs[1]];
				while (true) {
					const a: [number, number] = [A[0] + rowDist, A[1] + colDist];
					const b: [number, number] = [B[0] - rowDist, B[1] - colDist];
					antidotes.push(a);
					antidotes.push(b);
					A = [...a];
					B = [...b];
					if (isOutOfBounds(A) && isOutOfBounds(B)) {
						break;
					}
				}
			} else {
				// x x
				// A x
				let A = [...pairs[0]];
				let B = [...pairs[1]];
				while (true) {
					const a: [number, number] = [A[0] + rowDist, A[1] - colDist];
					const b: [number, number] = [B[0] - rowDist, B[1] + colDist];
					antidotes.push(a);
					antidotes.push(b);
					A = [...a];
					B = [...b];

					if (isOutOfBounds(A) && isOutOfBounds(B)) {
						break;
					}
				}
			}
		} else {
			if (isXBigger) {
				// x A
				// x x
				let A = [...pairs[0]];
				let B = [...pairs[1]];
				while (true) {
					const a: [number, number] = [A[0] - rowDist, A[1] + colDist];
					const b: [number, number] = [B[0] + rowDist, B[1] - colDist];
					antidotes.push(a);
					antidotes.push(b);
					A = [...a];
					B = [...b];

					if (isOutOfBounds(A) && isOutOfBounds(B)) {
						break;
					}
				}
			} else {
				// A x
				// x x
				let A = [...pairs[0]];
				let B = [...pairs[1]];
				while (true) {
					const a: [number, number] = [A[0] - rowDist, A[1] - colDist];
					const b: [number, number] = [B[0] + rowDist, B[1] + colDist];
					antidotes.push(a);
					antidotes.push(b);
					A = [...a];
					B = [...b];

					if (isOutOfBounds(A) && isOutOfBounds(B)) {
						break;
					}
				}
			}
		}

		return antidotes;
	};

	const res = new Set<string>();
	for (const antennas of map.values()) {
		for (const antenna of antennas) {
			const others = antennas.filter(
				// filter out antenna itself
				(antenna2) => antenna[0] !== antenna2[0] && antenna[1] !== antenna2[1],
			);
			// add antenna itself to antidotes
			res.add(`${antenna[0]}-${antenna[1]}`);
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
