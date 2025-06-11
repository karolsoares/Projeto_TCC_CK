// Obtém referências aos elementos da página
const btnSelecionar = document.getElementById('btnSelecionar');
const btnVoltar = document.getElementById('btnVoltar');
const status = document.getElementById('status');

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
    const saidas = await window.electronAPI.aplicarSeparacao(caminho); // agora retorna um array

    if (!Array.isArray(saidas) || saidas.length === 0) {
      mostrarStatus('Nenhum arquivo de saída gerado.');
      return;
    }

    //Cria links para os arquivos de saída
    const links = saidas.map(path => {
      const fileUrl = caminhoParaFileUrl(path);
      const nomeArquivo = path.split(/[/\\]/).pop(); // extrai apenas o nome
      return `<li><a href="${fileUrl}" target="_blank">${nomeArquivo}</a></li>`;
    }).join('');

    mostrarStatus(`Processado com sucesso!<br><ul>${links}</ul>`, true);
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
