import { iSettings } from "./shared/types/settings";
import { ipcRenderer } from "electron";
import { useState, useEffect } from "react";

function App() {
	const getSettings = async () => {
		const data = await window.api.settings.getSettings();
		setSettings(data);
	};

	// const saveSettings = async () => {
	// 	const settings = await window.api.settings.getSettings();
	// 	console.log(settings);
	// 	window.api.settings.updateSettings({ autoUpdate: true, themeMode: "dark" });
	// };

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

		ipcRenderer.on("settings-data", (_: any, data: iSettings) => {
			console.log(data);
			setSettings(data);
		});
	}, []);

	return (
		<>
			<h1>hello</h1>
			<div>
				<label>Auto Update</label>
				<input type="checkbox" checked={settings.autoUpdatePlugins.value}></input>
			</div>
			<div>
				<label>Theme Mode</label>
				<p>{settings.themeMode.value}</p>
			</div>
		</>
	);
}

export default App;
