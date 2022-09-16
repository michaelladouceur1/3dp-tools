import { defaults } from "../shared/defaults";

import { storage } from "./services/storage";
import { settings } from "./services/settings";
import { plugins } from "./services/plugins";

export function initialize() {
	const settingsStore = storage("file", { path: defaults.paths.settings });
	const pluginsStore = storage("file", { path: defaults.paths.plugins });

	return {
		settings: settings(settingsStore),
		plugins: plugins(pluginsStore),
	};
}
