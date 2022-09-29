import { createContext, useEffect, useState, PropsWithChildren } from "react";
import { iSettings, iUISettings } from "../../shared/types/settings";

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
			fontColor2: "black",
		},
	},
};

const newShade = (hexColor: string, magnitude: number) => {
	hexColor = hexColor.replace(`#`, ``);
	if (hexColor.length === 6) {
		const decimalColor = parseInt(hexColor, 16);
		if (decimalColor > 16777215 / 2) {
			magnitude = -1 * magnitude;
		}
		console.log("newShade: ", decimalColor);
		let r = (decimalColor >> 16) + magnitude;
		r > 255 && (r = 255);
		r < 0 && (r = 0);
		let g = (decimalColor & 0x0000ff) + magnitude;
		g > 255 && (g = 255);
		g < 0 && (g = 0);
		let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
		b > 255 && (b = 255);
		b < 0 && (b = 0);
		return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
	} else {
		return hexColor;
	}
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
				value: {
					...selectedColors,
					fontColor2: newShade(selectedColors.fontColor, 50),
				},
			},
		});
	}, [stateSettings]);

	return <MainContext.Provider value={{ settings }}>{children}</MainContext.Provider>;
};
