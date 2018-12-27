const electron = require("electron");

const { app, BrowserWindow } = electron;

let mainWindow;

app.on("ready", () => {
	mainWindow = new BrowserWindow({
		width: 400, 
		height: 100
	});

	mainWindow.loadURL(`file://${__dirname}/git-status.html`);
    
	mainWindow.on("close", () => {
		mainWindow = null;
	});
});

