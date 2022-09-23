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
			uiBackgroundColors: {
				description: "",
				value: {
					dark: "#464444",
					light: "#d6d6d6",
				},
			},
			uiHighlight1Colors: {
				description: "",
				value: {
					dark: "#111",
					light: "#fff",
				},
			},
			uiHighlight2Colors: {
				description: "",
				value: {
					dark: "#111",
					light: "#fff",
				},
			},
			uiFontColors: {
				description: "",
				value: {
					dark: "#fff",
					light: "#111",
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
		width: 1800,
		height: 1000,
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
