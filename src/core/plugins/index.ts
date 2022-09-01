import { readdir } from "fs/promises";
import * as path from "path";
import { iPlugin } from "../../../types/plugins";

export default async function loader(pluginsPath: string, plugins: iPlugin[]) {
	console.log(pluginsPath);
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
