import { mkdirSync, writeFileSync } from "fs";

import { iDefaultsAppData, iDefaultsPaths } from "../shared/types/defaults";
import { defaults } from "../shared/defaults";

function initializeDirectories(paths: iDefaultsPaths) {
	const { dataDir, pluginsDir } = paths;

	// create data directory
	createDirectory(dataDir);
	// create plugins directory
	createDirectory(pluginsDir);

	function createDirectory(path: string) {
		try {
			mkdirSync(path, { recursive: true });
		} catch (error: any) {
			if (error.code !== "EEXIST") {
				console.log(error);
			}
		}
	}
}

export async function initialize() {
	await initializeDirectories(defaults.paths);
}
