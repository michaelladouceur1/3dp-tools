export interface iSettingsService {
	getSettings: () => Promise<iSettings>;
	updateSettings: (settings: iSettings) => void;
	updateSettingsField: <T extends keyof iSettings>(field: T, value: iSettings[T]["value"]) => void;
}

export interface iSettings {
	autoUpdate: {
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
