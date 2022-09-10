import { iSettingsService, iSettings } from "../../shared/types/settings";
import { iStorageService } from "../../shared/types/storage";

export function settings(storage: iStorageService): iSettingsService {
	async function getSettings(): Promise<iSettings> {
		return await storage.getData();
	}

	async function updateSettings(settings: iSettings) {
		await storage.updateData(settings, { type: "ow" });
	}

	async function updateSettingsField<T extends keyof iSettings>(field: T, value: iSettings[T]["value"]) {
		await storage.updateDataField(field, value);
	}

	return { getSettings, updateSettings, updateSettingsField };
}
