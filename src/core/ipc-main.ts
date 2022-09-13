import { ipcMain } from "electron";
import { ipcChannels } from "../shared/ipc-channels";
import { iSettingsService, iSettings } from "../shared/types/settings";

function initializeSettingsIPC(window: any, settings: iSettingsService) {
	const settingsData = (data: iSettings) => {
		window.webContents.send(ipcChannels.settings.data, data);
	};

	ipcMain.handle(ipcChannels.settings.get, async (_: any) => {
		return await settings.getSettings();
	});

	ipcMain.handle(ipcChannels.settings.update, async (_: any, data: iSettings) => {
		const response = await settings.updateSettings(data);
		settingsData(response);
	});

	ipcMain.handle(ipcChannels.settings.update_field, async <T extends keyof iSettings>(_: any, field: T, value: iSettings[T]["value"]) => {
		const response = await settings.updateSettingsField(field, value);
		settingsData(response);
	});
}

export function initialize(window: any, services: any) {
	initializeSettingsIPC(window, services.settings);
}
