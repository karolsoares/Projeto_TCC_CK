  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAH8gcvp3FHz0QRwKu2DdXY2zQBMX33LY",
  authDomain: "projeto-tcc-dbcb0.firebaseapp.com",
  projectId: "projeto-tcc-dbcb0",
  storageBucket: "projeto-tcc-dbcb0.firebasestorage.app",
  messagingSenderId: "303825797036",
  appId: "1:303825797036:web:3c7f3106564a25850fc409"
};

const app = initializeApp(firebaseConfig);

//const auth = getAuth();

//createUserWithEmailAndPassword(auth, email, password)
//  .then((userCredential) => {
//    const user = userCredential.user;
//    message.textContent = "Usuário cadastrado com sucesso!";
//    message.style.color = "green";
//    console.log("Usuário:", user);
//  })
//  .catch((error) => {
//    message.textContent = `Erro: ${error.message}`;
//    message.style.color = "red";
//    console.error("Erro:", error.code, error.message);
//  });