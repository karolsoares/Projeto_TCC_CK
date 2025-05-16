// Referências aos elementos da página
const btnSelecionar = document.getElementById('btnSelecionar');
const btnVoltar = document.getElementById('btnVoltar');
const btnProcessar = document.getElementById('btnProcessar');
const status = document.getElementById('status');

// Atualiza o texto dos valores dos sliders em tempo real
for(let i = 1; i <= 10; i++) {
  const slider = document.getElementById(`band${i}`);
  const label = document.getElementById(`val${i}`);
  slider.addEventListener('input', () => {
    label.innerText = slider.value;
  });
}

// Função para transformar caminho Windows em URL file:/// válida
function caminhoParaFileUrl(caminho) {
  return 'file:///' + caminho.replace(/\\/g, '/');
}

let caminhoArquivoSelecionado = null; // Guarda o caminho do arquivo WAV selecionado

// Botão selecionar arquivo WAV
btnSelecionar.addEventListener('click', async () => {
  const caminho = await window.electronAPI.selecionarAudio();
  if (!caminho) {
    status.innerText = 'Nenhum arquivo selecionado.';
    caminhoArquivoSelecionado = null;
    return;
  }
  caminhoArquivoSelecionado = caminho;
  status.innerText = `Arquivo selecionado: ${caminhoArquivoSelecionado}`;
});

// Botão processar áudio com equalizador
btnProcessar.addEventListener('click', async () => {
  if (!caminhoArquivoSelecionado) {
    status.innerText = 'Selecione um arquivo WAV primeiro.';
    return;
  }

  status.innerText = 'Processando áudio, aguarde...';

  // Pega os valores dos ganhos dos sliders em array (string para float)
  const ganhos = [];
  for(let i = 1; i <= 10; i++) {
    ganhos.push(parseFloat(document.getElementById(`band${i}`).value));
  }

  try {
    // Chama o backend, passando o arquivo de entrada, arquivo de saída e ganhos como string CSV
    const caminhoSaida = await window.electronAPI.equalizarAudio(
      caminhoArquivoSelecionado,
      ganhos.join(',')
    );

    // Converte para file URL para link
    const fileUrl = caminhoParaFileUrl(caminhoSaida);

    status.innerHTML = `Processado com sucesso! <br><a href="${fileUrl}">Abrir arquivo equalizado</a>`;
  } catch (e) {
    status.innerText = 'Erro ao processar o áudio.';
    console.error(e);
  }
});

// Botão voltar para menu
btnVoltar.addEventListener('click', () => {
  window.location.href = 'menu.html';
});