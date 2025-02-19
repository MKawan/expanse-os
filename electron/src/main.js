const { app, BrowserWindow } = require("electron");
const { SystemInfo } = require("./libs/systemInfo0.1-0");
const { FolderManagerSistem } = require("./libs/folderManagerSistem")
// const { setupIpc } = require('./libs/terminalChild');  // Importa o módulo de IPC
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            enableRemoteModule: true,
            nodeIntegration: true,
        },
    });

    mainWindow.loadURL("http://localhost:5173");

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
    // Passando mainWindow como argumento para SystemInfo
    SystemInfo(mainWindow);

});
FolderManagerSistem();

