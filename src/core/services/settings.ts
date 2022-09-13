import { iSettingsService, iSettings } from "../../shared/types/settings";
import { iStorageService } from "../../shared/types/storage";

export function settings(storage: iStorageService): iSettingsService {
	async function getSettings(): Promise<iSettings> {
		return await storage.getState();
	}

	async function updateSettings(settings: iSettings): Promise<iSettings> {
		const { autoSave, autoSaveDelay } = await getSettings();
		await storage.setState(settings, { type: "ow", save: autoSave.value, saveDelay: autoSaveDelay.value });
		return await getSettings();
	}

	// TODO: add callback object for performing actions after settings field update
	/*
		Example:
		settingsActions = {
			autoUpdate: (value: boolean) => {
				if(value) {
					check for plugin updates
				}
			},
			...
		}
	*/
	async function updateSettingsField<T extends keyof iSettings>(field: T, value: iSettings[T]["value"]): Promise<iSettings> {
		const { autoSave, autoSaveDelay } = await getSettings();
		await storage.setStateField(field, value, { type: "ow", save: autoSave.value, saveDelay: autoSaveDelay.value });
		return await getSettings();
	}

	return { getSettings, updateSettings, updateSettingsField };
}
