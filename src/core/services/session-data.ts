import { iSessionDataService, iSessionData } from "../../shared/types/session-data";
import { iStorageService } from "../../shared/types/storage";
import { iSettingsService } from "../../shared/types/settings";

export function sessionData(storage: iStorageService, settings: iSettingsService): iSessionDataService {
	function store() {
		return storage;
	}

	async function getSessionData(): Promise<iSessionData> {
		return await storage.getState();
	}

	async function updateSessionData(sessionData: iSessionData): Promise<iSessionData> {
		const { autoSave, autoSaveDelay } = await settings.getSettings();
		await storage.setState(sessionData, { type: "ow", save: autoSave.value, saveDelay: autoSaveDelay.value });
		return await getSessionData();
	}

	async function updateSessionDataField<T extends keyof iSessionData>(field: T, value: iSessionData[T]): Promise<iSessionData> {
		const { autoSave, autoSaveDelay } = await settings.getSettings();
		await storage.setStateField(field, value, { type: "ow", save: autoSave.value, saveDelay: autoSaveDelay.value });
		return await getSessionData();
	}

	return { store, getSessionData, updateSessionData, updateSessionDataField };
}
