import * as config from "./services/config";
import * as ipcMain from "./services/ipc-main";

export async function start() {
	config.initialize();
	ipcMain.initialize();

	// load environment

	// download/load plugins
}
