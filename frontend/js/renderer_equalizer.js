const btnSelecionar = document.getElementById('btnSelecionar');
const btnProcessar = document.getElementById('btnProcessar');
const btnVoltar = document.getElementById('btnVoltar');
const status = document.getElementById('status');

let caminhoArquivoSelecionado = null;

btnSelecionar.addEventListener('click', async () => {
  try {
    const caminho = await window.electronAPI.selecionarAudio();
    if (!caminho) {
      status.innerText = 'Nenhum arquivo selecionado.';
      caminhoArquivoSelecionado = null;
      return;
    }
    caminhoArquivoSelecionado = caminho;
    status.innerText = `Arquivo selecionado: ${caminhoArquivoSelecionado}`;
  } catch (e) {
    console.error(e);
    status.innerText = 'Erro ao selecionar o arquivo.';
  }
});

btnProcessar.addEventListener('click', async () => {
  if (!caminhoArquivoSelecionado) {
    status.innerText = 'Selecione um arquivo WAV primeiro.';
    return;
  }

  const ganhos = [];
  for (let i = 1; i <= 10; i++) {
    const valor = parseFloat(document.getElementById(`band${i}`).value);
    if (isNaN(valor)) {
      status.innerText = `Valor inválido na banda ${i}.`;
      return;
    }
    ganhos.push(valor);
  }

  btnProcessar.disabled = true;
  status.innerText = 'Processando áudio, aguarde...';

  try {
    const caminhoSaida = await window.electronAPI.aplicarEqualizacao(
      caminhoArquivoSelecionado,
      ganhos
    );

    status.innerHTML = `
      Processado com sucesso!<br>
      <a href="file:///${caminhoSaida.replace(/\\/g, '/')}" target="_blank">Abrir arquivo equalizado</a><br>
      <code>${caminhoSaida}</code>
    `;
  } catch (e) {
    console.error(e);
    status.innerText = 'Erro ao processar o áudio.';
  } finally {
    btnProcessar.disabled = false;
  }
});

btnVoltar.addEventListener('click', () => {
  window.location.href = 'menu.html';
});