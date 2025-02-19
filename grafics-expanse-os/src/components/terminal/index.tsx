import { useState } from 'react';

function Terminal() {
    const [command, setCommand] = useState('');
    const [output, setOutput] = useState('');
    const [isSudo, setIsSudo] = useState(false);

    const handleCommandChange = (event: any) => {
        setCommand(event.target.value);
    };

    const handleSudoChange = () => {
        setIsSudo(!isSudo);
    };

    const handleRunCommand = async () => {
        try {
            const result = await window.electron.runCommand(command, isSudo);
            setOutput(result);  // Exibe a saída do comando
        } catch (error) {
            setOutput(`Erro: ${error}`);
        }
    };

    return (
        <div>
            <h1>Terminal Linux</h1>
            <div>
                <input
                    type="text"
                    value={command}
                    onChange={handleCommandChange}
                    placeholder="Digite seu comando"
                />
                <button onClick={handleRunCommand}>Executar</button>
                <label>
                    <input type="checkbox" checked={isSudo} onChange={handleSudoChange} />
                    Sudo
                </label>
            </div>
            <pre>{output}</pre>
        </div>
    );
}

export default Terminal;
