import { useContext, useState } from "react";

import { MainContext } from "../../context/MainContext";
import { UIStateContext } from "../../context/UIStateContext";
import { Modal } from "../../common/Modal/Modal";
import { Tabs } from "../../common/Tabs/Tabs";
import { ColorPicker } from "../../common/Color-Picker/ColorPicker";

import "./SettingsMenu.scss";

type SectionProps = {
	styles: SettingsMenuStyles;
};

type SettingsMenuStyles = {
	nav: {
		borderBottom: string;
	};
	p: {
		color: string;
	};
	subheader: {
		borderBottom: string;
	};
};

export default function SettingsMenu() {
	const {
		settings: { uiSelectedColors, uiFontSize },
	} = useContext(MainContext);
	const { settingsMenuVisible, setSettingsMenuVisible } = useContext(UIStateContext);

	const { highlight2Color, fontColor2 } = uiSelectedColors.value;

	const styles: SettingsMenuStyles = {
		nav: {
			borderBottom: `1px solid ${highlight2Color}`,
		},
		p: {
			color: fontColor2,
		},
		subheader: {
			borderBottom: `1px solid ${highlight2Color}`,
		},
	};

	const [selectedSection, setSelectedSection] = useState(<ThemeSection styles={styles} />);

	const tabs = [
		{ title: "Theme", onClick: () => setSelectedSection(<ThemeSection styles={styles} />) },
		{ title: "System", onClick: () => setSelectedSection(<SystemSection styles={styles} />) },
		{ title: "Plugins", onClick: () => setSelectedSection(<PluginsSection styles={styles} />) },
		{ title: "Information", onClick: () => setSelectedSection(<InformationSection styles={styles} />) },
	];

	return (
		<Modal title="Settings" width="800px" height="600px" isVisible={settingsMenuVisible} setIsVisible={setSettingsMenuVisible}>
			<div className="settings-menu">
				<div style={styles.nav} className="settings-menu-nav">
					<Tabs tabs={tabs} />
				</div>
				<div className="settings-menu-content">{selectedSection}</div>
			</div>
		</Modal>
	);
}

const ThemeSection: React.FC<SectionProps> = ({ styles }) => {
	const { updateSettingsField } = window.api.settings;

	const {
		settings: { uiMode, uiSelectedColors, uiFontSize, uiFontFamily },
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
		<>
			<div className="settings-menu-field-1">
				<div>
					<label>Theme Mode</label>
					<p style={styles.p}>Light/Dark mode for 3DP Tools UI</p>
				</div>
				<select onChange={(e: any) => updateSettingsField("uiMode.value", e.target.value)} value={uiMode.value}>
					<option value="dark">Dark</option>
					<option value="light">Light</option>
				</select>
			</div>
			<h1 style={styles.subheader} className="settings-menu-subheader">
				Colors
			</h1>
			<div className="settings-menu-field-1">
				<div className="settings-menu-field-title">
					<label>Background Color</label>
					<p style={styles.p}>Background color for 3DP Tools UI</p>
				</div>
				<ColorPicker value={backgroundColor} onChange={(e: any) => updateBackgroundColor(e.target.value)} />
			</div>
			<div className="settings-menu-field-1">
				<div>
					<label>Highlight 1 Color</label>
					<p style={styles.p}>Highlight 1 color for 3DP Tools UI</p>
				</div>
				<ColorPicker value={highlight1Color} onChange={(e: any) => updateHighlight1Color(e.target.value)} />
			</div>
			<div className="settings-menu-field-1">
				<div>
					<label>Highlight 2 Color</label>
					<p style={styles.p}>Highlight 2 color for 3DP Tools UI</p>
				</div>
				<ColorPicker value={highlight2Color} onChange={(e: any) => updateHighlight2Color(e.target.value)} />
			</div>
			<div className="settings-menu-field-1">
				<div>
					<label>Font Color</label>
					<p style={styles.p}>Font color for 3DP Tools UI</p>
				</div>
				<ColorPicker value={fontColor} onChange={(e: any) => updateFontColor(e.target.value)} />
			</div>
			<h1 style={styles.subheader} className="settings-menu-subheader">
				Fonts
			</h1>
			{/* // TODO: Update this field to be a slider */}
			<div className="settings-menu-field-1">
				<div>
					<label>Font Size</label>
					<p style={styles.p}>Base font size for 3DP Tools UI. Range: 11-16</p>
				</div>
				<input
					type="number"
					min={11}
					max={16}
					value={uiFontSize.value}
					onChange={(e) => {
						const value = Number(e.target.value);
						if (value < 11 || value > 16) return;
						updateSettingsField("uiFontSize.value", value);
					}}
				></input>
			</div>
			<div className="settings-menu-field-1">
				<div>
					<label>Font Family</label>
					<p style={styles.p}>Font family for 3DP Tools UI</p>
				</div>
				<select onChange={(e: any) => updateSettingsField("uiFontFamily.value", e.target.value)} value={uiFontFamily.value}>
					<option value="sans-serif">Sans Serif</option>
					<option value="roboto">Roboto</option>
				</select>
			</div>
		</>
	);
};

