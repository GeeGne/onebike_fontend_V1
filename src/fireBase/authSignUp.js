import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, RecaptchaVerifier} from "firebase/auth";
import firebaseConfig from "/src/fireBase/confige";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
  'size': 'invisible',
  'callback': (response) => {
    console.log('hi');
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  }
});

