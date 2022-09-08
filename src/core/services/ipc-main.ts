import { ipcMain } from "electron";
import { ipcChannels } from "../../shared/ipc-channels";

function initializeSettingsIPC() {
	ipcMain.handle(ipcChannels.settings.update, async (_: any, field: "string", value: any) => {});
}

export function initializeIPCMain() {}
