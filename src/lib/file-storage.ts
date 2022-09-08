import { mkdir, readFile, writeFile } from "fs/promises";

import { iFS, iFSOptions, iFSSaveData } from "../shared/types/file-storage";

export function fileStorage({ path }: iFSOptions): iFS {
	async function getData() {
		try {
			return await readFile(path, { encoding: "utf8" });
		} catch (error) {
			console.log(error);
		}
	}

	async function saveData(data: any, { type = "ow" }: iFSSaveData) {
		const flags = {
			ow: "w",
			now: "wx",
		};

		try {
			await writeFile(path, JSON.stringify(data), { encoding: "utf8", flag: flags[type] });
		} catch (error: any) {
			if (error.code !== "EEXIST") {
				console.log(error);
			}
		}
	}

	return { getData, saveData };
}
