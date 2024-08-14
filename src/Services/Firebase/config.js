import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3iSD6wCagLNYa2mTNhAGcopMNWiN3TZ8",
  authDomain: "bleakestore.firebaseapp.com",
  projectId: "bleakestore",
  storageBucket: "bleakestore.appspot.com",
  messagingSenderId: "403858457641",
  appId: "1:403858457641:web:a722383ed85003c3438838"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)