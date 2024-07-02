import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
import firebaseConfig from "/src/firebase/config";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {app, analytics, auth, RecaptchaVerifier, createUserWithEmailAndPassword, signInWithPhoneNumber, signOut, updateProfile };


