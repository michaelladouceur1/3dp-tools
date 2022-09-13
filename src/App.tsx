import { iSettings } from "./shared/types/settings";
import { useState, useEffect } from "react";
import { defaults } from "./shared/defaults";

function App() {
	const { onSettingsData, getSettings, updateSettingsField } = window.api.settings;

	const initSettings = async () => {
		const data = await getSettings();
		setSettings(data);
	};

	const [settings, setSettings] = useState<iSettings>({
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
		themeMode: {
			description: "",
			value: "dark",
		},
		themeModeColors: {
			description: "",
			value: {
				dark: "#111",
				light: "#fff",
			},
		},
	});

	useEffect(() => {
		initSettings();
		onSettingsData(setSettings);
	}, []);

	const bgColor = settings.themeMode.value === "dark" ? settings.themeModeColors.value.dark : settings.themeModeColors.value.light;

	return (
		<body style={{ backgroundColor: bgColor, margin: 0, width: "100%", height: "100%" }}>
			<h1>hello</h1>
			<div>
				<label>Auto Update</label>
				<input
					type="checkbox"
					checked={settings.autoUpdatePlugins.value}
					onChange={() => updateSettingsField("autoUpdatePlugins.value", !settings.autoUpdatePlugins.value)}
				></input>
			</div>
			<div>
				<label>Theme Mode</label>
				<select onChange={(e) => updateSettingsField("themeMode.value", e.target.value)} value={settings.themeMode.value}>
					<option value="dark">Dark</option>
					<option value="light">Light</option>
					<option value="custom">Custom</option>
				</select>
			</div>
			<div>
				<label>Auto Save Delay</label>
				<input type="text" value={settings.autoSaveDelay.value} onChange={(e) => updateSettingsField("autoSaveDelay.value", e.target.value)}></input>
			</div>
		</body>
	);
}

export default App;
