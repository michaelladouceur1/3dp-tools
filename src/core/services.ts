import { defaults } from "../shared/defaults";
import { ipcChannels } from "../shared/ipc-channels";

import { storage } from "./services/storage";
import { info } from "./services/info";
import { settings } from "./services/settings";
import { plugins } from "./services/plugins";

export function initialize() {
	// logging and info services
	const infoService = info();

	// service stores
	const settingsStore = storage(infoService, "file", ipcChannels.settings.data, { path: defaults.paths.settings });
	const pluginsStore = storage(infoService, "file", "plugins.data", { path: defaults.paths.plugins });

	// services to be passed to plugins service in order to be exposed to future plugins
	const pluginServices = {
		info: infoService,
		settings: settings(settingsStore),
	};

	return {
		...pluginServices,
		plugins: plugins(pluginsStore, pluginServices),
	};
}
