export interface iConfig {
	paths: iConfigPaths;
}

export interface iConfigPaths {
	pathFromHome: string;
	base: string;
	plugins: string;
	settings: string;
}
