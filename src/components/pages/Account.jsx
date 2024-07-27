// HOOKS
import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

// FIREBASE
import {auth} from '/src/firebase/authSignUp.js';
import {signOut, updateProfile, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import {db} from '/src/firebase/fireStore';
import {setDoc, updateDoc, getDoc, doc} from 'firebase/firestore';

// SCSS
import '/src/styles/components/pages/Account.scss';

// UTILS 
import Redirector from '/src/utils/Redirector';
import formatPhoneNumber from '/src/utils/formatPhoneNumber';

// ASSETS
import personIcon from '/assets/img/icons/person.svg';

// ASSETS - DARKMODE
import personDarkModeIcon from '/assets/img/icons/person_darkMode.svg';

function Account ({darkMode, lan}) {

  const pageURL = window.location.href;
  const siteName = "ONEBIKE";
  const pageTitle = "My Account - ONEBIKE";
  const pageDescription = "Manage your account details, view your orders, and update your preferences on ONEBIKE.";
  const pageKeywords = "ONEBIKE, account, manage account, orders, preferences, bicycle, bicycle parts, Syria";
  const en = lan === 'en';

  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(true);
  const {pathname} = window.location;
  const navigate = useNavigate();
  const redirector = new Redirector(navigate);

  const topBarSliderEL = useRef(null);
  const myInfoEL = useRef(null);
  const ordersEL = useRef(null);

  useEffect(() => {
    redirector.account(pathname, user);
    const fetchUserData = async () => {
      try {
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists) {
            setUserData(userDoc.data());
          } else {
            console.log("No such document!");
          }
        }    
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserData();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsubscribe();
  }, []);

  console.log(userData);

  const handleClick = async e => {
    const {action} = e.currentTarget.dataset;

    switch (action) {
      case 'myInfo_is_clicked':
        topBarSliderEL.current.style.transform = 'scale(0.9)';
        setTimeout(() => {
          topBarSliderEL.current.style.transform = 'scale(1)';
          topBarSliderEL.current.style.left = '0%';
        }, 150)
        myInfoEL.current.style.color = 'var(--font-h-color)';
        ordersEL.current.style.color = 'var(--font-p-color)';
        break;
      case 'orders_is_clicked':
        topBarSliderEL.current.style.transform = 'scale(0.9)';
        setTimeout(() => {
          topBarSliderEL.current.style.transform = 'scale(1)';
          topBarSliderEL.current.style.left = '50%';
        }, 150)
        myInfoEL.current.style.color = 'var(--font-p-color)';
        ordersEL.current.style.color = 'var(--font-h-color)';
        break;
      case 'signOut_is_clicked':
        const response = await signOut(auth);
        break;
      default:
        console.error('Error: Unknown action', action);
    }
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
        <section className="account__banner">
          <div className="account__banner__pfp">
            <img className="account__banner__pfp__img" src={darkMode ? personIcon : personDarkModeIcon} />
          </div>
        </section>
        <section className="account__userName-sec">
          <h2 className="account__userName-sec__h2">{userData?.fullName}</h2>
        </section>
        <section className="account__userData">
          <div className="account__userData__top-bar">
            <div className="account__userData__top-bar__slider" ref={topBarSliderEL} />
            <span className="account__userData__top-bar__item" data-action="myInfo_is_clicked" onClick={handleClick} ref={myInfoEL}>My Info</span>
            <span className="account__userData__top-bar__item clicked" data-action="orders_is_clicked" onClick={handleClick} ref={ordersEL}>Orders</span>
          </div>
          <ul className="account__userData__description-cont">
            <li className="account__userData__description-cont__item">
              <span className="account__userData__description-cont__item__title">Mobile Phone</span> 
              <span className="account__userData__description-cont__item__description">{formatPhoneNumber(userData?.phone)}</span> 
            </li>
            <li className="account__userData__description-cont__item">
              <span className="account__userData__description-cont__item__title">Email Address</span> 
              <span className="account__userData__description-cont__item__description">{userData?.email}</span> 
            </li>
            <li className="account__userData__description-cont__item">
              <span className="account__userData__description-cont__item__title">ID</span> 
              <span className="account__userData__description-cont__item__description">{userData?.userId}</span> 
            </li>
          </ul>
        </section>
        <button className="account__signOut-btn" data-action="signOut_is_clicked" onClick={handleClick}>Sign Out</button>
      </div>
    </>
  )
}

export default Account;