import * as config from "./services/config";
import * as ipcMain from "./services/ipc-main";

export async function start(window: any) {
	config.initialize();

	// TODO: initialize services?

	// initialize ipcMain
	ipcMain.initialize(window);

	// TODO: download/load plugins
}
