import { iStorageService, iFSOptions, iFSUpdateData } from "../../shared/types/storage";
import { fileStorage } from "../../lib/file-storage";

interface iStorageTypes {
	file: iFSOptions;
}

export function storage<T extends keyof iStorageTypes>(storageType: T, options: iStorageTypes[T]): iStorageService {
	const storageModules = { file: fileStorage(options) };
	const storageModule = storageModules[storageType];

	async function getState() {
		return await storageModule.getState();
	}

	async function setState(data: any, options: iFSUpdateData) {
		return await storageModule.setState(data, options);
	}

	async function setStateField(field: any, value: any) {
		return await storageModule.setStateField(field, value);
	}

	async function createStore(data: any) {
		return await storageModule.createStore(data);
	}

	async function destroyStore() {
		return await storageModule.destroyStore();
	}

	return { getState, setState, setStateField, createStore, destroyStore };
}
