export default (lines: string[]) => {
	let stones = lines.map((line) =>
		line.split(" ").map((char) => Number(char)),
	)[0];

	let blinkCount = 25;
	while (blinkCount > 0) {
		const newStones: number[] = [];
		for (let i = 0; i < stones.length; i++) {
			const stone = stones[i];
			const stoneStr = stone.toString();
			if (stone === 0) {
				newStones.push(1);
				continue;
			}
			if (stoneStr.length % 2 === 0) {
				const split1 = stoneStr.slice(0, stoneStr.length / 2);
				const split2 = stoneStr.slice(stoneStr.length / 2);
				newStones.push(Number(split1));
				newStones.push(Number(split2));
				continue;
			}
			newStones.push(stone * 2024);
		}
		stones = [...newStones];
		blinkCount--;
	}

	const result = stones.length;

	return result;
};
