export default (lines: string[]) => {
	const disk = lines[0].split("");

	const diskData: (number | null)[] = [];
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

	const findFreeSlotIndex = (size: number, maxIndex: number): number | null => {
		let acc = 0;
		let index = 0;
		while (true) {
			if (diskData[index] !== null) {
				index++;
				acc = 0;
				continue;
			}
			acc++;
			if (acc === size && index < maxIndex) {
				return index - size + 1;
			}
			index++;
			if (index >= maxIndex) {
				return null;
			}
		}
	};

	for (let i = diskData.length - 1; i > 0; i--) {
		// skip free slots
		if (diskData[i] === null) {
			continue;
		}

		// buffer all file data
		const buffer: (number | null)[] = [];
		while (true) {
			buffer.push(diskData[i]);
			if (diskData[i - 1] !== buffer[0]) {
				break;
			}
			i--;
		}

		// find the first free slot
		const freeSlotIndex = findFreeSlotIndex(buffer.length, i);
		if (freeSlotIndex === null) {
			continue;
		}

		// switch buffer with free slot
		for (const [index, b] of buffer.entries()) {
			diskData[freeSlotIndex + index] = b;
			diskData[i + index] = null;
		}
	}

	return diskData.reduce(
		(acc, cur, index) => (cur !== null ? acc + cur * index : acc),
		0,
	);
};
