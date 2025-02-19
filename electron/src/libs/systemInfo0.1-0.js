const si = require("systeminformation");
const os = require("os");

let previousCpuInfo = os.cpus(); // Armazena os tempos anteriores da CPU

function SystemInfo(mainWindow) {
    if (!mainWindow) return;

    setInterval(async () => {
        try {
            const osInfo = await si.osInfo();
            const cpu = await si.cpu();
            const currentLoad = await si.currentLoad(); // Obtém o uso médio da CPU
            const memory = await si.mem();
            const disk = await si.fsSize();
            const network = await si.networkInterfaces();
            const cpuUsagePerCore = getCpuUsage(); // Obtém o uso da CPU por núcleo

            if (mainWindow && !mainWindow.isDestroyed()) {
                mainWindow.webContents.send("update-system-info", {
                    platform: osInfo.platform,
                    cpu,
                    cpuUsage: currentLoad.currentLoad.toFixed(2) + "%", // Uso médio da CPU
                    cpuUsagePerCore, // Uso detalhado por núcleo
                    totalMemory: memory.total,
                    freeMemory: memory.free,
                    storage: disk.map((d) => ({
                        filesystem: d.fs,
                        size: d.size,
                        used: d.used,
                        available: d.available,
                        mount: d.mount,
                    })),
                    network: network.map((n) => ({
                        interface: n.iface,
                        addresses: n.ip4 ? [{ address: n.ip4, netmask: n.ip4subnet, family: "IPv4" }] : [],
                    })),
                });
            }
        } catch (error) {
            console.error("Erro ao obter informações do sistema:", error);
        }
    }, 1000);
}

// Função para calcular o uso real da CPU comparando medições consecutivas
function getCpuUsage() {
    const currentCpuInfo = os.cpus();
    const usagePerCore = currentCpuInfo.map((cpu, index) => {
        const prevTimes = previousCpuInfo[index].times;
        const currTimes = cpu.times;

        const totalPrev = Object.values(prevTimes).reduce((acc, time) => acc + time, 0);
        const totalCurr = Object.values(currTimes).reduce((acc, time) => acc + time, 0);

        const idlePrev = prevTimes.idle;
        const idleCurr = currTimes.idle;

        const totalDiff = totalCurr - totalPrev;
        const idleDiff = idleCurr - idlePrev;
        const usage = ((totalDiff - idleDiff) / totalDiff) * 100;

        return { core: index, usage: usage.toFixed(2) + "%" };
    });

    previousCpuInfo = currentCpuInfo; // Atualiza os dados anteriores para a próxima medição
    return usagePerCore;
}

module.exports = { SystemInfo };
