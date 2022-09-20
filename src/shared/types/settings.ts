import { iStorageService } from "./storage";

export interface iSettingsService {
	store: () => iStorageService;
	getSettings: () => Promise<iSettings>;
	updateSettings: (settings: iSettings) => Promise<iSettings>;
	updateSettingsField: <T extends keyof iSettingsMutableFields>(field: T, value: iSettingsMutableFields[T]) => Promise<iSettings>;
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

export interface iSettingsMutableFields {
	"autoSave.value": boolean;
	"autoSaveDelay.value": number;
	"autoUpdatePlugins.value": boolean;
	"backup.value": boolean;
	"backupFrequency.value": boolean;
	"uiMode.value": "dark" | "light";
	"uiBackgroundColors.value.dark": string;
	"uiBackgroundColors.value.light": string;
	"uiFontColors.value.dark": string;
	"uiFontColors.value.light": string;
	"uiFontFamily.value": string;
}

// export interface iSettingsField {
// 	description: string;
// 	value: any;
// }
