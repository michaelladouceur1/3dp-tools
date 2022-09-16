import { readdir } from "fs/promises";
import * as path from "path";

import { iStorageService } from "../../shared/types/storage";
import { iServices } from "../../shared/types/services";
import { iPlugin } from "../../shared/types/plugins";
import { BasePlugin } from "../../lib/plugins/base-plugin";

/* 
parse file for tracking downloaded and active plugins
check if plugins are most recent versions
check if auto update is turned on and update if so
load plugins and return
*/
// TODO: Read pluginsDirectory and load directories accordingly
export function plugins(storage: iStorageService, services: iServices) {
	const plugins = [];
	// const basePlugin = new BasePlugin(services);

	// async function getLocalPlugins(): Promise<iPlugin[]> {
	// 	return await storage.getState();
	// }

	async function load(name: string) {}

	async function loader(pluginsPath: string) {
		try {
			const pluginDirs = await readdir(pluginsPath);
			pluginDirs.forEach((dir) => {
				const { register } = require(path.join(pluginsPath, dir));
				plugins.push(register(new BasePlugin(services)));
			});
		} catch (error) {
			console.log(error);
		}
	}

	return { load, loader };
}
