import { mkdir, readFile, writeFile } from "fs/promises";

import { iStorageService, iFSOptions, iFSSaveData } from "../shared/types/storage";

export function fileStorage({ path, encoding = "utf8" }: iFSOptions): iStorageService {
	async function getData() {
		try {
			return await readFile(path, { encoding: encoding });
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
			await writeFile(path, JSON.stringify(data), { encoding: encoding, flag: flags[type] });
		} catch (error: any) {
			if (error.code !== "EEXIST") {
				console.log(error);
			}
		}
	}

	return { getData, saveData };
}
