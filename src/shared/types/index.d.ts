export {};

declare global {
	interface Window {
		api: {
			settings: {
				getSettings: () => Promise<Object>;
				saveSettings: (data) => void;
			};
		};
	}
}
