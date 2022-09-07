import { mkdir } from "fs/promises";

import { iDefaultsPaths } from "../../../types/config";
import { defaults } from "../../../constants/defaults";

function _createDirectories(paths: iDefaultsPaths) {
	const { data, plugins } = paths;

	// create data directory
	_createDirectory(data);
	// create plugins directory
	_createDirectory(plugins);
}

function _createDirectory(path: string) {
	try {
		mkdir(path, { recursive: true });
	} catch (error: any) {
		if (error.code !== "EEXIST") {
			console.log(error);
		}
	}
}

export async function setup() {
	_createDirectories(defaults.paths);
}
