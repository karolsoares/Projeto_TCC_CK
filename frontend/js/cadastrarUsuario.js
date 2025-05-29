import { app } from './firebase'

//Naveção entre páginas
document.addEventListener('DOMContentLoaded', () => {
  const btnCadastrar = document.getElementById('btnCadastrar');
  const btnVoltar = document.getElementById('btnVoltar');

  if (btnCadastrar) {
    btnCadastrar.addEventListener('click', () => {
      // Navega para a página de redução de ruído
      window.location.href = 'menu.html';
    });
  }

  if (btnVoltar) {
    btnVoltar.addEventListener('click', () => {
      // Navega para a página de equalização
      window.location.href = 'login.html';
    });
  }
});