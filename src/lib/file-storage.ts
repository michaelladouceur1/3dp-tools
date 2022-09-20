import { mkdir, readFile, writeFile, rm } from "fs/promises";

import { iStorageSaveService, iFSOptions, iFSSetState } from "../shared/types/storage";

// TODO: Add event listener to inform app of state change
// fileStorage can take in a state change event (ie: ipcChannels.settings.data => 'settings.data')
// When the state changes in file-storage or storage, the event is triggered
export function fileStorage({ path, encoding = "utf8" }: iFSOptions): iStorageSaveService {
	if (path === "") {
		throw new Error('fileStorage option: "path" can not be an empty string');
	}

	let fileStorageTimeout: any;

	async function createStore(data: any) {
		data ? await setSavedState(data, { type: "now", saveDelay: 0 }) : await setSavedState("", { type: "now", saveDelay: 0 });
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
				return;
			}

			fileStorageTimeout = setTimeout(async () => {
				await writeFile(path, JSON.stringify(data), { encoding: encoding, flag: flags[type] });
				fileStorageTimeout = undefined;
			}, saveDelay);
		} catch (error: any) {
			if (error.code !== "EEXIST") {
				console.log(error);
			}
		}
	}

	return { createStore, destroyStore, getSavedState, setSavedState };
}
