import { iStorageService, iFSOptions, iFSUpdateData } from "../../shared/types/storage";
import { fileStorage } from "../../lib/file-storage";

interface iStorageTypes {
	file: iFSOptions;
}

export function storage<T extends keyof iStorageTypes>(storageType: T, options: iStorageTypes[T]): iStorageService {
	const storageModules = { file: fileStorage(options) };
	const storageModule = storageModules[storageType];

	async function getData() {
		return await storageModule.getData();
	}

	async function updateData(data: any, options: iFSUpdateData) {
		return await storageModule.updateData(data, options);
	}

	async function updateDataField(field: any, value: any) {
		return await storageModule.updateDataField(field, value);
	}

	async function createStore(data: any) {
		return await storageModule.createStore(data);
	}

	async function destroyStore() {
		return await storageModule.destroyStore();
	}

	return { getData, updateData, updateDataField, createStore, destroyStore };
}
