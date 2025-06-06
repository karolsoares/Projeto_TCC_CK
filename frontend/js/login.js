import { loginUsuario } from "./Firebase/auth-service.js";

// Espera o carregamento completo da página
document.addEventListener('DOMContentLoaded', () => {
  const btnEntrar = document.getElementById('btnEntrar');
  const btnCastrarUsuario = document.getElementById('btnCastrarUsuario');
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("senha");
  const mensagem = document.getElementById("message");

  if (btnEntrar) {
    btnEntrar.addEventListener("click", async () => {
      const email = emailInput.value;
      const password = passwordInput.value;
  
      try {
        await loginUsuario(email, password);
        window.location.href = "menu.html";
      } catch (error) {
        console.error(error);
        mensagem.textContent = `Erro ao Logar Usuário: ${error.message}`;
        mensagem.style.color = "red";
      }
    });
  }

  if (btnCastrarUsuario) {
    btnCastrarUsuario.addEventListener('click', () => {
      // Navega para a página de equalização
      window.location.href = 'cadastrarUsuario.html';
    });
  }
});
