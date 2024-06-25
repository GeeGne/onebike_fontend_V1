// HOOKS
import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

// FIREBASE
import {auth} from '/src/firebase/authSignUp.js';
import {signOut, updateProfile, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";

// COMPONENTS
import OrderSummary from '/src/components/pages/checkout/OrderSummary';

// SCSS
import '/src/styles/components/pages/checkout/Checkout.scss';

// UTILS 
import Redirector from '/src/utils/Redirector';

// ASSETS
import filter from '/assets/img/icons/filter_list.svg';
import keyboardArrowDropDown from '/assets/img/icons/keyboard_arrow_down.svg';

// ASSETS - DARK MODE
import filterDarkMode from '/assets/img/icons/filter_list_darkMode.svg';
import keyboardArrowDropDownDarkMode from '/assets/img/icons/keyboard_arrow_down_darkMode.svg';

function Checkout ({darkMode, lan}) {
  
  const {pathname} = window.location;

  return (
    <div className="checkout">
      <section className="checkout__orderSummary-top">
        <div className="checkout__orderSummary-top__show">
          <span className="checkout__orderSummary-top__show__text">Show order summary </span>
          <img className="checkout__orderSummary-top__show__arrow" src={keyboardArrowDropDown} />
          <span className="checkout__orderSummary-top__show__total">S.P 50000</span>
        </div>
        <div classsName="checkout__orderSummary-top__show__order-box"><OrderSummary darkMode={darkMode} lan={lan} /></div>
      </section>
    </div>
  )
}

export default Checkout;