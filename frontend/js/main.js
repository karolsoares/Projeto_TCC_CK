const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { execFile } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '..', 'assets', 'icons', 'logo.ico'),  // Ícone da aplicação
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Carrega o arquivo menu.html que está uma pasta acima da pasta js
  win.loadFile(path.join(__dirname, '..', 'login.html'));
}

app.whenReady().then(createWindow);

// Handler para abrir diálogo e selecionar arquivo WAV
ipcMain.handle('selecionar-audio', async () => {
  const result = await dialog.showOpenDialog({
    filters: [
      {
        name: 'Arquivos de Áudio',
        extensions: ['wav', 'mp3', 'mp4', 'flac', 'ogg', 'm4a', 'aac']
      }
    ],
    properties: ['openFile']
  });

  if (result.canceled) return null;
  return result.filePaths[0];
});

// Handler para chamar o script Python que reduz o ruído
// Recebe: caminhoEntrada (string), intensidade (string ou número)
ipcMain.handle('CK/reducer', async (_, caminhoEntrada, intensidade) => {
  // Caminho para o script reducer.py
  const caminhoPython = path.join(__dirname, '..', '..', 'backend', 'reducer.py');
  // Caminho fixo para o arquivo de saída (pode ser ajustado)
  const caminhoSaida = path.join(__dirname, '..', '..', 'audios', 'saida', 'saida.wav');

  const intensidadeStr = intensidade ? intensidade.toString() : '0.5';

  return new Promise((resolve, reject) => {
    execFile('python', [caminhoPython, caminhoEntrada, caminhoSaida, intensidadeStr], (error, stdout, stderr) => {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);

      if (error) {
        console.error('Erro ao executar Python:', stderr);
        reject(stderr);
      } else {
        resolve(caminhoSaida);
      }
    });
  });
});

// Handler para chamar o script Python que aplica equalização
// Recebe: caminhoEntrada (string), ganhos (array de números)
ipcMain.handle('CK/equalizer', async (_, caminhoEntrada, ganhos) => {
  // Caminho para o script equalizer.py
  const caminhoPython = path.join(__dirname, '..', '..', 'backend', 'equalizer.py');

  // Gera o caminho de saída com sufixo "-equalizado"
  const parsed = path.parse(caminhoEntrada);
  const caminhoSaida = path.join(parsed.dir, parsed.name + '-equalizado' + parsed.ext);

  // Converte array de ganhos para string separada por vírgula
  const ganhosStr = ganhos.join(',');

  return new Promise((resolve, reject) => {
    execFile('python', [caminhoPython, caminhoEntrada, caminhoSaida, ganhosStr], (error, stdout, stderr) => {
      console.log('stdout equalizer:', stdout);
      console.log('stderr equalizer:', stderr);

      if (error) {
        console.error('Erro ao executar Python equalizer:', stderr);
        reject(stderr);
      } else {
        resolve(caminhoSaida);
      }
    });
  });
});

// Handler para chamar o script Python que aplica separação de audio em faixas
ipcMain.handle('CK/separator', async (_, caminhoEntrada) => {
  const caminhoPython = path.join(__dirname, '..', '..', 'backend', 'separator.py');
  const pastaSaida = path.join(__dirname, '..', '..', 'audios', 'saida');

  return new Promise((resolve, reject) => {
    execFile('python', [caminhoPython, caminhoEntrada, pastaSaida], (error, stdout, stderr) => {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);

      if (error) {
        console.error('Erro ao executar Python:', stderr);
        reject(stderr);
      } else {
        // Retorna lista de arquivos gerados (exibidos no stdout do Python)
        const arquivos = stdout.trim().split('\n');
        resolve(arquivos);
      }
    });
  });
});