import * as config from "./services/config";
import * as ipcMain from "./services/ipc-main";

export async function start(window: any) {
	config.initialize();

	// initialize services?

	// initialize ipcMain
	ipcMain.initialize(window);

	// load environment?

	// download/load plugins
}
