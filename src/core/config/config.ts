import { app } from "electron";
import * as path from "path";
import { readFile, mkdir } from "fs/promises";

import { iConfig } from "../../../types/config";
import { defaultAppDirectories } from "./defaults";

async function _parseConfig(configPath: string) {
	try {
		const rawConfig = await readFile(configPath, { encoding: "utf8" });
		const parsedConfig: iConfig = JSON.parse(rawConfig);

		const defaultDirs = defaultAppDirectories;
		const configDirs = parsedConfig.paths;

		const config: iConfig = {
			paths: {
				pathFromHome: configDirs.pathFromHome ?? defaultDirs.pathFromHome,
				base: configDirs.base ?? defaultDirs.base,
				plugins: configDirs.plugins ?? defaultDirs.plugins,
				settings: configDirs.settings ?? defaultDirs.settings,
			},
		};

		return config;
	} catch (error) {
		console.log(error);
	}
}

async function _createDirectories(config: iConfig | undefined) {
	if (!config) return;

	const homeDir = app.getPath("home");
	const { pathFromHome, base, plugins, settings } = config.paths;

	const basePath = pathFromHome ? path.join(homeDir, pathFromHome) : homeDir;

	const createBaseDir = _createDirectory(basePath);
	// create baseDir
	createBaseDir(base);

	const createDir = _createDirectory(path.join(basePath, base));
	// create pluginsDir
	createDir(plugins);
	// create settingsDir
	createDir(settings);
}

function _createDirectory(basePath: string) {
	return (dir: string) => {
		try {
			mkdir(path.join(basePath, dir), { recursive: true });
		} catch (error: any) {
			if (error.code !== "EEXIST") {
				console.log(error);
			}
		}
	};
}

export async function setup() {
	const config = await _parseConfig(path.join(app.getAppPath(), "src", "core", "config", "config.json"));
	_createDirectories(config);
}
