export default (lines: string[]) => {
	const pos = { row: 0, col: 0 };

	let result = 0;
	for (let i = 0; i < lines.length; i++) {
		for (let j = 0; j < lines[0].length; j++) {
			const maze = lines.map((line, index) => {
				const guard = line.indexOf("^");
				if (guard !== -1) {
					pos.row = index;
					pos.col = guard;
				}
				return line.split("");
			});

			if (maze[i][j] === "#" || maze[i][j] === "^") {
				continue;
			}
			maze[i][j] = "#";

			const visited = new Set<string>();

			//            -1 - up
			// -1 - left   0      1 - right
			// 			   1 - down
			const direction: {
				row: -1 | 0 | 1;
				col: -1 | 0 | 1;
			} = {
				row: -1,
				col: 0,
			};

			const rotateDirection = () => {
				if (direction.row === -1) {
					direction.row = 0;
					direction.col = 1;
				} else if (direction.row === 1) {
					direction.row = 0;
					direction.col = -1;
				} else if (direction.col === -1) {
					direction.col = 0;
					direction.row = -1;
				} else if (direction.col === 1) {
					direction.col = 0;
					direction.row = 1;
				}
			};
			while (true) {
				const str = `${pos.row},${pos.col},${direction.row},${direction.col}`;
				if (visited.has(str)) {
					result++;
					break;
				}
				visited.add(`${pos.row},${pos.col},${direction.row},${direction.col}`);
				// is new pos out of maze?
				if (
					pos.row + direction.row < 0 ||
					pos.row + direction.row >= maze.length ||
					pos.col + direction.col < 0 ||
					pos.col + direction.col >= maze[0].length
				) {
					break;
				}
				while (true) {
					// can move in direction
					const newPos = maze[pos.row + direction.row][pos.col + direction.col];
					if (newPos !== "#") {
						pos.row += direction.row;
						pos.col += direction.col;
						break;
					}
					// rotate
					rotateDirection();
				}
			}
		}
	}
	return result;
};
