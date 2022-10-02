import { defaults } from "../shared/defaults";
import { ipcChannels } from "../shared/ipc-channels";

import { storage } from "./services/storage";
import { info } from "./services/info";
import { settings } from "./services/settings";
import { sessionData } from "./services/session-data";
import { plugins } from "./services/plugins";

export function initialize() {
	// logging and info services
	const infoService = info();

	// service stores
	const settingsStore = storage(infoService, "file", ipcChannels.settings.data, { path: defaults.paths.settings });
	const sessionDataStore = storage(infoService, "file", ipcChannels.sessionData.data, { path: defaults.paths.sessionData });
	const pluginsStore = storage(infoService, "file", "plugins.data", { path: defaults.paths.plugins });

	// create data files
	settingsStore.createStore(defaults.appData.settings);
	sessionDataStore.createStore(defaults.appData.sessionData);
	pluginsStore.createStore(defaults.appData.plugins);

	// essential services
	const settingsService = settings(settingsStore);

	// services to be passed to plugins service in order to be exposed to future plugins
	const pluginServices = {
		info: infoService,
		settings: settingsService,
		sessionData: sessionData(sessionDataStore, settingsService),
	};

	return {
		...pluginServices,
		plugins: plugins(pluginsStore, pluginServices),
	};
}
