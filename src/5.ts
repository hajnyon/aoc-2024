const dfs = (
	visited: Set<number>,
	node: number,
	adjacencyList: Map<number, number[]>,
	stack: number[],
) => {
	visited.add(node);

	for (const neighbor of adjacencyList.get(node) ?? []) {
		if (!visited.has(neighbor)) {
			dfs(visited, neighbor, adjacencyList, stack);
		}
	}

	stack.push(node);
};

const topoSort = (
	nodes: number[],
	rules: { a: number; b: number }[],
): number[] => {
	const adjacencyList: Map<number, number[]> = new Map();
	for (const rule of rules) {
		if (!adjacencyList.has(rule.a)) {
			adjacencyList.set(rule.a, []);
		}
		adjacencyList.get(rule.a)?.push(rule.b);
	}

	const stack = [];
	const visited = new Set<number>();

	for (const node of nodes) {
		if (!visited.has(node)) {
			dfs(visited, node, adjacencyList, stack);
		}
	}

	return stack;
};

export default (lines: string[]) => {
	const separatorIndex = lines.findIndex((line) => line === "");
	const rules = lines.slice(0, separatorIndex).map((line) => {
		const parts = line.split("|");
		return {
			a: Number(parts[0]),
			b: Number(parts[1]),
		};
	});
	const updates = lines.slice(separatorIndex + 1);

	let result = 0;

	for (const update of updates) {
		const page = update.split(",").map((part) => Number(part));
		let isCorrect = true;
		const usedRules: { a: number; b: number }[] = [];
		for (const rule of rules) {
			const ruleAPos = page.findIndex((val) => val === rule.a);
			const ruleBPos = page.findIndex((val) => val === rule.b);
			if (ruleAPos === -1 || ruleBPos === -1) {
				continue;
			}
			usedRules.push(rule);
			if (ruleAPos > ruleBPos) {
				isCorrect = false;
			}
		}
		if (!isCorrect) {
			const sorted = topoSort(page, usedRules);
			result += sorted[Math.ceil((sorted.length - 1) / 2)];
		}
	}

	return result;
};
