import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXAD2r8_uwUpwYati-mcc00AyzI6XNGgk",
  authDomain: "musicam-data.firebaseapp.com",
  databaseURL: "https://musicam-data-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "musicam-data",
  storageBucket: "musicam-data.appspot.com",
  messagingSenderId: "1031964669501",
  appId: "1:1031964669501:web:de0fdc24b205ff6367dc54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db }
