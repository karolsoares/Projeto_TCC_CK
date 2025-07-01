document.getElementById('process').addEventListener('click', () => {
  const plugin = document.getElementById('plugin').value;
  const audioInput = document.getElementById('audio');
  const button = document.getElementById('process');

  if (!plugin) {
    alert('Por favor, selecione um plugin.');
    return;
  }

  if (audioInput.files.length === 0) {
    alert('Por favor, selecione um arquivo de áudio (.wav).');
    return;
  }

  const audioPath = audioInput.files[0].path;

  button.disabled = true;
  button.textContent = 'Processando...';

  window.electronAPI.executarPlugin(plugin, audioPath)
    .then((caminhoSaida) => {
      alert(`Processamento concluído!\n\nArquivo salvo em:\n${caminhoSaida}`);
    })
    .catch((error) => {
      console.error(error);
      alert('Ocorreu um erro durante o processamento.');
    })
    .finally(() => {
      button.disabled = false;
      button.textContent = 'Processar';
    });
});