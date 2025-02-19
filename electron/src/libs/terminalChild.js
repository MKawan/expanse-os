const { exec } = require('child_process');

// Função para executar comando com sudo
function executeCommand(command, isSudo = false) {
    return new Promise((resolve, reject) => {
        const fullCommand = isSudo ? `echo 'your_password' | sudo -S ${command}` : command;

        exec(fullCommand, (error, stdout, stderr) => {
            let result = error ? stderr : stdout;
            event.reply('command-output', result);
        });
    });
}

module.exports = { executeCommand };
