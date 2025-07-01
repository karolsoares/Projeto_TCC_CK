// Obtém referências aos elementos da página
const btnSelecionar = document.getElementById('btnSelecionar');
const btnVoltar = document.getElementById('btnVoltar');
const status = document.getElementById('status');
const btnModelo1 = document.getElementById('btnModelo1');
const btnModelo2 = document.getElementById('btnModelo2');

// Função para transformar caminho Windows em URL file:/// válida
function caminhoParaFileUrl(caminho) {
  return 'file:///' + caminho.replace(/\\/g, '/');
}

// Quando o botão for clicado,  processa o áudio no modelo  de vozes e instrumentos
btnModelo1.addEventListener('click', async () => {
  const caminho = await window.electronAPI.selecionarAudio();
  const modelo = 'UVR_MDXNET_KARA.onnx';

  if (!caminho) {
    mostrarStatus('Nenhum arquivo selecionado');
    return;
  }
  mostrarStatus('Processando áudio, aguarde...');
  executarSeparacao(caminho, modelo)

});


// Quando o botão for clicado,  processa o áudio no modelo  de vozes, bateria e baixo
btnModelo2.addEventListener('click', async () => {
  const caminho = await window.electronAPI.selecionarAudio();
  const modelo = 'hdemucs_mmi.yaml';

  if (!caminho) {
    mostrarStatus('Nenhum arquivo selecionado');
    return;
  }
  mostrarStatus('Processando áudio, aguarde...');
  executarSeparacao(caminho, modelo)

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
// Função auxiliar para enviar modelo
async function executarSeparacao(caminho, modelo) {
  try {
    const saidas = await window.electronAPI.aplicarSeparacao(caminho, modelo); // retorna array

    if (!Array.isArray(saidas) || saidas.length === 0) {
      mostrarStatus('Nenhum arquivo de saída gerado.');
      return;
    }

    // Cria links para os arquivos de saída
    const links = saidas.map(path => {
      const fileUrl = caminhoParaFileUrl(path);
      const nomeArquivo = path.split(/[/\\]/).pop(); // extrai nome do arquivo
      return `<li><a href="${fileUrl}" target="_blank">${nomeArquivo}</a></li>`;
    }).join('');

    mostrarStatus(`Processado com sucesso!<br><ul>${links}</ul>`, true);

  } catch (e) {
    mostrarStatus('Erro ao processar o áudio.');
    console.error(e);
  }
}