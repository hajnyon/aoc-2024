import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const main = async () => {
	const dayRaw = process.argv[2];
	const isBase = process.argv[3] === "b";
	const day = Number.parseInt(dayRaw);
	if (Number.isNaN(day)) {
		throw new Error(`Invalid day: ${dayRaw}`);
	}
	const input = await readFile(
		join(__dirname, "../data", `${day}${isBase ? "-base" : ""}.txt`),
		"utf-8",
	);
	const lines = input.split("\n");

	const solve = await import(join(__dirname, "../src", `${day}.ts`));
	console.log(solve.default(lines));
};

main().catch(console.error);
