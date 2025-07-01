// Espera o carregamento completo da página
document.addEventListener('DOMContentLoaded', () => {
  const btnReduzirRuido = document.getElementById('btnReduzirRuido');
  const btnEqualizador = document.getElementById('btnEqualizador');
  const btnSeparator = document.getElementById('btnSeparator');
  const btnPlugins = document.getElementById('btnPlugins'); 

  if (btnReduzirRuido) {
    btnReduzirRuido.addEventListener('click', () => {
      // Navega para a página de redução de ruído
      window.location.href = 'reducer.html';
    });
  }

  if (btnEqualizador) {
    btnEqualizador.addEventListener('click', () => {
      // Navega para a página de equalização
      window.location.href = 'equalizer.html';
    });
  }

   if (btnSeparator) {
    btnSeparator.addEventListener('click', () => {
      // Navega para a página de separação
      window.location.href = 'separator.html';
    });
  }

  if (btnPlugins) {
    btnPlugins.addEventListener('click', () => {
      // Navega para a página de plugins
      window.location.href = 'plugin_loader.html';
    });
  }
});
