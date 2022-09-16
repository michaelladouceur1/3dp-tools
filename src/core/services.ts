import { defaults } from "../shared/defaults";
import { ipcChannels } from "../shared/ipc-channels";

import { storage } from "./services/storage";
import { settings } from "./services/settings";
import { plugins } from "./services/plugins";

export function initialize() {
	const settingsStore = storage("file", ipcChannels.settings.data, { path: defaults.paths.settings });

	const pluginServices = {
		settings: settings(settingsStore),
	};

	const pluginsStore = storage("file", "plugins.data", { path: defaults.paths.plugins });

	return {
		...pluginServices,
		plugins: plugins(pluginsStore, pluginServices),
	};
}
