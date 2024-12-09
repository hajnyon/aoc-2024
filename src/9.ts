export default (lines: string[]) => {
	const disk = lines[0].split("");

	const diskData: number[] = [];
	let fileIndex = 0;
	for (const [index, element] of disk.entries()) {
		const num = Number.parseInt(element);
		if (index % 2 === 0) {
			// file
			diskData.push(...Array(num).fill(fileIndex));
			fileIndex++;
		} else {
			// free space
			diskData.push(...Array(num).fill(null));
		}
	}

	let startIndex = 0;
	let endIndex = diskData.length - 1;
	while (startIndex < endIndex) {
		if (diskData[startIndex] !== null) {
			startIndex++;
			continue;
		}
		if (diskData[endIndex] === null) {
			endIndex--;
			continue;
		}

		// switch two
		const temp = diskData[startIndex];
		diskData[startIndex] = diskData[endIndex];
		diskData[endIndex] = temp;
		startIndex++;
		endIndex--;
	}

	return diskData.reduce((acc, cur, index) => acc + cur * index, 0);
};
