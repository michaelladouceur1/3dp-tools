import { iSettings, iSettingsMutableFields } from "./settings";

export {};

declare global {
	interface Window {
		api: {
			system: {
				download: (downloadUrl: string, target?: string) => void;
			};
			info: {
				onInfoData: (callback: Function) => Promise<any>;
			};
			settings: {
				onSettingsData: (callback: Function) => Promise<iSettings>;
				getSettings: () => Promise<iSettings>;
				updateSettings: (data: iSettings) => void;
				updateSettingsField: <T extends keyof iSettingsMutableFields>(field: T, value: iSettingsMutableFields[T]) => void;
			};
		};
	}
}
