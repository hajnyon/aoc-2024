export default (lines: string[]) => {
	let stones = new Map<bigint, bigint>();
	for (const char of lines[0].split(" ")) {
		stones.set(BigInt(char), 1n);
	}

	let blinkCount = 75;
	while (blinkCount > 0) {
		const newStones = new Map<bigint, bigint>();
		for (const [stone, count] of stones.entries()) {
			const stoneStr = stone.toString();
			if (stone === 0n) {
				newStones.set(1n, (newStones.get(1n) ?? 0n) + count);
			} else if (stoneStr.length % 2 === 0) {
				const split1 = BigInt(stoneStr.slice(0, stoneStr.length / 2));
				const split2 = BigInt(stoneStr.slice(stoneStr.length / 2));
				newStones.set(split1, (newStones.get(split1) ?? 0n) + count);
				newStones.set(split2, (newStones.get(split2) ?? 0n) + count);
			} else {
				const newStone = BigInt(stone * 2024n);
				newStones.set(newStone, (newStones.get(newStone) ?? 0n) + count);
			}
		}
		stones = newStones;
		blinkCount--;
	}

	const result = [...stones.values()].reduce((a, b) => a + b, 0n);

	return result;
};
