const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const { readdir } = require("fs/promises");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  mainWindow.loadFile('./index.html');
//   mainWindow.loadURL("http://localhost:5173"); // Ajuste para Vite
});

ipcMain.handle("list-files", async (_event, dirPath) => {
    try {
      console.log("Tentando acessar:", dirPath);  // Debug
      const files = await readdir(dirPath, { withFileTypes: true });
      console.log("Arquivos encontrados:", files);  // Debug
      return files.map((file) => ({
        name: file.name,
        path: path.join(dirPath, file.name),
        isDirectory: file.isDirectory(),
      }));
    } catch (error) {
      console.error("Erro ao acessar diretório:", error);
      return { error: "Erro ao acessar diretório" };
    }
  });
