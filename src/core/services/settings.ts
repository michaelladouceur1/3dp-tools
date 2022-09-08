import { iSettingsService, iSettings } from "../../shared/types/settings";
import { iStorageService } from "../../shared/types/storage";

export function settings(storage: iStorageService): iSettingsService {
	async function getSettings() {
		return await storage.getData();
	}

	async function saveSettings(settings: iSettings) {
		await storage.saveData(settings, { type: "ow" });
	}

	return { getSettings, saveSettings };
}
