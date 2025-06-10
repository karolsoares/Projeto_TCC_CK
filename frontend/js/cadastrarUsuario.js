// js/cadastrarUsuario.js
import { cadastrarUsuario } from "./Firebase/auth-service.js";

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("senha");
  const btnCadastrar = document.getElementById("btnCadastrar");
  const btnVoltar = document.getElementById("btnVoltar");
  const mensagem = document.getElementById("message");

  if (btnCadastrar) {
    btnCadastrar.addEventListener("click", async () => {
      const email = emailInput.value;
      const password = passwordInput.value;

      try {
        await cadastrarUsuario(email, password);
        window.location.href = "menu.html";
      } catch (error) {
        console.error(error);
        mensagem.textContent = `Erro ao cadastrar: ${error.message}`;
      }
    });
  }

  if (btnVoltar) {
    btnVoltar.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
});
