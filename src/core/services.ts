import { defaults } from "../shared/defaults";

import { storage } from "./services/storage";
import { settings } from "./services/settings";

export function initialize() {
	const settingsStore = storage("file", { path: defaults.paths.settings });

	return {
		settings: settings(settingsStore),
	};
}
