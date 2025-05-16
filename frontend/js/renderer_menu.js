// Espera o carregamento completo da página
document.addEventListener('DOMContentLoaded', () => {
  const btnReduzirRuido = document.getElementById('btnReduzirRuido');
  const btnEqualizador = document.getElementById('btnEqualizador');

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
});