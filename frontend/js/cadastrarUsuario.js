// Certifique-se de que o Firebase já foi inicializado em outro lugar do projeto
// Exemplo:
//import { getAuth, createUserWithEmailAndPassword } from "./js/firebase.js";
//
//const auth = getAuth();

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("senha");
  const btnCadastrar = document.getElementById("btnCadastrar");
  const btnVoltar = document.getElementById("btnVoltar");
  const mensagem = document.getElementById("message");

  if (btnCadastrar) {
    btnCadastrar.addEventListener("click", () => {
      const email = emailInput.value();
      const password = passwordInput.value();

      if (!email || !password) {
        mensagem.textContent = "Por favor, preencha todos os campos.";
        mensagem.style.color = "red";
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          // Cadastro bem-sucedido
          window.location.href = "menu.html";
        })
        .catch((error) => {
          // Exibe mensagem de erro
          let msg = "Erro ao cadastrar.";
          if (error.code === "auth/email-already-in-use") {
            msg = "Este e-mail já está em uso.";
          } else if (error.code === "auth/invalid-email") {
            msg = "E-mail inválido.";
          } else if (error.code === "auth/weak-password") {
            msg = "A senha deve ter pelo menos 6 caracteres.";
          }

          mensagem.textContent = msg;
          mensagem.style.color = "red";
          console.error(error);
        });
    });
  }

  if (btnVoltar) {
    const btnVoltar = btnVoltar.value();
    btnVoltar.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
});
