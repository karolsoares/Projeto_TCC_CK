

// Espera o carregamento completo da página
document.addEventListener('DOMContentLoaded', () => {
  const btnEntrar = document.getElementById('btnEntrar');
  const btnCastrarUsuario = document.getElementById('btnCastrarUsuario');

  if (btnEntrar) {
    btnEntrar.addEventListener('click', () => {
      // Navega para a página de redução de ruído
      window.location.href = 'menu.html';
    });
  }

  if (btnCastrarUsuario) {
    btnCastrarUsuario.addEventListener('click', () => {
      // Navega para a página de equalização
      window.location.href = 'cadastrarUsuario.html';
    });
  }
});
