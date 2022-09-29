import { iStorageService } from "./storage";

export interface iSettingsService {
	store: () => iStorageService;
	getSettings: () => Promise<iSettings>;
	updateSettings: (settings: iSettings) => Promise<iSettings>;
	updateSettingsField: <T extends keyof iSettingsMutableFields>(field: T, value: iSettingsMutableFields[T]) => Promise<iSettings>;
}

// TODO: separate settings into distinct sections (UI, System, etc.)
export interface iSettings {
	autoSave: iSettingsField<boolean>;
	autoSaveDelay: iSettingsField<number>;
	autoUpdatePlugins: iSettingsField<boolean>;
	backup: iSettingsField<boolean>;
	backupFrequency: iSettingsField<number>;
	uiMode: iSettingsField<"dark" | "light">;
	uiDarkThemeColors: iSettingsField<{ backgroundColor: string; highlight1Color: string; highlight2Color: string; fontColor: string }>;
	uiLightThemeColors: iSettingsField<{ backgroundColor: string; highlight1Color: string; highlight2Color: string; fontColor: string }>;
	uiFontSize: iSettingsField<number>;
	uiFontFamily: iSettingsField<string>;
}

export interface iUISettings extends iSettings {
	uiSelectedColors: {
		value: {
			backgroundColor: string;
			highlight1Color: string;
			highlight2Color: string;
			fontColor: string;
			fontColor2: string;
		};
	};
}

export interface iSettingsMutableFields {
	"autoSave.value": boolean;
	"autoSaveDelay.value": number;
	"autoUpdatePlugins.value": boolean;
	"backup.value": boolean;
	"backupFrequency.value": boolean;
	"uiMode.value": "dark" | "light";
	"uiDarkThemeColors.value.backgroundColor": string;
	"uiDarkThemeColors.value.highlight1Color": string;
	"uiDarkThemeColors.value.highlight2Color": string;
	"uiDarkThemeColors.value.fontColor": string;
	"uiLightThemeColors.value.backgroundColor": string;
	"uiLightThemeColors.value.highlight1Color": string;
	"uiLightThemeColors.value.highlight2Color": string;
	"uiLightThemeColors.value.fontColor": string;
	"uiFontSize.value": string;
	"uiFontFamily.value": string;
}

export interface iSettingsField<Value> {
	readonly description: string;
	value: Value;
}
