// HOOKS
import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

// FIREBASE
import {auth} from '/src/firebase/authSignUp.js';
import {signOut, updateProfile, signInWithEmailAndPassword} from "firebase/auth";

// SCSS
import '/src/styles/components/pages/Account.scss';

function Account () {
  signOut(auth);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const redirectNoAuthenticated = () => {
    const {pathname} = window.location;
    if (!user && (pathname === '/account' || pathname === '/account/')) {
      navigate('/account/login');
    } 
  }

  useEffect(() => {    
    const fetchData = async () => {
      try {
        const {pathname} = window.location;
        const user = await auth.currentUser;
        setUser(user);
        redirectNoAuthenticated();
        if (!user) throw new Error('Note: user isn\'t signed it or unable to fetch user data')
      } catch (err) {
        console.warn(err)
      }
    }

    fetchData();
  }, [])

  return (
    <>
    {user ?
      <div className="account">
        welcome {user.displayName}
      </div> : <></>}
    </>
  )
}

export default Account;