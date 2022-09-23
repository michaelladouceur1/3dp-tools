import { iSettings } from "../../shared/types/settings";
import React, { createContext, useEffect, useState, PropsWithChildren } from "react";

const settingsInitial: iSettings = {
	autoSave: {
		description: "",
		value: true,
	},
	autoSaveDelay: {
		description: "",
		value: 1000,
	},
	autoUpdatePlugins: {
		description: "",
		value: true,
	},
	backup: {
		description: "",
		value: true,
	},
	backupFrequency: {
		description: "",
		value: 86400000, // milliseconds in a day
	},
	uiMode: {
		description: "",
		value: "dark",
	},
	uiBackgroundColors: {
		description: "",
		value: {
			dark: "#111",
			light: "#fff",
		},
	},
	uiFontColors: {
		description: "",
		value: {
			dark: "#fff",
			light: "#111",
		},
	},
	uiFontFamily: {
		description: "",
		value: "sans-serif",
	},
};

export const MainContext = createContext<{ settings: iSettings }>({ settings: settingsInitial });

export const MainContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { onSettingsData, getSettings } = window.api.settings;
	const [settings, setSettings] = useState(settingsInitial);

	const initSettings = async () => {
		const data: iSettings = await getSettings();
		setSettings(data);
	};

	useEffect(() => {
		// initialize data
		initSettings();

		// initialize state change callbacks
		onSettingsData(setSettings);
	}, []);

	return <MainContext.Provider value={{ settings }}>{children}</MainContext.Provider>;
};
