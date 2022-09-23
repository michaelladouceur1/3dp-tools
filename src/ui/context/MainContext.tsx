import { iSettings, iUISettings } from "../../shared/types/settings";
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
	uiDarkThemeColors: {
		description: "",
		value: {
			backgroundColor: "#464444",
			highlight1Color: "#464444",
			highlight2Color: "#464444",
			fontColor: "black",
		},
	},
	uiLightThemeColors: {
		description: "",
		value: {
			backgroundColor: "#464444",
			highlight1Color: "#464444",
			highlight2Color: "#464444",
			fontColor: "black",
		},
	},
	uiFontSize: {
		description: "",
		value: 12,
	},
	uiFontFamily: {
		description: "",
		value: "sans-serif",
	},
};

const uiSettingsInitial: iUISettings = {
	...settingsInitial,
	uiSelectedColors: {
		value: {
			backgroundColor: "#464444",
			highlight1Color: "#464444",
			highlight2Color: "#464444",
			fontColor: "black",
		},
	},
};

export const MainContext = createContext<{ settings: iUISettings }>({ settings: uiSettingsInitial });

export const MainContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const { onSettingsData, getSettings } = window.api.settings;

	const [stateSettings, setStateSettings] = useState(settingsInitial);

	const [settings, setSettings] = useState(uiSettingsInitial);

	const initSettings = async () => {
		const data: iSettings = await getSettings();
		setStateSettings(data);
	};

	useEffect(() => {
		// initialize data
		initSettings();

		// initialize state change callbacks
		onSettingsData((data: iSettings) => {
			setStateSettings(data);
		});
	}, []);

	useEffect(() => {
		const { uiMode, uiLightThemeColors, uiDarkThemeColors } = stateSettings;

		const selectedColors = uiMode.value === "light" ? uiLightThemeColors.value : uiDarkThemeColors.value;

		setSettings({
			...stateSettings,
			uiSelectedColors: {
				value: selectedColors,
			},
		});
	}, [stateSettings]);

	return <MainContext.Provider value={{ settings }}>{children}</MainContext.Provider>;
};
