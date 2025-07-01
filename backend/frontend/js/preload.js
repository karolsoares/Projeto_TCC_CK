const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  selecionarAudio: () => ipcRenderer.invoke('selecionar-audio'),
  reduzirRuido: (caminho, intensidade) => ipcRenderer.invoke('CK/reducer', caminho, intensidade),
  aplicarEqualizacao: (caminho, ganhos) => ipcRenderer.invoke('CK/equalizer', caminho, ganhos),
  selecionarPlugin: () => ipcRenderer.invoke('selecionar-plugin'),
  aplicarSeparacao: (caminho, modelo) => ipcRenderer.invoke('CK/separator', caminho, modelo),
  enviarPlugin: (filePath) => ipcRenderer.invoke('CK/upload-plugin', filePath),
  executarPlugin: (nomePlugin, caminho) => ipcRenderer.invoke('CK/plugin', nomePlugin, caminho),
});