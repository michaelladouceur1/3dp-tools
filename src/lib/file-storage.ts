import { mkdir, readFile, writeFile, rm } from "fs/promises";

import { iStorageService, iFSOptions, iFSUpdateData } from "../shared/types/storage";

export function fileStorage({ path, encoding = "utf8", saveDelay = 3000 }: iFSOptions): iStorageService {
	let state: any;
	let fileStorageTimeout: any;
	initState();

	if (path === "") {
		throw new Error('fileStorage option: "path" can not be an empty string');
	}

	async function getState() {
		return state;
	}

	async function setState(data: any, options: iFSUpdateData) {
		state = data;
		updateDiskState(state, options);
		return state;
	}

	async function setStateField(fields: string, value: any) {
		state = reduceData(state, fields, value);
		updateDiskState(state, { type: "ow" });
		return state;
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

	async function initState() {
		state = await getDiskState();
	}

	async function getDiskState() {
		try {
			const data = await readFile(path, { encoding: encoding });
			return JSON.parse(data);
		} catch (error) {
			console.log(error);
		}
	}

	async function updateDiskState(data: any, options: iFSUpdateData) {
		if (fileStorageTimeout) {
			clearTimeout(fileStorageTimeout);
		}

		const { type } = options;

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

	return { getState, setState, setStateField, createStore, destroyStore };
}
