import { useContext, useState } from "react";

import { MainContext } from "../../context/MainContext";
import { UIStateContext } from "../../context/UIStateContext";
import { Modal } from "../../common/Modal/Modal";
import { Tabs } from "../../common/Tabs/Tabs";
import { ColorPicker } from "../../common/Color-Picker/ColorPicker";

import "./SettingsMenu.scss";

type SettingsSubheader = {
	title: string;
};

type SettingsField = {
	children: JSX.Element;
	title: string;
	description: string;
};

// TODO: Option to revert settings to default values
export default function SettingsMenu() {
	const {
		settings: { uiSelectedColors },
	} = useContext(MainContext);
	const { settingsMenuVisible, setSettingsMenuVisible } = useContext(UIStateContext);
	const [selectedSection, setSelectedSection] = useState(<ThemeSection />);

	const { highlight2Color, fontColor2 } = uiSelectedColors.value;

	const styles = {
		nav: {
			borderBottom: `1px solid ${highlight2Color}`,
		},
	};

	const tabs = [
		{ title: "Theme", onClick: () => setSelectedSection(<ThemeSection />) },
		{ title: "System", onClick: () => setSelectedSection(<SystemSection />) },
		{ title: "Plugins", onClick: () => setSelectedSection(<PluginsSection />) },
		{ title: "Information", onClick: () => setSelectedSection(<InformationSection />) },
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

const SettingsSubheader: React.FC<SettingsSubheader> = ({ title }) => {
	const {
		settings: { uiSelectedColors },
	} = useContext(MainContext);

	const style = {
		borderBottom: `1px solid ${uiSelectedColors.value.highlight2Color}`,
	};

	return (
		<h1 style={style} className="settings-menu-subheader">
			{title}
		</h1>
	);
};

const SettingsField: React.FC<SettingsField> = ({ children, title, description }) => {
	const {
		settings: { uiSelectedColors },
	} = useContext(MainContext);

	const style = {
		color: uiSelectedColors.value.fontColor2,
	};

	return (
		<div className="settings-menu-field-1">
			<div>
				<label>{title}</label>
				<p style={style}>{description}</p>
			</div>
			{children}
		</div>
	);
};

const ThemeSection: React.FC = () => {
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
			{/* // General Section  */}
			<>
				<SettingsSubheader title="General" />
				{/* // TODO: Update field to be a toggle switch  */}
				<SettingsField title="Theme Mode" description="Light/Dark mode for 3DP Tools UI">
					<select onChange={(e: any) => updateSettingsField("uiMode.value", e.target.value)} value={uiMode.value}>
						<option value="dark">Dark</option>
						<option value="light">Light</option>
					</select>
				</SettingsField>
			</>

			{/* // Color Section  */}
			<>
				<SettingsSubheader title="Colors" />
				<SettingsField title="Background Color" description="Background color for 3DP Tools UI">
					<ColorPicker value={backgroundColor} onChange={(e: any) => updateBackgroundColor(e.target.value)} />
				</SettingsField>
				<SettingsField title="Highlight 1 Color" description="Highlight 1 color for 3DP Tools UI">
					<ColorPicker value={highlight1Color} onChange={(e: any) => updateHighlight1Color(e.target.value)} />
				</SettingsField>
				<SettingsField title="Highlight 2 Color" description="Highlight 2 color for 3DP Tools UI">
					<ColorPicker value={highlight2Color} onChange={(e: any) => updateHighlight2Color(e.target.value)} />
				</SettingsField>
				<SettingsField title="Font Color" description="Font color for 3DP Tools UI">
					<ColorPicker value={fontColor} onChange={(e: any) => updateFontColor(e.target.value)} />
				</SettingsField>
			</>

			{/* // Font Section  */}
			<>
				<SettingsSubheader title="Fonts" />
				{/* // TODO: Update field to be a slider */}
				<SettingsField title="Font Size" description="Base font size for 3DP Tools UI. Range: 11-16">
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
					/>
				</SettingsField>
				<SettingsField title="Font Family" description="Font family for 3DP Tools UI">
					<select onChange={(e: any) => updateSettingsField("uiFontFamily.value", e.target.value)} value={uiFontFamily.value}>
						<option value="'Montserrat', sans-serif">Montserrat</option>
						<option value="'Radio Canada', sans-serif">Radio Canada</option>
						<option value="'Roboto', sans-serif">Roboto</option>
					</select>
				</SettingsField>
			</>
		</>
	);
};

const SystemSection: React.FC = () => {
	const { updateSettingsField } = window.api.settings;

	const {
		settings: { autoSave, autoSaveDelay, backup, backupFrequency },
	} = useContext(MainContext);

	return (
		<>
			{/* // Auto Save Section  */}
			<>
				<SettingsSubheader title="Auto Save" />
				{/* // TODO: Update field to be a toggle switch  */}
				<SettingsField title="Auto Save" description="Auto save 3DP Tools data">
					<input type="checkbox" checked={autoSave.value} onChange={() => updateSettingsField("autoSave.value", !autoSave.value)}></input>
				</SettingsField>

				{/* // TODO: Update field to be a slider */}
				<SettingsField title="Auto Save Delay" description="Delay for auto save feature. Range: 1-60 seconds">
					<input
						disabled={!autoSave.value}
						type="number"
						min={1}
						max={60}
						value={autoSaveDelay.value / 1000}
						onChange={(e) => updateSettingsField("autoSaveDelay.value", Number(e.target.value) * 1000)}
					/>
				</SettingsField>
			</>

			{/* // Backup Section  */}
			<>
				<SettingsSubheader title="Backup" />
				{/* // TODO: Update field to be a toggle switch  */}
				<SettingsField title="Backup Data" description="Backup 3DP Tools data (Prints, Settings, etc.)">
					<input type="checkbox" checked={backup.value} onChange={() => updateSettingsField("backup.value", !backup.value)}></input>
				</SettingsField>
				{/* // TODO: Update field to be a slider */}
				<SettingsField title="Backup Data Frequency" description="Frequency for 3DP Tools data backup. Range: 1-30 days">
					<input
						disabled={!backup.value}
						type="number"
						min={1}
						max={30}
						value={backupFrequency.value / 86400000}
						onChange={(e) => updateSettingsField("backupFrequency.value", Number(e.target.value) * 86400000)}
					/>
				</SettingsField>
			</>
		</>
	);
};

const PluginsSection: React.FC = () => {
	const { updateSettingsField } = window.api.settings;
	const { download } = window.api.system;

	const {
		settings: { autoUpdatePlugins },
	} = useContext(MainContext);
	const [downloadUrl, setDownloadUrl] = useState("");

	return (
		<>
			{/* // TODO: Update field to be a toggle switch  */}
			<SettingsField title="Auto Update" description="Auto update plugins when a new version is available">
				<input type="checkbox" checked={autoUpdatePlugins.value} onChange={() => updateSettingsField("autoUpdatePlugins.value", !autoUpdatePlugins.value)} />
			</SettingsField>

			<div>
				<label>Download</label>
				<input value={downloadUrl} onChange={(e) => setDownloadUrl(e.target.value)} />
				<button onClick={() => download(downloadUrl, "plugins")}>Download</button>
			</div>
		</>
	);
};

const InformationSection: React.FC = () => {
	return <div>Information</div>;
};
