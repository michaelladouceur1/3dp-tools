import { iSettings } from "./shared/types/settings";
// import { ipcRenderer } from "electron";
import { useState, useEffect } from "react";

function App() {
	const getSettings = async () => {
		const data = await window.api.settings.getSettings();
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
		getSettings();

		window.api.settings.onSettingsData(setSettings);
	}, []);

	return (
		<>
			<h1>hello</h1>
			<div>
				<label>Auto Update</label>
				<input
					type="checkbox"
					checked={settings.autoUpdatePlugins?.value}
					onChange={() => window.api.settings.updateSettingsField("autoUpdatePlugins.value", !settings.autoUpdatePlugins.value)}
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
