import { useContext, useState, useEffect } from "react";

import { iSettings } from "./shared/types/settings";
import { MainContext } from "./ui/context/MainContext";
import TopBar from "./ui/components/Top-Bar/Top-Bar";

import "./reset.scss";
import "./App.scss";

function App() {
	const { updateSettingsField } = window.api.settings;

	const { settings } = useContext(MainContext);
	const { download } = window.api.system;

	const [downloadUrl, setDownloadUrl] = useState("");

	const bgColor = settings.uiMode.value === "dark" ? settings.uiDarkThemeColors.value.backgroundColor : settings.uiLightThemeColors.value.backgroundColor;

	const updateBackgroundColor = (value: string) => {
		const target = settings.uiMode.value === "dark" ? "uiDarkThemeColors.value.backgroundColor" : "uiLightThemeColors.value.backgroundColor";
		updateSettingsField(target, value);
	};

	return (
		<>
			<aside style={{ backgroundColor: bgColor }}>ASIDE</aside>
			<main style={{ backgroundColor: bgColor }}>
				<TopBar />
				<div>
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
						<p>{bgColor}</p>
						<input
							type="color"
							// value={bgColor}
							style={{ width: "30px", height: "30px", borderRadius: "50%" }}
							onChange={(e) => updateBackgroundColor(e.target.value)}
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
				</div>
			</main>
		</>
	);
}

export default App;
