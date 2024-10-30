import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// Firebase configuration object from your Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyA6D1D1JR5grffgnJrIgY2KAztkngiETZk",
  authDomain: "airline-8dcac.firebaseapp.com",
  projectId: "airline-8dcac",
  storageBucket: "airline-8dcac.appspot.com",
  messagingSenderId: "903852139863",
  appId: "1:903852139863:web:d26171b8105eb0f5fa0a12",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

