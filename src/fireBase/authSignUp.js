import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
import firebaseConfig from "/src/firebase/config";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, analytics, auth, RecaptchaVerifier, createUserWithEmailAndPassword, signInWithPhoneNumber, signOut, updateProfile };




