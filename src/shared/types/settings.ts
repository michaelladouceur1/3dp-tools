export interface iSettingsService {
	getSettings: () => void;
	saveSettings: (settings: iSettings) => void;
}

export interface iSettings {
	autoUpdate: boolean;
}
