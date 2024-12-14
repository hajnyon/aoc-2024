export default (lines: string[]) => {
	const COLS = 101;
	const ROWS = 103;
	const SECS = 100;
	const colsMiddle = Math.ceil((COLS - 1) / 2);
	const rowsMiddle = Math.ceil((ROWS - 1) / 2);
	const quadrants = {
		topLeft: 0,
		topRight: 0,
		bottomLeft: 0,
		bottomRight: 0,
	};

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
		const posX = (vX * SECS + pX) % COLS;
		const posY = (vY * SECS + pY) % ROWS;

		if (posX < colsMiddle && posY < rowsMiddle) {
			quadrants.topLeft++;
		}
		if (posX < colsMiddle && posY > rowsMiddle) {
			quadrants.bottomLeft++;
		}
		if (posX > colsMiddle && posY < rowsMiddle) {
			quadrants.topRight++;
		}
		if (posX > colsMiddle && posY > rowsMiddle) {
			quadrants.bottomRight++;
		}
	}

	const result =
		quadrants.topLeft *
		quadrants.topRight *
		quadrants.bottomLeft *
		quadrants.bottomRight;

	return result;
};
