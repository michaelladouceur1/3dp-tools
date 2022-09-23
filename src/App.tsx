import { useContext, useState, useEffect } from "react";

import { iSettings } from "./shared/types/settings";
import { MainContext } from "./ui/context/MainContext";
import TopBar from "./ui/components/Top-Bar/Top-Bar";

import "./reset.scss";
import "./App.scss";

function App() {
	const { updateSettingsField } = window.api.settings;

	const {
		settings: { autoSaveDelay, autoUpdatePlugins, uiMode, uiSelectedColors },
	} = useContext(MainContext);
	const { download } = window.api.system;

	const [downloadUrl, setDownloadUrl] = useState("");

	const updateBackgroundColor = (value: string) => {
		const target = uiMode.value === "dark" ? "uiDarkThemeColors.value.backgroundColor" : "uiLightThemeColors.value.backgroundColor";
		updateSettingsField(target, value);
	};

	const { backgroundColor } = uiSelectedColors.value;

	return (
		<>
			<aside style={{ backgroundColor: backgroundColor }}>ASIDE</aside>
			<main style={{ backgroundColor: backgroundColor }}>
				<TopBar />
				<div>
					<h1>hello</h1>
					<div>
						<label>Auto Update</label>
						<input
							type="checkbox"
							checked={autoUpdatePlugins.value}
							onChange={() => updateSettingsField("autoUpdatePlugins.value", !autoUpdatePlugins.value)}
						></input>
					</div>
					<div>
						<label>Theme Mode</label>
						<select onChange={(e) => updateSettingsField("uiMode.value", e.target.value)} value={uiMode.value}>
							<option value="dark">Dark</option>
							<option value="light">Light</option>
						</select>
					</div>
					<div>
						<label>Theme Color</label>
						<p>{backgroundColor}</p>
						<input
							type="color"
							value={backgroundColor}
							style={{ width: "30px", height: "30px", borderRadius: "50%" }}
							onChange={(e) => updateBackgroundColor(e.target.value)}
						/>
					</div>
					<div>
						<label>Auto Save Delay</label>
						<input type="text" value={autoSaveDelay.value} onChange={(e) => updateSettingsField("autoSaveDelay.value", e.target.value)}></input>
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
