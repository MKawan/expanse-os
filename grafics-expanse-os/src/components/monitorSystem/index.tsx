import { useEffect, useState } from "react";

interface SystemInfo {
  platform: string;
  cpu: any;
  totalMemory: number;
  freeMemory: number;
  storage: {
    filesystem: string;
    size: number;
    used: number;
    available: number;
    mount: string;
  }[];
  network: {
    interface: string;
    addresses: { address: string; netmask: string; family: string }[];
  }[];
}

function MonitorSystem() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);

  useEffect(() => {
    if (window.electron?.onSystemInfoUpdate) {
      window.electron.onSystemInfoUpdate((info: SystemInfo) => {
        setSystemInfo(info);
      });
    }
  }, []);

  return (
    <div style={{
      display: "flex",
      flexDirection: 'column',
      overflow: 'auto',
      width: '100%',
      height: '98%'
    }}>
      {systemInfo ? (
        <div>{JSON.stringify(systemInfo, null, 2)}</div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default MonitorSystem;
