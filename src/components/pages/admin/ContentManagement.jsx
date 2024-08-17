// HOOKS
import React, {useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// SCSS
import '/src/styles/components/pages/admin/ContentManagement.scss';

// COMPONENTS
import Alert from '/src/components/Alert';
import BreadCrumb from '/src/components/BreadCrumb';

// FIREBASE
import {auth} from "/src/firebase/authSignUp";
import {signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail} from "firebase/auth";
import {db} from '/src/firebase/fireStore';
import {getDoc, doc, collection, getDocs} from 'firebase/firestore';

// UTILS
import Redirector from '/src/utils/Redirector';

// ASSETS
import img from '/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg';
import doubleArrowPrimary from '/assets/img/icons/keyboard_double_arrow_right_primary.svg';
import heart from '/assets/img/icons/heart.svg';
import heartFill from '/assets/img/icons/heart_fill.svg';

// ASSETS - DARKMODE
import doubleArrowSecondary from '/assets/img/icons/keyboard_double_arrow_right_secondary.svg';
import heartDarkMode from '/assets/img/icons/heart_darkMode.svg';

function ContentManagement ({darkMode, lan}) {
  
  const [ user, setUser ] = useState(true);
  const [ userData, setUserData ] = useState({admin: true});
  const [ headToAdmin, setHeadToAdmin ] = useState(false);

  const en = lan === 'en';
  const { pathname } = window.location;
  const navigate = useNavigate();
  const redirector = new Redirector(navigate);

  useEffect(() => {
    redirector.admin(pathname, user, userData);
  }, [userData])

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists) {
            setUserData(userDoc.data());
          } else {
            throw new Error("No such document!");
          }
        }    
      } catch (err) {
        console.error(err);
      }
    }

    const fetchData = async () => {
      await fetchUserData();
      // redirector.admin(pathname, user, userData);
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => setUser(user));
    return () => unsubscribe();
  }, []);
  console.log('user', user);
  console.log('userData', userData);

  return (
    <div className="cm">
      <section className="cm__breadCrumb-sec">
        <BreadCrumb type={{en: 'admin', ar: 'ادمن'}} category={{en: 'account', ar: 'الحساب'}} lan={lan} />
      </section>
      <section className="cm__title-sec">
        <h1 className="cm__title-sec__h1">{en ? 'Content Management' : 'اداره المحتوى'}</h1>
      </section>
      <section className="cm__cntnt-sec">
        <div className="cm__cntnt-sec__header-row">
          <span className="cm__cntnt-sec__header-row__spn">{en ? 'Name' : 'الاسم'}</span>
          <span className="cm__cntnt-sec__header-row__spn">{en ? 'ID' : 'رمز'}</span>
          <span className="cm__cntnt-sec__header-row__spn">{en ? 'price' : 'السعر'}</span>
          {/* <span className="cm__cntnt-sec__header-row__spn">{en ? 'discount' : 'تخفيض'}</span> */}
        </div>
        <ul className="cm__cntnt-sec__lst">
          <li className="cm__cntnt-sec__lst__itm">
            <div className="cm__cntnt-sec__lst__itm__cont">
            <img className="cm__cntnt-sec__lst__itm__cont__img" src={img} />
            <span className="cm__cntnt-sec__lst__itm__cont__title">{en ? "GIYO Small Bike tire Pump Schrader" : 'منفاخ هوائي متنقل'}</span>
            </div>
            <div className="cm__cntnt-sec__lst__itm__cont">
            <span className="cm__cntnt-sec__lst__itm__cont__id">FJjo3$%jfa#@</span>
            </div>
            <div className="cm__cntnt-sec__lst__itm__cont">
            <span className="cm__cntnt-sec__lst__itm__cont__price">200</span>{' - '}
            <span className="cm__cntnt-sec__lst__itm__cont__discount">4%</span>
            </div>
          </li>
          <li className="cm__cntnt-sec__lst__itm">
            <div className="cm__cntnt-sec__lst__itm__cont">
            <img className="cm__cntnt-sec__lst__itm__cont__img" src={img} />
            <span className="cm__cntnt-sec__lst__itm__cont__title">{en ? "GIYO Small Bike tire Pump Schrader" : 'منفاخ هوائي متنقل'}</span>
            </div>
            <div className="cm__cntnt-sec__lst__itm__cont">
            <span className="cm__cntnt-sec__lst__itm__cont__id">FJjo3$%jfa#@</span>
            </div>
            <div className="cm__cntnt-sec__lst__itm__cont">
            <span className="cm__cntnt-sec__lst__itm__cont__price">200</span>{' - '}
            <span className="cm__cntnt-sec__lst__itm__cont__discount">4%</span>
            </div>
          </li>
          <li className="cm__cntnt-sec__lst__itm">
            <div className="cm__cntnt-sec__lst__itm__cont">
            <img className="cm__cntnt-sec__lst__itm__cont__img" src={img} />
            <span className="cm__cntnt-sec__lst__itm__cont__title">{en ? "GIYO Small Bike tire Pump Schrader" : 'منفاخ هوائي متنقل'}</span>
            </div>
            <div className="cm__cntnt-sec__lst__itm__cont">
            <span className="cm__cntnt-sec__lst__itm__cont__id">FJjo3$%jfa#@</span>
            </div>
            <div className="cm__cntnt-sec__lst__itm__cont">
            <span className="cm__cntnt-sec__lst__itm__cont__price">200</span>{' - '}
            <span className="cm__cntnt-sec__lst__itm__cont__discount">4%</span>
            </div>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default ContentManagement;