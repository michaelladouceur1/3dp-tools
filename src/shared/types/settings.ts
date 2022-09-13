export interface iSettingsService {
	getSettings: () => Promise<iSettings>;
	updateSettings: (settings: iSettings) => Promise<iSettings>;
	updateSettingsField: <T extends keyof iSettings>(field: T, value: iSettings[T]["value"]) => Promise<iSettings>;
}

// TODO: separate settings into distinct sections (UI, System, etc.)
export interface iSettings {
	autoSave: {
		description: string;
		value: boolean;
	};
	autoSaveDelay: {
		description: string;
		value: number;
	};
	autoUpdatePlugins: {
		description: string;
		value: boolean;
	};
	backup: {
		description: string;
		value: boolean;
	};
	backupFrequency: {
		description: string;
		value: number;
	};
	uiMode: {
		description: string;
		value: "dark" | "light";
	};
	uiBackgroundColors: {
		description: string;
		value: {
			dark: string;
			light: string;
		};
	};
	uiFontColors: {
		description: string;
		value: {
			dark: string;
			light: string;
		};
	};
	uiFontFamily: {
		description: string;
		value: string;
	};
}

// export interface iSettingsField {
// 	description: string;
// 	value: any;
// }
