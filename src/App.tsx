import { iSettings } from "./shared/types/settings";
import { useState, useEffect } from "react";

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
		themeMode: {
			description: "",
			value: "dark",
		},
	});

	useEffect(() => {
		initSettings();
		onSettingsData(setSettings);
	}, []);

	return (
		<>
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
				<p>{settings.themeMode?.value}</p>
			</div>
		</>
	);
}

export default App;
