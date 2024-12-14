export default (lines: string[]) => {
	let result = 0;

	let lineIndex = 0;
	while (true) {
		const buttonA = lines[lineIndex++].match(
			/Button\sA:\sX\+(\d+)\,\sY\+(\d+)/,
		);
		const buttonB = lines[lineIndex++].match(
			/Button\sB:\sX\+(\d+)\,\sY\+(\d+)/,
		);
		const prize = lines[lineIndex++].match(/Prize:\sX=(\d+)\,\sY=(\d+)/);

		const A_X = Number(buttonA?.[1]);
		const A_Y = Number(buttonA?.[2]);
		const B_X = Number(buttonB?.[1]);
		const B_Y = Number(buttonB?.[2]);
		const P_X = Number(prize?.[1]) + 10_000_000_000_000;
		const P_Y = Number(prize?.[2]) + 10_000_000_000_000;

		// https://cs.wikipedia.org/wiki/Cramerovo_pravidlo
		const ACount = (P_X * B_Y - P_Y * B_X) / (A_X * B_Y - A_Y * B_X);
		const BCount = (A_X * P_Y - A_Y * P_X) / (A_X * B_Y - A_Y * B_X);

		if (ACount % 1 === 0 && BCount % 1 === 0) {
			result += ACount * 3 + BCount * 1;
		}

		lineIndex++;
		if (lines[lineIndex] === undefined) {
			break;
		}
	}

	return result;
};
