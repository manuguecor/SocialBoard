// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnXN0Ep5rz6Y1U80_SnRTG1R6vO3mk88U",
  authDomain: "socialboard-tfm.firebaseapp.com",
  projectId: "socialboard-tfm",
  storageBucket: "socialboard-tfm.firebasestorage.app",
  messagingSenderId: "990460414102",
  appId: "1:990460414102:web:e0501eb4195b93fcc19ab7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);