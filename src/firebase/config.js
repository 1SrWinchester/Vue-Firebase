import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmoHCf7McJ64Jph-SBZ0e0HSMfjR3gRsA",
  authDomain: "gestor-de-viajes-d840b.firebaseapp.com",
  projectId: "gestor-de-viajes-d840b",
  storageBucket: "gestor-de-viajes-d840b.firebasestorage.app",
  messagingSenderId: "61764809729",
  appId: "1:61764809729:web:461cfee4730fc48f997c00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export default app