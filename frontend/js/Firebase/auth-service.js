// js/Firebase/auth-service.js
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
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
