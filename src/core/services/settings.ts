import { iSettingsService, iSettings, iSettingsMutableFields } from "../../shared/types/settings";
import { iStorageService } from "../../shared/types/storage";

export function settings(storage: iStorageService): iSettingsService {
	function store() {
		return storage;
	}

	async function getSettings(): Promise<iSettings> {
		return await storage.getState();
	}

	// TODO: Update function to take iFSSetState options in order to allow for saving immediately or create new function specifically for saving state to disk immediately
	async function updateSettings(settings: iSettings): Promise<iSettings> {
		const { autoSave, autoSaveDelay } = await getSettings();
		await storage.setState(settings, { type: "ow", save: autoSave.value, saveDelay: autoSaveDelay.value });
		return await getSettings();
	}

	// TODO: add callback object for performing actions after settings field update
	// TODO: add default values for autoSave and autoSaveDelay
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
	async function updateSettingsField<T extends keyof iSettingsMutableFields>(field: T, value: iSettingsMutableFields[T]): Promise<iSettings> {
		const { autoSave, autoSaveDelay } = await getSettings();
		await storage.setStateField(field, value, { type: "ow", save: autoSave.value, saveDelay: autoSaveDelay.value });
		return await getSettings();
	}

	return { store, getSettings, updateSettings, updateSettingsField };
}
