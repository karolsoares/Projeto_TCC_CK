const { contextBridge, ipcRenderer } = require('electron');

// Expõe as APIs que podem ser usadas no renderer, mantendo segurança
contextBridge.exposeInMainWorld('electronAPI', {
  selecionarAudio: () => ipcRenderer.invoke('selecionar-audio'),  // Abre diálogo para escolher áudio
  reduzirRuido: (caminho, intensidade) => ipcRenderer.invoke('CK/reducer', caminho, intensidade), // Passa caminho e intensidade
  aplicarEqualizacao: (caminho, ganhos) => ipcRenderer.invoke('CK/equalizer', caminho, ganhos), //Equalização
  aplicarSeparacao: (caminho) => ipcRenderer.invoke('CK/separator', caminho), //Separator
});

contextBridge.exposeInMainWorld('env', {
  API_KEY: process.env.API_KEY,
  AUTH_DOMAIN: process.env.AUTH_DOMAIN,
  PROJECT_ID: process.env.PROJECT_ID,
  STORAGE_BUCKET: process.env.STORAGE_BUCKET,
  MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
  APP_ID: process.env.APP_ID
});