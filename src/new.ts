import { copyFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const main = async () => {
	const dayNumber = Number.parseInt(process.argv[2]);
	await copyFile(
		join(__dirname, "./template.ts"),
		join(__dirname, `${dayNumber}.ts`),
	);
	await writeFile(join(__dirname, `../data/${dayNumber}.txt`), "");
	await writeFile(join(__dirname, `../data/${dayNumber}-base.txt`), "");
};

main().catch(console.error);
