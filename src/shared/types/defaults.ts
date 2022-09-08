import { iSettings } from "./settings";

export interface iDefaults {
	appData: iDefaultsAppData;
	browserWindow: iDefaultsBrowserWindow;
	paths: iDefaultsPaths;
}

export interface iDefaultsAppData {
	plugins: iDefaultsPlugin[];
	settings: iSettings;
}

export interface iDefaultsBrowserWindow {
	width: number;
	height: number;
	minWidth: number;
	minHeight: number;
	center: boolean;
	title: string;
	frame: boolean;
}

export interface iDefaultsPaths {
	home: string;
	dataDir: string;
	pluginsDir: string;
	plugins: string;
	settings: string;
}

export interface iDefaultsPlugin {
	id: number;
	name: string;
	url: string;
	active: boolean;
	downloaded: boolean;
}

export interface iDefaultsSessionData {
	activePlugins: number[];
}
