// HOOKS
import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

// FIREBASE
import {auth} from '/src/firebase/authSignUp.js';
import {signOut, updateProfile, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";

// SCSS
import '/src/styles/components/pages/Account.scss';

// UTILS 
import Redirector from '/src/utils/Redirector';

function Account ({darkMode, lan}) {
  const en = lan === 'en';
  const [user, setUser] = useState(true);
  const {pathname} = window.location;
  const navigate = useNavigate();
  const redirector = new Redirector(navigate);
  
  useEffect(() => redirector.account(pathname, user), [user]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsubscribe();
  }, []);

  const handleClick = async () => {
    const response = await signOut(auth);
    // console.log(response);
  }

  return (
    <>
      <div className="account">
        welcome {user?.displayName}
      </div>
      <button onClick={handleClick}>Sign Out</button>
    </>
  )
}

export default Account;