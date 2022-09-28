import { useContext, useState } from "react";

import { MainContext } from "../../context/MainContext";
import { UIStateContext } from "../../context/UIStateContext";
import { Modal } from "../../common/Modal/Modal";
import { Tabs } from "../../common/Tabs/Tabs";
import "./SettingsMenu.scss";

export default function SettingsMenu() {
	const { settings } = useContext(MainContext);
	const { settingsMenuVisible, setSettingsMenuVisible } = useContext(UIStateContext);
	const [selectedSection, setSelectedSection] = useState(<ThemeSection />);

	const { backgroundColor, highlight1Color, highlight2Color } = settings.uiSelectedColors.value;

	const tabs = [
		{ title: "Theme", onClick: () => setSelectedSection(<ThemeSection />) },
		{ title: "System", onClick: () => setSelectedSection(<SystemSection />) },
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
	return <div>Theme</div>;
}

function SystemSection() {
	return <div>System</div>;
}
