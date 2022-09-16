import { iStorageService } from "../../shared/types/storage";
import { readdir } from "fs/promises";
import * as path from "path";
import { iPlugin } from "../../shared/types/plugins";

/* 
parse file for tracking downloaded and active plugins
check if plugins are most recent versions
check if auto update is turned on and update if so
load plugins and return
*/
export function plugins(storage: iStorageService) {
	async function load() {}

	async function loader(pluginsPath: string, plugins: iPlugin[]) {
		try {
			const pluginDirs = await readdir(pluginsPath);
			const pluginPackages = pluginDirs.map((dir) => {
				return require(path.join(pluginsPath, dir));
			});

			pluginPackages.forEach((plug) => {
				console.log(plug.testNumber);
				plug.logFunction();
			});
		} catch (error) {
			console.log(error);
		}
	}

	return { load, loader };
}