const SystemSection: React.FC<SectionProps> = ({ styles }) => {
	const { updateSettingsField } = window.api.settings;

	const {
		settings: { autoSave, autoSaveDelay, backup, backupFrequency },
	} = useContext(MainContext);

	return (
		<>
			<h1 style={styles.subheader} className="settings-menu-subheader">
				Auto Save
			</h1>
			<div className="settings-menu-field-1">
				<div>
					<label>Auto Save</label>
					<p style={styles.p}>Auto save 3DP Tools data</p>
				</div>
				<input type="checkbox" checked={autoSave.value} onChange={() => updateSettingsField("autoSave.value", !autoSave.value)}></input>
			</div>
			{/* // TODO: Update this field to be a slider */}
			<div className="settings-menu-field-1">
				<div>
					<label>Auto Save Delay</label>
					<p style={styles.p}>Delay for auto save feature. Range: 1-60 seconds</p>
				</div>
				<input
					disabled={!autoSave.value}
					type="number"
					min={1}
					max={60}
					value={autoSaveDelay.value / 1000}
					onChange={(e) => updateSettingsField("autoSaveDelay.value", Number(e.target.value) * 1000)}
				></input>
			</div>

			<h1 style={styles.subheader} className="settings-menu-subheader">
				Backup
			</h1>
			<div className="settings-menu-field-1">
				<div>
					<label>Backup Data</label>
					<p style={styles.p}>Backup 3DP Tools data (Prints, Settings, etc.)</p>
				</div>
				<input type="checkbox" checked={backup.value} onChange={() => updateSettingsField("backup.value", !backup.value)}></input>
			</div>
			{/* // TODO: Update this field to be a slider */}
			<div className="settings-menu-field-1">
				<div>
					<label>Backup Data Frequency</label>
					<p style={styles.p}>Frequency for 3DP Tools data backup. Range: 1-30 days</p>
				</div>
				<input
					disabled={!backup.value}
					type="number"
					min={1}
					max={30}
					value={backupFrequency.value / 86400000}
					onChange={(e) => updateSettingsField("backupFrequency.value", Number(e.target.value) * 86400000)}
				></input>
			</div>
		</>
	);
};

const PluginsSection: React.FC<SectionProps> = ({ styles }) => {
	const { updateSettingsField } = window.api.settings;
	const { download } = window.api.system;

	const {
		settings: { autoUpdatePlugins },
	} = useContext(MainContext);
	const [downloadUrl, setDownloadUrl] = useState("");

	return (
		<>
			<div className="settings-menu-field-1">
				<div>
					<label>Auto Update</label>
					<p style={styles.p}>Auto update plugins when a new version is available</p>
				</div>
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
		</>
	);
};

const InformationSection: React.FC<SectionProps> = ({ styles }) => {
	return <div>Information</div>;
};
