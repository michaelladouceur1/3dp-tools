import { mkdirSync, writeFileSync } from "fs";
import * as path from "path";

import { iDefaultsAppData, iDefaultsPaths } from "../../shared/types/defaults";
import { defaults } from "../../shared/defaults";

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

function initializeAppData(paths: iDefaultsPaths, appData: iDefaultsAppData) {
	const { plugins, settings } = paths;
	const { plugins: pluginsData, settings: settingsData } = appData;

	// create plugins file
	createFile(plugins, pluginsData);
	// create settings file
	createFile(settings, settingsData);

	function createFile(path: string, data: any) {
		try {
			writeFileSync(path, JSON.stringify(data), { encoding: "utf8", flag: "wx" });
		} catch (error: any) {
			if (error.code !== "EEXIST") {
				console.log(error);
			}
		}
	}
}

export async function initialize() {
	await initializeDirectories(defaults.paths);
	await initializeAppData(defaults.paths, defaults.appData);
}
