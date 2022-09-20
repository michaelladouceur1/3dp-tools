import * as path from "path";

import * as config from "./config";
import * as srvcs from "./services";
import * as ipcMain from "./ipc-main";
import * as plugs from "./services/plugins";

export async function start(window: any) {
	config.initialize();
	const services = srvcs.initialize();
	// services.plugins.loader(path.join("/", "home", "michael", "Documents", "Coding", "Projects", "3dp-tools-plugins"));
	ipcMain.initialize(window, services);
}
