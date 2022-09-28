import { useContext, useState, useEffect } from "react";

import { iSettings } from "./shared/types/settings";
import { MainContext } from "./ui/context/MainContext";
import TopBar from "./ui/components/Top-Bar/Top-Bar";
import SettingsMenu from "./ui/components/Settings-Menu/SettingsMenu";
import { ColorPicker } from "./ui/common/Color-Picker/ColorPicker";

import "./reset.scss";
import "./App.scss";

function App() {
	const { updateSettingsField } = window.api.settings;

	const {
		settings: { autoSaveDelay, autoUpdatePlugins, uiMode, uiSelectedColors },
	} = useContext(MainContext);
	const { download } = window.api.system;

	const [downloadUrl, setDownloadUrl] = useState("");
	const [modalVisible, setModalVisible] = useState(false);

	const updateBackgroundColor = (value: string) => {
		const target = uiMode.value === "dark" ? "uiDarkThemeColors.value.backgroundColor" : "uiLightThemeColors.value.backgroundColor";
		updateSettingsField(target, value);
	};

	const updateHighlight1Color = (value: string) => {
		const target = uiMode.value === "dark" ? "uiDarkThemeColors.value.highlight1Color" : "uiLightThemeColors.value.highlight1Color";
		updateSettingsField(target, value);
	};

	const updateHighlight2Color = (value: string) => {
		const target = uiMode.value === "dark" ? "uiDarkThemeColors.value.highlight2Color" : "uiLightThemeColors.value.highlight2Color";
		updateSettingsField(target, value);
	};

	const { backgroundColor, highlight1Color, highlight2Color } = uiSelectedColors.value;

	return (
		<>
			<SettingsMenu />
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
						<select onChange={(e: any) => updateSettingsField("uiMode.value", e.target.value)} value={uiMode.value}>
							<option value="dark">Dark</option>
							<option value="light">Light</option>
						</select>
					</div>
					<div>
						<label>Theme Background Color</label>
						<p>{backgroundColor}</p>
						<input
							type="color"
							value={backgroundColor}
							style={{ width: "30px", height: "30px", borderRadius: "50%" }}
							onChange={(e) => updateBackgroundColor(e.target.value)}
						/>
					</div>
					<div>
						<label>Theme Highlight 1 Color</label>
						<p>{highlight1Color}</p>
						<input
							type="color"
							value={highlight1Color}
							style={{ width: "30px", height: "30px", borderRadius: "50%" }}
							onChange={(e) => updateHighlight1Color(e.target.value)}
						/>
					</div>
					<div>
						<label>Theme Highlight 2 Color</label>
						<p>{highlight2Color}</p>
						<input
							type="color"
							value={highlight2Color}
							style={{ width: "30px", height: "30px", borderRadius: "50%" }}
							onDurationChange={(value: any) => console.log(value)}
						/>
					</div>
					<ColorPicker value={highlight2Color} onChange={(e: any) => updateHighlight2Color(e.target.value)} />
					<div>
						<label>Auto Save Delay</label>
						<input type="text" value={autoSaveDelay.value} onChange={(e) => updateSettingsField("autoSaveDelay.value", Number(e.target.value))}></input>
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
