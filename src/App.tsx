import { useContext, useState, useEffect } from "react";

import { iSettings } from "./shared/types/settings";
import { MainContext } from "./ui/context/MainContext";
import TopBar from "./ui/components/Top-Bar/Top-Bar";
import SettingsMenu from "./ui/components/Settings-Menu/SettingsMenu";
import { ColorPicker } from "./ui/common/Color-Picker/ColorPicker";

import "./reset.scss";
import "./App.scss";

// TODO: Development of session data
// TODO: Development of prints data
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
			<aside style={{ backgroundColor: backgroundColor }}>ASIDE</aside>
			<main style={{ backgroundColor: backgroundColor }}>
				<TopBar />
				<div>
					<h1>hello</h1>
				</div>
			</main>
		</div>
	);
}

export default App;
