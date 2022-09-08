import { useState, useEffect } from "react";

function App() {
	const getSettings = async () => {
		const data = await window.api.settings.getSettings();
		console.log(data);
	};

	const saveSettings = async () => {
		const settings = await window.api.settings.getSettings();
		console.log(settings);
		window.api.settings.saveSettings({ autoUpdate: true, themeMode: "dark" });
	};

	return (
		<>
			<h1>hello</h1>
			<button onClick={getSettings}>Get Settings</button>
			<button onClick={saveSettings}>Update Settings</button>
		</>
	);
}

export default App;
