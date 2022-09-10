import { readFile, writeFile } from "fs/promises";
import { existsSync } from "fs";

export function fileExists(path: string) {
	try {
		return existsSync(path);
	} catch (error) {
		console.log(error);
	}
}

export async function getData(path: string) {
	try {
		const data = await readFile(path, { encoding: "utf8" });
		return JSON.parse(data);
	} catch (error) {
		console.log(error);
	}
}

export async function writeData(path: string, data: any) {
	try {
		await writeFile(path, JSON.stringify(data), { encoding: "utf8", flag: "w" });
	} catch (error) {
		console.log(error);
	}
}
