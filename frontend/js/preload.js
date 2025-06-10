const { contextBridge, ipcRenderer } = require('electron');

// Expõe as APIs que podem ser usadas no renderer, mantendo segurança
contextBridge.exposeInMainWorld('electronAPI', {
  selecionarAudio: () => ipcRenderer.invoke('selecionar-audio'),  // Abre diálogo para escolher áudio
  reduzirRuido: (caminho, intensidade) => ipcRenderer.invoke('CK/reducer', caminho, intensidade), // Passa caminho e intensidade
  aplicarEqualizacao: (caminho, ganhos) => ipcRenderer.invoke('CK/equalizer', caminho, ganhos), //Equalização
  aplicarSeparacao: (caminho) => ipcRenderer.invoke('CK/separator', caminho), //Separator
});