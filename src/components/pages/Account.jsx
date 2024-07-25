// HOOKS
import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

// FIREBASE
import {auth} from '/src/firebase/authSignUp.js';
import {signOut, updateProfile, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";

// SCSS
import '/src/styles/components/pages/Account.scss';

// UTILS 
import Redirector from '/src/utils/Redirector';

function Account ({darkMode, lan}) {

  const pageURL = window.location.href;
  const siteName = "ONEBIKE";
  const pageTitle = "My Account - ONEBIKE";
  const pageDescription = "Manage your account details, view your orders, and update your preferences on ONEBIKE.";
  const pageKeywords = "ONEBIKE, account, manage account, orders, preferences, bicycle, bicycle parts, Syria";
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
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageURL} />
        {/* <meta property="og:image" content="https://onebike-b622f.web.app/path/to/your/image.jpg" /> */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
      </Helmet>
      <div className="account">
        welcome {user?.displayName}
      </div>
      <button onClick={handleClick}>Sign Out</button>
    </>
  )
}

export default Account;