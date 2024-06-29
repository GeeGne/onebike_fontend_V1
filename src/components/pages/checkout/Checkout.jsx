// HOOKS
import React, {useState, useRef, useEffect, useContext} from 'react';
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
import {CartContext} from '/src/utils/myContext.js';

// ASSETS
import filter from '/assets/img/icons/filter_list.svg';
import keyboardArrowDropDown from '/assets/img/icons/keyboard_arrow_down.svg';

// ASSETS - DARK MODE
import filterDarkMode from '/assets/img/icons/filter_list_darkMode.svg';
import keyboardArrowDropDownDarkMode from '/assets/img/icons/keyboard_arrow_down_darkMode.svg';

function Checkout ({darkMode, lan}) {
  
  const cart = useContext(CartContext);
  const [order, setOrder] = useState({
    orderId: '',
    timestamp: '',
    products: '',
    total: '',
  });

  const orderSummaryTopEL = useRef(null);
  const orderSummaryTopShowEL = useRef(null);
  const orderSummaryTopShowArrowEL = useRef(null);
  const orderSummaryTopShowTextEL = useRef(null);
  const en = lan === 'en';

  console.log('checkOut', cart);
  useEffect(() => {

  }, [])

  const handleClick = e => {
    const toggleExpandDataATT = (el, expand) => el.dataset.expand = String(!expand);
    const {type} = e.currentTarget.dataset;
    switch (type) {
      case 'toggle_orderSummary':
        const expand = e.currentTarget.dataset.expand === 'false' ? false : true;
        const orderSummaryHeight = orderSummaryTopEL.current.scrollHeight;
        const orderSummaryShowHeight = orderSummaryTopShowEL.current.scrollHeight;

        if (expand) {
          orderSummaryTopEL.current.style.maxHeight = String(orderSummaryShowHeight) + 'px';
          orderSummaryTopShowArrowEL.current.style.transform = 'rotate(0deg)';
          orderSummaryTopShowTextEL.current.style.fontWeight = '400';
          orderSummaryTopShowTextEL.current.style.textContent = en? 'Show order summary' : 'عرض ملخص الطلب';
        } else {
          orderSummaryTopEL.current.style.maxHeight = String(orderSummaryHeight) + 'px';
          orderSummaryTopShowArrowEL.current.style.transform = 'rotate(180deg)';
          orderSummaryTopShowTextEL.current.style.fontWeight = '600';
          orderSummaryTopShowTextEL.current.style.textContent = en? 'Hide order summary' : 'اخفاء ملخص الطلب';
        }
        toggleExpandDataATT(e.currentTarget, expand);
        break;
      default:
        console.error('Error: Unknown type: ' + type);
    }
  }

  return (
    <div className="checkout">
      <section className="checkout__orderSummary-top" ref={orderSummaryTopEL}>
        <div className="checkout__orderSummary-top__show" role="button" tabIndex="0" data-expand="false" data-type="toggle_orderSummary" onClick={handleClick} ref={orderSummaryTopShowEL}>
          <span className="checkout__orderSummary-top__show__text" ref={orderSummaryTopShowTextEL}>Show order summary </span>
          <img className="checkout__orderSummary-top__show__arrow" src={keyboardArrowDropDown} ref={orderSummaryTopShowArrowEL} />
          <span className="checkout__orderSummary-top__show__total">S.P 50000</span>
        </div>
        <div className="checkout__orderSummary-top__show__order-box"><OrderSummary darkMode={darkMode} lan={lan} /></div>
      </section>
    </div>
  )
}

export default Checkout;