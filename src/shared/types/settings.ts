export interface iSettingsService {
	getSettings: () => Promise<iSettings>;
	updateSettings: (settings: iSettings) => Promise<iSettings>;
	updateSettingsField: <T extends keyof iSettings>(field: T, value: iSettings[T]["value"]) => Promise<iSettings>;
}

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
	themeMode: {
		description: string;
		value: "dark" | "light";
	};
}

// export interface iSettingsField {
// 	description: string;
// 	value: any;
// }
