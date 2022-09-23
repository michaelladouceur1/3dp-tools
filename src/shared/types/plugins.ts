import { iSettings, iSettingsMutableFields } from "./settings";

export interface iPluginsService {
	getLocalPlugins: () => Promise<iPlugin[]>;
}

export interface iPlugin {
	id: number;
	name: string;
}

export interface iPluginInvokeRequest {
	target: keyof iPluginInvokeTargets;
	data: any;
}

export interface iPluginInvokeTargets {
	"settings.getSettings": (data: void) => Promise<iSettings>;
	"settings.updateSettings": (data: iSettings) => Promise<iSettings>;
	"settings.updateSettingsField": <T extends keyof iSettingsMutableFields>({
		field,
		value,
	}: {
		field: T;
		value: iSettingsMutableFields[T];
	}) => Promise<iSettings>;
}
