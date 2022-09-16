import { defaults } from "../shared/defaults";

import { storage } from "./services/storage";
import { settings } from "./services/settings";
import { plugins } from "./services/plugins";

export function initialize() {
	const settingsStore = storage("file", { path: defaults.paths.settings });

	const pluginServices = {
		settings: settings(settingsStore),
	};

	const pluginsStore = storage("file", { path: defaults.paths.plugins });
	const pluginsService = plugins(pluginsStore, pluginServices);

	return {
		...pluginServices,
		plugins: pluginsService,
	};
}
