const { ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

function FolderManager() {
  ipcMain.handle("read-directory", async (dirPath) => {
    // const dirPath = ''; // Defina o diretório fixo se não precisar passar dinamicamente
    try {
      if (!dirPath) throw new Error("Caminho não definido!");

      const files = fs.readdirSync(dirPath).map((file) => {
        const fullPath = path.join(dirPath, file);
        return {
          name: file,
          path: fullPath,
          isDirectory: fs.statSync(fullPath).isDirectory(),
        };
      });

      return files;
    } catch (error) {
      console.error("Erro ao ler diretório:", error);
      return { error: error.message };
    }
  });
}

module.exports = { FolderManager };
