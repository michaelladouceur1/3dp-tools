import { mkdir, readFile, writeFile, rm } from "fs/promises";

import { iStorageService, iFSOptions, iFSUpdateData } from "../shared/types/storage";

export function fileStorage({ path, encoding = "utf8" }: iFSOptions): iStorageService {
	if (path === "") {
		throw new Error('fileStorage option: "path" can not be an empty string');
	}

	async function getData() {
		try {
			const data = await readFile(path, { encoding: encoding });
			return JSON.parse(data);
		} catch (error) {
			console.log(error);
		}
	}

	async function updateData(data: any, options: iFSUpdateData) {
		const { type } = options;

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

	async function updateDataField(field: any, value: any) {
		try {
			const data = await getData();

			if (data[field] === undefined) {
				throw new Error(`updateDataField: data field "${field}" does not exist`);
			}

			await updateData({ ...data, [field]: value }, { type: "ow" });
		} catch (error) {
			console.log(error);
		}
	}

	async function createStore(data: any) {
		data ? await updateData(data, { type: "now" }) : await updateData("", { type: "now" });
	}

	async function destroyStore() {
		try {
			await rm(path);
		} catch (error) {
			console.log(error);
		}
	}

	return { getData, updateData, updateDataField, createStore, destroyStore };
}
