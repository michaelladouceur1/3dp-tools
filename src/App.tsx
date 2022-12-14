import { useContext, useState, useEffect } from "react";

import { iSettings } from "./shared/types/settings";
import { MainContext } from "./ui/context/MainContext";
import TopBar from "./ui/components/Top-Bar/Top-Bar";
import MainMenu from "./ui/components/Main-Menu/MainMenu";
import InfoBar from "./ui/components/Info-Bar/InfoBar";
import SettingsMenu from "./ui/components/Settings-Menu/SettingsMenu";
import { ColorPicker } from "./ui/common/Color-Picker/ColorPicker";

import "./reset.scss";
import "./App.scss";

// TODO: Session data (most recent window size/location, currently selected printer, etc.)
// TODO: Models data (3D models, STL reader, etc.)
// TODO: Prints data (print tracking, etc.)
// TODO: Data backup feature
// TODO: Implement ability to turn auto save off and have warning to save when closing app
// TODO: Side/Main menu development
function App() {
	const {
		settings: { uiSelectedColors, uiFontSize, uiFontFamily },
	} = useContext(MainContext);

	const style = {
		color: uiSelectedColors.value.fontColor,
		fontSize: uiFontSize.value,
		fontFamily: uiFontFamily.value,
	};

	const { backgroundColor } = uiSelectedColors.value;

	return (
		<div id="app" style={style}>
			<SettingsMenu />
			<TopBar />
			<div id="main">
				<MainMenu />
				<main style={{ backgroundColor: backgroundColor }}>
					<div></div>
				</main>
			</div>
			<InfoBar />
		</div>
	);
}

export default App;
