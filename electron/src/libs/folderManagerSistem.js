const {ipcMain} = require('electron');
const path = require("path");
const fs =  require('fs');

function FolderManagerSistem(){
    ipcMain.on('read-directory', (event, dirPath) => {
        // Lê o diretório e envia os dados de volta
        try {
          const files = fs.readdirSync(dirPath, { withFileTypes: true });  // Lê o diretório de forma síncrona
          // console.log(files);
          const data = files.map(file => ({
            name: file.name,
            isDirectory: file.isDirectory(),
            path: path.join(dirPath, file.name)
        }));
          event.sender.send('directory-data', { data });  // Envia os arquivos de volta
        } catch (error) {
          event.sender.send('directory-data', { error: 'Erro ao ler diretório' });  // Em caso de erro
        }
      });
}

module.exports = {
    FolderManagerSistem
}

// Responde à requisição de diretórios do React
// ipcMain.handle('read-directory', async (event, dirPath) => {
//     try {
//         console.log(`Lendo diretório: ${dirPath}`); // Verifique no console do Electron
//         const files = fs.readdirSync(dirPath, { withFileTypes: true });
//         console.log(files);
//         return files.map(file => ({
//             name: file.name,
//             isDirectory: file.isDirectory(),
//             path: path.join(dirPath, file.name)
//         }));
//     } catch (error) {
//         console.error('Erro ao ler diretório:', error);
//         return [];
//     }
// });