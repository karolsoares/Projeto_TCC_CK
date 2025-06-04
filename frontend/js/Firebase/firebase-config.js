// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCAH8gcvp3FHz0QRwKu2DdXY2zQBMX33LY",
  authDomain: "projeto-tcc-dbcb0.firebaseapp.com",
  projectId: "projeto-tcc-dbcb0",
  storageBucket: "projeto-tcc-dbcb0.firebasestorage.app",
  messagingSenderId: "303825797036",
  appId: "1:303825797036:web:3c7f3106564a25850fc409"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta instância do auth
export const auth = getAuth(app);
