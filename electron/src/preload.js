const { contextBridge, ipcRenderer } = require("electron");
const os = require("os");

contextBridge.exposeInMainWorld("electron", {
  onSystemInfoUpdate: (callback) => {
    ipcRenderer.on("update-system-info", (_, data) => callback(data));
  },
  readDirectory: (dirPath, callback) => {
    ipcRenderer.once("directory-data", (_, data) => callback(data));  // Usando 'once' para garantir que o evento seja escutado apenas uma vez.
    ipcRenderer.send('read-directory', dirPath);  // Envia o pedido para o processo principal
  }
});