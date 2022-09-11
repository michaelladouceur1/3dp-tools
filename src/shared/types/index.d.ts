import { iSettings } from "./settings";

export {};

declare global {
	interface Window {
		api: {
			settings: {
				getSettings: () => Promise<iSettings>;
				updateSettings: (data) => void;
				updateSettingsField: (field: string, value: any) => void;
			};
		};
	}
}
