import { ipcMain } from "electron";

import { defaults } from "../../shared/defaults";
import { ipcChannels } from "../../shared/ipc-channels";
import { storage } from "./storage";

import * as settingsModule from "./settings";
import { iSettings } from "../../shared/types/settings";

function initializeSettingsIPC() {
	const settingsStore = storage("file", { path: defaults.paths.settings });
	const settings = settingsModule.settings(settingsStore);

	ipcMain.handle(ipcChannels.settings.get, async (_: any) => {
		return await settings.getSettings();
	});

	ipcMain.handle(ipcChannels.settings.save, async (_: any, data: iSettings) => {
		await settings.updateSettings(data);
	});
}

export function initialize() {
	initializeSettingsIPC();
}
