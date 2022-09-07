import { mkdirSync, writeFileSync } from "fs";
import * as path from "path";

import { iDefaultsAppData, iDefaultsPaths } from "../../../types/defaults";
import { defaults } from "../../../constants/defaults";

function initializeDirectories(paths: iDefaultsPaths) {
	const { data, plugins } = paths;

	// create data directory
	createDirectory(data);
	// create plugins directory
	createDirectory(plugins);

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
	const { data } = paths;
	const { plugins, settings } = appData;

	// create plugins file
	createFile(path.join(data, "plugins.tdp"), plugins);
	// create settings file
	createFile(path.join(data, "settings.tdp"), settings);

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

export async function setup() {
	await initializeDirectories(defaults.paths);
	await initializeAppData(defaults.paths, defaults.appData);
}
