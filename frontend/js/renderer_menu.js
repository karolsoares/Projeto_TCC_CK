import { informacoesUsuario } from "./Firebase/auth-service.js";

// Espera o carregamento completo da página
document.addEventListener('DOMContentLoaded', async () => {
  const btnReduzirRuido = document.getElementById('btnReduzirRuido');
  const btnEqualizador = document.getElementById('btnEqualizador');
  const usuario = document.getElementById("usuario");

  const usuarioLogado = await informacoesUsuario();

  if (usuarioLogado) {
    usuario.textContent = usuarioLogado; // ou usuario.email se preferir
  } else {
    usuario.textContent = "Não autenticado";
    window.location.href = 'login.html';
  }


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

