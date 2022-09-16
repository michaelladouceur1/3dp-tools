import { iSettings } from "./settings";

export {};

declare global {
	interface Window {
		api: {
			system: {
				download: (downloadUrl: string, target?: string) => void;
			};
			settings: {
				onSettingsData: (callback: Function) => Promise<iSettings>;
				getSettings: () => Promise<iSettings>;
				updateSettings: (data) => void;
				updateSettingsField: (field: string, value: any) => void;
			};
		};
	}
}
