# 🌌 Expanse OS

Expanse OS é um sistema operacional gráfico experimental baseado em **Debian Live Build**, utilizando **Weston** como compositor **Wayland** e **Electron** para criar uma interface gráfica totalmente construída em **HTML**, **CSS** e **JavaScript**.

---

## 🚀 Visão Geral

O objetivo do Expanse OS é fornecer uma experiência moderna e leve, onde toda a interface do sistema é construída com tecnologias web. Cada aplicação pode ser desenvolvida como um pacote independente no formato `.exp`, integrando **React**, **Electron** e bibliotecas JavaScript de forma dinâmica.

---

## ✨ Funcionalidades

- 🖥️ **Interface 100% Web** — Desenvolvida com HTML, CSS, JS e React.
- ⚡ **Baseada em Electron** — Cada aplicação roda em um container isolado.
- 🎨 **Design Flexível** — Suporte para temas e personalização.
- 📦 **Pacotes `.exp`** — Sistema próprio de empacotamento de aplicativos.
- 🔄 **Carregamento Dinâmico** — Suporte para `main.js` e `preload.js` personalizados.
- 🧩 **Integração com Web APIs** — Suporte nativo para chamadas `ipcRenderer`.

---

## 🛠️ Tecnologias

- **Debian Live Build** 🐧
- **Weston** (Wayland Compositor)
- **Electron** ⚡
- **React + TypeScript** ⚛️
- **Node.js + NPM** 📦
- **HTML5 / CSS3 / JavaScript** 🎨

---

## 📂 Estrutura do Projeto

```bash
expanse-os/
├── config/                # Configurações da Live Build
├── electron-apps/         # Aplicativos no formato .exp
├── src/                   # Frontend React + Electron
├── scripts/               # Scripts de inicialização
└── README.md
```

---

## ⚙️ Instalação & Build da ISO

```bash
git clone https://github.com/MKawan/expanse-os.git
cd expanse-os
sudo lb config
sudo lb build
```

O processo irá gerar um **ISO bootável** do Expanse OS.

---

## 🔧 Configuração do Boot Automático

O sistema inicia automaticamente o **Weston** e carrega a interface gráfica baseada em Electron no boot, garantindo uma experiência pronta para uso.

---

## 🤝 Contribuição

Contribuições são bem-vindas! 🛠️

1. Fork o repositório
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m "feat: minha nova funcionalidade"`
4. Envie para o repositório: `git push origin minha-feature`
5. Abra um Pull Request

---

## 📜 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🌐 Links

- 🔗 **Repositório**: [github.com/MKawan/expanse-os](https://github.com/MKawan/expanse-os)
- 🐧 **Debian Live Build**: [https://www.debian.org/devel/debian-live/](https://www.debian.org/devel/debian-live/)
- ⚡ **Electron**: [https://www.electronjs.org/](https://www.electronjs.org/)
