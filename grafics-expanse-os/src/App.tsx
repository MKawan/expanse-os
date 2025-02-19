import './App.css';
import { useState } from "react";
import Window from "./components/window";
import { FaFolder } from "react-icons/fa6";
import { TbHeartRateMonitor } from "react-icons/tb";
import { IoAppsSharp, IoTerminal, IoSettings } from "react-icons/io5";

interface WindowData {
  id: number;
  title: string;
}
function App() {
    const [windows, setWindows] = useState<WindowData[]>([]);

    // Adiciona uma nova janela ao clicar duas vezes no ícone
    const openWindow = (title: string) => {
      setWindows([...windows, { id: Date.now(), title }]);
    };

    // Remove uma janela quando fechada
    const closeWindow = (id: number) => {
      setWindows(windows.filter((w) => w.id !== id));
    };

  return (
    <div className='backgroundImage'>
      <div>
        <div className='ContainerGridDesktop'>
            <div className='containerBarMenu'>
                <div className='barMenu'>
                  <div className='containerIcons' onDoubleClick={() => openWindow("Meu App")}>
                      <FaFolder size={20}/>
                  </div>
                  <div className='containerIcons'>
                      <TbHeartRateMonitor size={27}/>
                  </div>
                  <div className='containerIcons'>
                      <IoAppsSharp size={25}/>
                  </div>
                  <div className='containerIcons'> 
                      <IoTerminal size={25}/>
                  </div>
                  <div className='containerIcons'>
                      <IoSettings size={25}/>
                  </div>
                </div>
            </div>
            <div className='desktopWindow'>

                {/* Renderiza todas as janelas abertas */}
                {windows.map((win) => (
                  <Window key={win.id} title={win.title} onClose={() => closeWindow(win.id)}>
                  </Window>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
