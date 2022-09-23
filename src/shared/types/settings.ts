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
	uiBackgroundColors: iSettingsField<{ dark: string; light: string }>;
	uiHighlight1Colors: iSettingsField<{ dark: string; light: string }>;
	uiHighlight2Colors: iSettingsField<{ dark: string; light: string }>;
	uiFontColors: iSettingsField<{ dark: string; light: string }>;
	uiFontSize: iSettingsField<number>;
	uiFontFamily: iSettingsField<string>;
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

export interface iSettingsField<Value> {
	readonly description: string;
	value: Value;
}
