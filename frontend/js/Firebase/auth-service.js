// js/Firebase/auth-service.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth } from "./firebase-config.js"; // caminho relativo ao arquivo

export async function cadastrarUsuario(email, password) {

  if (!email || !password) {
    throw new Error("E-mail e senha são obrigatórios.");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

export async function loginUsuario(email, password) {
  if (!email || !password) {
    throw new Error("E-mail e senha são obrigatórios.");
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

export async function informacoesUsuario() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user.email); // retorna o e-mail
      } else {
        resolve(null); // usuário deslogado
      }
    }, reject); // se houver erro na escuta
  });
}