import { app } from "electron";
import * as path from "path";

import { iDefaults } from "../types/config";

const HOME = app.getPath("userData");
const DATA = path.join(HOME, "data");

export const defaults: iDefaults = {
	browserWindow: {
		width: 1800,
		height: 1000,
		minWidth: 1200,
		minHeight: 800,
		center: true,
		title: "3DP Tools",
		frame: true,
	},
	paths: {
		home: HOME,
		data: DATA,
		plugins: path.join(DATA, "plugins"),
		settings: path.join(DATA, "settings"),
	},
};
