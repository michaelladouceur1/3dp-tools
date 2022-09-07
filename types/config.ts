export interface iDefaults {
	browserWindow: iDefaultsBrowserWindow;
	paths: iDefaultsPaths;
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
	data: string;
	plugins: string;
}
