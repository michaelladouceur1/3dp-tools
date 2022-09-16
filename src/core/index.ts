import * as config from "./config";
import * as srvcs from "./services";
import * as ipcMain from "./ipc-main";

export async function start(window: any) {
	config.initialize();
	const services = srvcs.initialize();
	ipcMain.initialize(window, services);

	// TODO: download/load plugins
	services.plugins.load();
}
