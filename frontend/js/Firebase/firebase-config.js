
// js/firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"

const firebaseConfig = {
  apiKey: window.env.API_KEY,
  authDomain: window.env.AUTH_DOMAIN,
  projectId: window.env.PROJECT_ID,
  storageBucket: window.env.STORAGE_BUCKET,
  messagingSenderId: window.env.MESSAGING_SENDER_ID,
  appId: window.env.APP_ID
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta instância do auth
export const auth = getAuth(app);
