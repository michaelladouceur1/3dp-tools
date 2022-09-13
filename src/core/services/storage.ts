import { iStorageService, iFSOptions, iFSSetState } from "../../shared/types/storage";
import { fileStorage } from "../../lib/file-storage";

interface iStorageTypes {
	file: iFSOptions;
}

export function storage<T extends keyof iStorageTypes>(storageType: T, options: iStorageTypes[T]): iStorageService {
	const storageModules = { file: fileStorage(options) };
	const storageModule = storageModules[storageType];

	async function createStore(data: any) {
		return await storageModule.createStore(data);
	}

	async function destroyStore() {
		return await storageModule.destroyStore();
	}

	async function getState() {
		return await storageModule.getState();
	}

	async function setState(data: any, options: iFSSetState) {
		return await storageModule.setState(data, options);
	}

	async function setStateField(field: any, value: any, options: iFSSetState) {
		return await storageModule.setStateField(field, value, options);
	}

	async function setSavedState(data: any, options: iFSSetState) {
		return await storageModule.setSavedState(data, options);
	}

	return { createStore, destroyStore, getState, setState, setStateField, setSavedState };
}
