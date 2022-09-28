import { app } from "electron";
import * as path from "path";

import { iDefaults } from "./types/defaults";

const HOME = app.getPath("userData");
const DATA = path.join(HOME, "data");

export const defaults: iDefaults = {
	appData: {
		plugins: [],
		settings: {
			autoSave: {
				description: "",
				value: true,
			},
			autoSaveDelay: {
				description: "",
				value: 5000,
			},
			autoUpdatePlugins: {
				description: "",
				value: true,
			},
			backup: {
				description: "",
				value: true,
			},
			backupFrequency: {
				description: "",
				value: 86400000, // milliseconds in a day
			},
			uiMode: {
				description: "",
				value: "dark",
			},
			uiDarkThemeColors: {
				description: "",
				value: {
					backgroundColor: "#2f363d",
					highlight1Color: "#272830",
					highlight2Color: "#515161",
					fontColor: "white",
				},
			},
			uiLightThemeColors: {
				description: "",
				value: {
					backgroundColor: "#c5c4c4",
					highlight1Color: "#b3adad",
					highlight2Color: "#808080",
					fontColor: "black",
				},
			},
			uiFontSize: {
				description: "",
				value: 12,
			},
			uiFontFamily: {
				description: "",
				value: "sans-serif",
			},
		},
	},
	browserWindow: {
		width: 1200,
		height: 800,
		minWidth: 1200,
		minHeight: 800,
		center: true,
		title: "3DP Tools",
		frame: true,
	},
	// TODO: Update all paths to rely on app.getPath("userData") to ensure it's getting the most up-to-date userData directory
	paths: {
		home: HOME,
		dataDir: DATA,
		pluginsDir: path.join(DATA, "plugins"),
		plugins: path.join(DATA, "plugins.tdp"),
		settings: path.join(DATA, "settings.tdp"),
	},
};
