const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    listFiles: (dirPath) => ipcRenderer.invoke("list-files", dirPath),
    openFolder: (folderPath) => ipcRenderer.invoke("open-folder", folderPath),
  })