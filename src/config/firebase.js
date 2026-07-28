// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBahMI8t4yDTQzpLKHiHPbRBb3ONe_kGI",
  authDomain: "mosaned-bot.firebaseapp.com",
  projectId: "mosaned-bot",
  storageBucket: "mosaned-bot.firebasestorage.app",
  messagingSenderId: "1055649064197",
  appId: "1:1055649064197:web:517631af24ec7b71b2436c",
  measurementId: "G-K5W0E2G03C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();