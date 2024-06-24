// HOOKS
import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

// FIREBASE
import {auth} from '/src/firebase/authSignUp.js';
import {signOut, updateProfile, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";

// SCSS
import '/src/styles/components/pages/Checkout.scss';

// UTILS 
import Redirector from '/src/utils/Redirector';

function Checkout ({darkMode, lan}) {
  
  const {pathname} = window.location;
  // const navigate = useNavigate();
  // const redirector = new Redirector(navigate); 
  // const [user, setUser] = useState(true);
// 
  // useEffect(() => redirector.checkout(pathname, user), [user]);
  // useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    // return () => unsubscribe();
  // }, []);

  return (
    <div className="checkout">
      hi
    </div>
  )
}

export default Checkout;