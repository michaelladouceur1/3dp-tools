import { iSettings } from "./shared/types/settings";
import { useState, useEffect } from "react";
import { defaults } from "./shared/defaults";

function App() {
	const { onSettingsData, getSettings, updateSettingsField } = window.api.settings;
	const { download } = window.api.system;

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
	});
	const [downloadUrl, setDownloadUrl] = useState("");

	useEffect(() => {
		initSettings();
		onSettingsData(setSettings);
	}, []);

	const bgColor = settings.uiMode.value === "dark" ? settings.uiBackgroundColors.value.dark : settings.uiBackgroundColors.value.light;

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
				<select onChange={(e) => updateSettingsField("uiMode.value", e.target.value)} value={settings.uiMode.value}>
					<option value="dark">Dark</option>
					<option value="light">Light</option>
				</select>
			</div>
			<div>
				<label>Theme Color</label>
				<p>{settings.uiMode.value === "dark" ? settings.uiBackgroundColors.value.dark : settings.uiBackgroundColors.value.light}</p>
				<input
					type="color"
					style={{ width: "30px", height: "30px", borderRadius: "50%" }}
					onChange={(e) => updateSettingsField(`uiBackgroundColors.value.${settings.uiMode.value}`, e.target.value)}
				/>
			</div>
			<div>
				<label>Auto Save Delay</label>
				<input type="text" value={settings.autoSaveDelay.value} onChange={(e) => updateSettingsField("autoSaveDelay.value", e.target.value)}></input>
			</div>
			<div>
				<label>Download</label>
				<input value={downloadUrl} onChange={(e) => setDownloadUrl(e.target.value)} />
				<button onClick={() => download(downloadUrl, "plugins")}>Download</button>
			</div>
		</body>
	);
}

export default App;
