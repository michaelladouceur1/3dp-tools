import { mkdir, readFile, writeFile, rm } from "fs/promises";

import { iInfoService } from "../shared/types/info";
import { iStorageSaveService, iFSOptions, iFSSetState } from "../shared/types/storage";

// fileStorage can take in a state change event (ie: ipcChannels.settings.data => 'settings.data')
// When the state changes in file-storage or storage, the event is triggered
export function fileStorage(infoService: iInfoService, { path, encoding = "utf8" }: iFSOptions): iStorageSaveService {
	if (path === "") {
		throw new Error('fileStorage option: "path" can not be an empty string');
	}

	let fileStorageTimeout: any;

	async function createStore(data: any) {
		data ? await setSavedState(data, { type: "ow", saveDelay: 0 }) : await setSavedState("", { type: "now", saveDelay: 0 });
	}

	async function destroyStore() {
		try {
			await rm(path);
		} catch (error) {
			console.log(error);
		}
	}

	async function getSavedState() {
		try {
			const data = await readFile(path, { encoding: encoding });
			return JSON.parse(data);
		} catch (error) {
			console.log(error);
		}
	}

	async function setSavedState(data: any, { type, saveDelay = 0 }: iFSSetState) {
		if (fileStorageTimeout) {
			clearTimeout(fileStorageTimeout);
		}

		const flags = {
			ow: "w",
			now: "wx",
		};

		try {
			if (saveDelay === 0) {
				await writeFile(path, JSON.stringify(data), { encoding: encoding, flag: flags[type] });
				fileStorageTimeout = undefined;
				infoService.info({ message: "Data Saved", details: `Data saved to path: ${path}` });
				return;
			}

			fileStorageTimeout = setTimeout(async () => {
				await writeFile(path, JSON.stringify(data), { encoding: encoding, flag: flags[type] });
				fileStorageTimeout = undefined;
				infoService.info({ message: "Data Saved", details: `Data saved to path: ${path}` });
			}, saveDelay);
		} catch (error: any) {
			if (error.code !== "EEXIST") {
				console.log(error);
				infoService.error({ message: "Data Save Error", details: error });
			}
		}
	}

	return { createStore, destroyStore, getSavedState, setSavedState };
}
