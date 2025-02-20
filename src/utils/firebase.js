import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: process.env.FIREBASEAPI,
    authDomain: "adidas-7.firebaseapp.com",
    projectId: "adidas-7",
    storageBucket: "adidas-7.firebasestorage.app",
    messagingSenderId: "973667749343",
    appId: "1:973667749343:web:d5ee0c413e7a05c353886a"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)
  export const db=getFirestore(app)