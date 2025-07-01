// Obtém referências aos elementos da página
const btnSelecionar = document.getElementById('btnSelecionar');
const btnVoltar = document.getElementById('btnVoltar');
const slider = document.getElementById('intensidade');
const valorIntensidade = document.getElementById('valorIntensidade');
const status = document.getElementById('status');

// Atualiza o texto do valor da intensidade conforme o slider muda
slider.addEventListener('input', () => {
  valorIntensidade.innerText = slider.value;
});

// Função para transformar caminho Windows em URL file:/// válida
function caminhoParaFileUrl(caminho) {
  return 'file:///' + caminho.replace(/\\/g, '/');
}

// Quando o botão for clicado, abre diálogo para selecionar arquivo e processa o áudio
btnSelecionar.addEventListener('click', async () => {
  const caminho = await window.electronAPI.selecionarAudio();

  if (!caminho) {
    mostrarStatus('Nenhum arquivo selecionado.');
    return;
  }

  mostrarStatus('Processando áudio, aguarde...');

  try {
    const intensidade = slider.value;
    const saida = await window.electronAPI.reduzirRuido(caminho, intensidade);
    const fileUrl = caminhoParaFileUrl(saida);

    mostrarStatus(`Processado com sucesso! <br><a href="${fileUrl}">Abrir arquivo</a>`, true);
  } catch (e) {
    mostrarStatus('Erro ao processar o áudio.');
    console.error(e);
  }
});

// Botão para voltar ao menu
btnVoltar.addEventListener('click', () => {
  window.location.href = 'menu.html';
});

// Função auxiliar para mostrar status
function mostrarStatus(mensagem, isHtml = false) {
  if (isHtml) {
    status.innerHTML = mensagem;
  } else {
    status.innerText = mensagem;
  }
}