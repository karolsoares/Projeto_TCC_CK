const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { execFile } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '..', 'assets', 'icons', 'logo.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile(path.join(__dirname, '..', 'menu.html'));
}

app.whenReady().then(createWindow);

// 🎵 Seleção de arquivo de áudio (.wav)
ipcMain.handle('selecionar-audio', async () => {
  const result = await dialog.showOpenDialog({
    filters: [{ name: 'Áudio WAV', extensions: ['wav'] }],
    properties: ['openFile'],
  });
  if (result.canceled) return null;
  return result.filePaths[0];
});

// 🔉 Redução de ruído
ipcMain.handle('CK/reducer', async (_, caminhoEntrada, intensidade) => {
  const caminhoPython = path.join(__dirname, '..', '..', 'backend', 'reducer.py');
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

// 🎚 Equalização
ipcMain.handle('CK/equalizer', async (_, caminhoEntrada, ganhos) => {
  const caminhoPython = path.join(__dirname, '..', '..', 'backend', 'equalizer.py');
  const parsed = path.parse(caminhoEntrada);
  const caminhoSaida = path.join(parsed.dir, parsed.name + '-equalizado' + parsed.ext);
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
ipcMain.handle('CK/separator', async (_, caminhoEntrada, modelo) => {
  const caminhoPython = path.join(__dirname, '..', '..', 'backend', 'separator.py');
  const pastaSaida = path.join(__dirname, '..', '..', 'audios', 'saida');

  const model = modelo;

  return new Promise((resolve, reject) => {
    execFile('python', [caminhoPython, caminhoEntrada, pastaSaida, model], (error, stdout, stderr) => {
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

// 🧩 Execução de plugin Python
ipcMain.handle('CK/plugin', async (_, pluginName, caminhoAudio) => {
  const caminhoScript = path.join(__dirname, '..', '..', 'backend', 'plugin_loader.py');

  return new Promise((resolve, reject) => {
    execFile('python', [caminhoScript, pluginName, caminhoAudio], (err, stdout, stderr) => {
      if (err) {
        console.error('Erro ao executar plugin:', stderr || err.message);
        return reject(stderr || err.message);
      }
      resolve(stdout.trim());
    });
  });
});

// 📥 Upload de plugin (.py)
ipcMain.handle('CK/upload-plugin', async (_, caminhoPlugin) => {
  try {
    const nome = path.basename(caminhoPlugin);
    const destinoDir = path.join(__dirname, '..', 'backend', 'plugins');
    const destino = path.join(destinoDir, nome);

    // Garante que a pasta backend/plugins existe
    fs.mkdirSync(destinoDir, { recursive: true });

    // Copia o plugin
    fs.copyFileSync(caminhoPlugin, destino);

    return { sucesso: true, nome };
  } catch (e) {
    return { sucesso: false, erro: e.message };
  }
});

// Seleção de plugin 
ipcMain.handle('selecionar-plugin', async () => {
  const result = await dialog.showOpenDialog({
    filters: [{ name: 'Plugin Python', extensions: ['py'] }],
    properties: ['openFile']
  });
  return result.canceled ? null : result.filePaths;
});