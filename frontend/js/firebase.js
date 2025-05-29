import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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

const auth = getAuth();

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });