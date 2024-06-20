// HOOKS
import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

// FIREBASE
import {auth} from '/src/firebase/authSignUp.js';
import {signOut, updateProfile, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";

// SCSS
import '/src/styles/components/pages/Account.scss';

function Account () {
  const [user, setUser] = useState(true);
  const navigate = useNavigate();

  useEffect(() => redirectNoAuthenticated(), [user])
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsubscribe();
  }, []);

  const redirectNoAuthenticated = () => {
    const {pathname} = window.location;
    if (!user && (pathname === '/account' || pathname === '/account/')) navigate('/account/login');
  }

  const handleClick = async () => {
    const response = await signOut(auth);
    console.log(response);
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