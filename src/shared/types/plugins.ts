import { iSettings } from "./settings";

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
	"settings.updateSettingsField": <T extends keyof iSettings>({ field, value }: { field: T; value: iSettings[T]["value"] }) => Promise<iSettings>;
}
