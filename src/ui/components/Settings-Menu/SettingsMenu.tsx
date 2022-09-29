import { useContext, useState } from "react";

import { MainContext } from "../../context/MainContext";
import { UIStateContext } from "../../context/UIStateContext";
import { Modal } from "../../common/Modal/Modal";
import { Tabs } from "../../common/Tabs/Tabs";
import { ColorPicker } from "../../common/Color-Picker/ColorPicker";

import "./SettingsMenu.scss";

export default function SettingsMenu() {
	const { settings } = useContext(MainContext);
	const { settingsMenuVisible, setSettingsMenuVisible } = useContext(UIStateContext);
	const [selectedSection, setSelectedSection] = useState(<ThemeSection />);

	const { backgroundColor, highlight1Color, highlight2Color } = settings.uiSelectedColors.value;

	const tabs = [
		{ title: "Theme", onClick: () => setSelectedSection(<ThemeSection />) },
		{ title: "System", onClick: () => setSelectedSection(<SystemSection />) },
		{ title: "Information", onClick: () => setSelectedSection(<InformationSection />) },
		{ title: "Plugins", onClick: () => setSelectedSection(<PluginsSection />) },
	];

	return (
		<Modal title="Settings" width="800px" height="600px" isVisible={settingsMenuVisible} setIsVisible={setSettingsMenuVisible}>
			<div className="settings-menu">
				<div style={{ backgroundColor: backgroundColor }} className="settings-menu-nav">
					<Tabs tabs={tabs} />
				</div>
				<div className="settings-menu-content">{selectedSection}</div>
			</div>
		</Modal>
	);
}

function ThemeSection() {
	const { updateSettingsField } = window.api.settings;

	const {
		settings: { uiMode, uiSelectedColors },
	} = useContext(MainContext);

	const { backgroundColor, highlight1Color, highlight2Color, fontColor } = uiSelectedColors.value;

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

	const updateFontColor = (value: string) => {
		const target = uiMode.value === "dark" ? "uiDarkThemeColors.value.fontColor" : "uiLightThemeColors.value.fontColor";
		updateSettingsField(target, value);
	};

	return (
		<div>
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
				<ColorPicker value={backgroundColor} onChange={(e: any) => updateBackgroundColor(e.target.value)} />
			</div>
			<div>
				<label>Theme Highlight 1 Color</label>
				<p>{highlight1Color}</p>
				<ColorPicker value={highlight1Color} onChange={(e: any) => updateHighlight1Color(e.target.value)} />
			</div>
			<div>
				<label>Theme Highlight 2 Color</label>
				<p>{highlight2Color}</p>
				<ColorPicker value={highlight2Color} onChange={(e: any) => updateHighlight2Color(e.target.value)} />
			</div>
			<div>
				<label>Theme Font Color</label>
				<p>{fontColor}</p>
				<ColorPicker value={fontColor} onChange={(e: any) => updateFontColor(e.target.value)} />
			</div>
		</div>
	);
}

function SystemSection() {
	const { updateSettingsField } = window.api.settings;

	const {
		settings: { autoSaveDelay },
	} = useContext(MainContext);

	return (
		<div>
			<div>
				<label>Auto Save Delay</label>
				<input type="text" value={autoSaveDelay.value} onChange={(e) => updateSettingsField("autoSaveDelay.value", Number(e.target.value))}></input>
			</div>
		</div>
	);
}

function PluginsSection() {
	const { updateSettingsField } = window.api.settings;
	const { download } = window.api.system;

	const {
		settings: { autoUpdatePlugins },
	} = useContext(MainContext);
	const [downloadUrl, setDownloadUrl] = useState("");

	return (
		<div>
			<div>
				<label>Auto Update</label>
				<input
					type="checkbox"
					checked={autoUpdatePlugins.value}
					onChange={() => updateSettingsField("autoUpdatePlugins.value", !autoUpdatePlugins.value)}
				></input>
			</div>

			<div>
				<label>Download</label>
				<input value={downloadUrl} onChange={(e) => setDownloadUrl(e.target.value)} />
				<button onClick={() => download(downloadUrl, "plugins")}>Download</button>
			</div>
		</div>
	);
}

function InformationSection() {
	return <div>Information</div>;
}
