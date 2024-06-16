// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, RecaptchaVerifier} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7ofNkR1Jju5zBMG04i5f-Fkqeywz9lWE",
  authDomain: "onebike-b622f.firebaseapp.com",
  projectId: "onebike-b622f",
  storageBucket: "onebike-b622f.appspot.com",
  messagingSenderId: "637059060579",
  appId: "1:637059060579:web:7f07ad06b733a1aef23956",
  measurementId: "G-YYKJLNGWZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
console.log(auth);