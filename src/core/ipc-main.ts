import { BrowserWindow, ipcMain } from "electron";
import * as path from "path";

import { ipcChannels } from "../shared/ipc-channels";
import { defaults } from "../shared/defaults";
import { unzip } from "./utils";
import { iInfoService } from "../shared/types/info";
import { iSettingsService, iSettings, iSettingsMutableFields } from "../shared/types/settings";

function initializeSystemIPC(window: BrowserWindow) {
	ipcMain.on(ipcChannels.system.download, async (_: any, downloadUrl: string, target?: "plugins") => {
		window.webContents.downloadURL(downloadUrl);
		window.webContents.session.on("will-download", (_: any, item, webContents) => {
			if (target) {
				const paths = {
					plugins: defaults.paths.pluginsDir,
				};

				item.setSavePath(path.join(paths[target], item.getFilename()));
			}

			item.on("updated", (_: any, state) => {
				if (state === "interrupted") {
					console.log("Download was interrupted");
				} else if (state === "progressing") {
					if (!item.isPaused()) {
						console.log("Downloading...");
					} else {
						console.log("Download paused");
					}
				}
			});

			item.once("done", (_: any, state) => {
				if (state === "completed") {
					console.log("Download complete");

					unzip(item.getSavePath());
				} else {
					console.log("Download failed");
				}
			});
		});
	});
}

function initializeInfoIPC(window: BrowserWindow, info: iInfoService) {
	const infoStateEmitter = info.getStateEmitter();

	infoStateEmitter.on(ipcChannels.info.data, (data: any) => {
		window.webContents.send(ipcChannels.info.data, data);
	});
}

function initializeSettingsIPC(window: BrowserWindow, settings: iSettingsService) {
	const settingsStateEmitter = settings.store().getStateEmitter();

	settingsStateEmitter.on(ipcChannels.settings.data, (data: any) => {
		window.webContents.send(ipcChannels.settings.data, data);
	});

	ipcMain.handle(ipcChannels.settings.get, async (_: any) => {
		return await settings.getSettings();
	});

	ipcMain.handle(ipcChannels.settings.update, async (_: any, data: iSettings) => {
		return await settings.updateSettings(data);
	});

	ipcMain.handle(ipcChannels.settings.update_field, async <T extends keyof iSettingsMutableFields>(_: any, field: T, value: iSettingsMutableFields[T]) => {
		return await settings.updateSettingsField(field, value);
	});
}

export function initialize(window: BrowserWindow, services: any) {
	initializeSystemIPC(window);
	initializeInfoIPC(window, services.info);
	initializeSettingsIPC(window, services.settings);
}
