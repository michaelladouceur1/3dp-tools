import { iStorageService, iFSOptions, iFSSaveData } from "../../shared/types/storage";
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

	async function saveData(data: any, options: iFSSaveData) {
		return await storageModule.saveData(data, options);
	}

	return { getData, saveData };
}
