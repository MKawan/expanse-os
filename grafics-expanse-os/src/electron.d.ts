export {};

declare global {
  interface Window {
    electron: {
      [x: string]: any;
      getHomeDirectory;
      onSystemInfoUpdate: any;
      ipcRenderer: {
        send: (channel: string, ...args: any[]) => void;
        on: (channel: string, listener: (...args: any[]) => void) => void;
        removeListener: (channel: string, listener: (...args: any[]) => void) => void;
      };
      readDirectory;
      getSystemInfo: () => Promise<{
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
          addresses: {
            family: string;
            address: string;
            netmask: string;
            mac: string;
          }[];
        }[];
      }>;
    };
  }
}
