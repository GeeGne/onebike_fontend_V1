import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, RecaptchaVerifier} from "firebase/auth";
import firebaseConfig from "/src/firebase/config";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

function initializeRecaptcha () {
  return new RecaptchaVerifier(auth, 'sign-in', {
    'size': 'invisible',
    'callback': (response) => {
    }
  });
}

export default initializeRecaptcha;









