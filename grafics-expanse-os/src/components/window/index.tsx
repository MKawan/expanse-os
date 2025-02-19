import { Rnd } from "react-rnd";
import {useState } from "react";
import "./style.css";
import FolderManager from "../folderManager";

interface WindowProps {
  title: string;
  onClose: () => void;
  // children: ReactNode;
}

const Window: React.FC<WindowProps> = ({ title, onClose}) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 100, y: 100 });

  return (
    <Rnd
      default={{
        x: position.x,
        y: position.y,
        width: 600,
        height: 400,
      }}
      bounds="parent"
      onDragStop={(_e, d) => setPosition({ x: d.x, y: d.y })}
      className="window"
      dragHandleClassName="window-header" // Define a barra de título como área de arrasto
    >
      {/* Cabeçalho da Janela */}
      <div className="window-header">
        <span>{title}</span>
        <button onClick={onClose}>×</button>
      </div>

      {/* Conteúdo da Janela */}
      {/* <div className="window-content"></div> */}
      {/* <MonitorSystem /> */}
      <FolderManager/>
    </Rnd>
  );
};

export default Window;
