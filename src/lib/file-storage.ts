import { mkdir, readFile, writeFile, rm } from "fs/promises";

import { iStorageService, iFSOptions, iFSSetState } from "../shared/types/storage";

// TODO: Add event listener to inform app of state change
// fileStorage can take in a state change event (ie: ipcChannels.settings.data => 'settings.data')
// When the state changes in file-storage or storage, the event is triggered
export function fileStorage({ path, encoding = "utf8" }: iFSOptions): iStorageService {
	if (path === "") {
		throw new Error('fileStorage option: "path" can not be an empty string');
	}

	let state: any;
	let fileStorageTimeout: any;
	initState();

	async function initState() {
		state = await getSavedState();
	}

	async function createStore(data: any) {
		data ? await setState(data, { type: "now" }) : await setState("", { type: "now" });
	}

	async function destroyStore() {
		try {
			await rm(path);
		} catch (error) {
			console.log(error);
		}
	}

	async function getState() {
		return state;
	}

	async function setState(data: any, { type, save = true, saveDelay = 3000 }: iFSSetState) {
		state = data;
		if (save) {
			setSavedState(state, { type: type, saveDelay: saveDelay });
		}
		return state;
	}

	async function setStateField(fields: string, value: any, { type, save = true, saveDelay = 3000 }: iFSSetState) {
		state = reduceData(state, fields, value);
		if (save) {
			setSavedState(state, { type: type, saveDelay: saveDelay });
		}
		return state;
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

	async function getSavedState() {
		try {
			const data = await readFile(path, { encoding: encoding });
			return JSON.parse(data);
		} catch (error) {
			console.log(error);
		}
	}

	// Function for updating values of nested objects
	// "fields" value is passed as a string that can represent object dot notation (ie: autoUpdatePlugins.value)
	//
	// TODO: Check if the field exists before updating
	function reduceData(data: any, fields: any, value: any) {
		const fieldsArr = fields.split(".");

		if (fieldsArr.length === 1) return { ...data, [fieldsArr[0]]: value };

		const leftReduced = fieldsArr.reduce(
			(acc: any, cv: any, idx: number, arr: any) => {
				if (idx === arr.length - 1) return [...acc[1]];
				return [acc[0][cv], [...acc[1], acc[0][cv]]];
			},
			[data, []]
		);

		const rightReduced = leftReduced.reduceRight((acc: any, cv: any, idx: number, arr: any) => {
			if (idx === arr.length - 1) return { ...cv, [fieldsArr[idx + 1]]: value };
			return { ...cv, [fieldsArr[idx + 1]]: acc };
		}, leftReduced[leftReduced.length - 1]);

		return { ...data, [fieldsArr[0]]: rightReduced };
	}

	return { createStore, destroyStore, getState, setState, setStateField, setSavedState };
}
