import { app, BrowserWindow } from "electron";
import { mkdir } from "fs";
import * as path from "path";
import * as core from "../src/core";
import loader from "../src/core/plugins";

function createWindow() {
	const win = new BrowserWindow({
		width: 1800,
		height: 1000,
		minWidth: 1200,
		minHeight: 800,
		webPreferences: {
			contextIsolation: false,
			nodeIntegration: true,
			preload: path.join(__dirname, "preload.js"),
		},
	});

	if (app.isPackaged) {
		// 'build/index.html'
		win.loadURL(`file://${__dirname}/../index.html`);
	} else {
		win.loadURL("http://localhost:3000/index.html");

		// win.webContents.openDevTools();

		// Hot Reloading on 'node_modules/.bin/electronPath'
		require("electron-reload")(__dirname, {
			electron: path.join(__dirname, "..", "..", "node_modules", ".bin", "electron" + (process.platform === "win32" ? ".cmd" : "")),
			forceHardReset: true,
			hardResetMethod: "exit",
		});
	}
}

app.whenReady().then(() => {
	createWindow();

	// core.start();
	console.log(app.getPath("home"));
	console.log(app.getPath("appData"));
	console.log(app.getPath("userData"));
	loader(path.join("/", "home", "michael", "Documents", "Coding", "Projects", "3dp-tools-plugins"), [{ id: 1, name: "test-plugin" }]);

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});

	app.on("window-all-closed", () => {
		if (process.platform !== "darwin") {
			app.quit();
		}
	});
});
