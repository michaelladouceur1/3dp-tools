import { ipcRenderer } from "electron";
import { ipcChannels } from "../src/shared/ipc-channels";
import { iSettings } from "../src/shared/types/settings";

declare const window: any;

window.api = {
	system: {
		download: async (downloadUrl: string, target?: "plugins") => {
			ipcRenderer.send(ipcChannels.system.download, downloadUrl, target);
		},
	},
	settings: {
		onSettingsData: (callback: Function) => {
			ipcRenderer.on("settings-data", async (_: any, data: any) => {
				await callback(data);
			});
		},
		getSettings: async () => {
			return await ipcRenderer.invoke(ipcChannels.settings.get);
		},
		saveSettings: async (settings: iSettings) => {
			await ipcRenderer.invoke(ipcChannels.settings.update, settings);
		},
		updateSettingsField: async <T extends keyof iSettings>(field: T, value: iSettings[T]["value"]) => {
			await ipcRenderer.invoke(ipcChannels.settings.update_field, field, value);
		},
	},
};
