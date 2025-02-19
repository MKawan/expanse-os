import './style.css';
import React, { useState, useEffect } from 'react';
import { FaRegFolderOpen, FaFileLines } from "react-icons/fa6";

const FolderManager: React.FC = () => {
    const [files, setFiles] = useState<{ name: string; isDirectory: boolean; path: string }[]>([]);
    const [currentPath, setCurrentPath] = useState<string>('/');
    const [inputPath, setInputPath] = useState<string>('/');

    useEffect(() => {
        loadDirectory(currentPath);
    }, [currentPath]);

    async function loadDirectory(dirPath: string) {
        try {
          if (window.electron?.onSystemInfoUpdate) {
            window.electron.readDirectory(dirPath, (res: any) => {
              setFiles(res.data);  // Atualiza o estado com os dados do diretório
              console.log(files);
            });
          }
        } catch (error) {
            console.error('Erro ao carregar diretório:', error);
            setFiles([]); // Em caso de erro, evita crash do .map()
        }
    }
      // Voltar para a pasta anterior
      function goBack() {
        if (currentPath !== '/') {
            const parentPath = currentPath.split('/').slice(0, -1).join('/') || '/';
            setCurrentPath(parentPath);
            setInputPath(parentPath)
        }
      }

      // Navegar ao pressionar Enter no input
      function handlePathChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputPath(event.target.value);
      }

      function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            setCurrentPath(inputPath); // Atualiza a navegação
        }
      }
    return (
        <div style={{ padding: 20,
            height: '100%',
         }}>
            {/* <h3>Gerenciador de Arquivos</h3> */}
            {/* Barra de navegação */}
            <div className='containerPath'>
                <button onClick={goBack} disabled={currentPath === '/'}>⬅ Voltar</button>
                <input
                    type="text"
                    value={inputPath}
                    onChange={handlePathChange}
                    onKeyUp={handleKeyPress}
                    style={{ marginLeft: 10, width: '300px' }}
                />
            </div>
            {files.length > 0 ? (
                <ul 
                className='containerFloders'
                >
                    {files.map((file) => (
                        <li
                            key={file.path}
                            onClick={() => file.isDirectory && setCurrentPath(file.path)}
                            className='containerIconsFolderAndFiles'
                            style={{
                                cursor: file.isDirectory ? 'pointer' : 'default',
                                color: file.isDirectory ? 'blue' : 'black',
                                fontWeight: file.isDirectory ? 'bold' : 'normal',
                            }}
                        >
                            {file.isDirectory ? <FaRegFolderOpen size={50}/> : <FaFileLines size={50} />} 
                            <span className='span-container'>
                                {file.name} 
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Carregando ou diretório vazio...</p>
            )}
        </div>
    );
};

export default FolderManager;
