// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQ_PdilsCoqzLNtVw5E850dhuJcfeRyM0",
  authDomain: "auth-97203.firebaseapp.com",
  projectId: "auth-97203",
  storageBucket: "auth-97203.firebasestorage.app",
  messagingSenderId: "589382511252",
  appId: "1:589382511252:web:64794cb9babd7adb1a2281",
  measurementId: "G-R2R1G31NRR",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
