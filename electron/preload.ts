import { ipcRenderer } from "electron";
import { ipcChannels } from "../src/shared/ipc-channels";
import { iSettings } from "../src/shared/types/settings";

declare const window: any;

window.api = {
	settings: {
		getSettings: async () => {
			return await ipcRenderer.invoke(ipcChannels.settings.get);
		},
		saveSettings: async (settings: iSettings) => {
			await ipcRenderer.invoke(ipcChannels.settings.update, settings);
		},
	},
};
