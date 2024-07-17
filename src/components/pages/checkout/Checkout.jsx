// HOOKS
import React, {useState, useRef, useEffect, useContext, useReducer} from 'react';
import {useNavigate} from 'react-router-dom';

// FIREBASE
import {auth} from '/src/firebase/authSignUp.js';
import {signOut, updateProfile, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";

// COMPONENTS
import OrderSummary from '/src/components/pages/checkout/OrderSummary';

// DATA
import oneBike, {citiesAndShippingFee} from '/src/data/one-bike.json';

// SCSS
import '/src/styles/components/pages/checkout/Checkout.scss';

// STORE
import {useCartStore} from '/src/store/store';

// REDUCERS
import orderReducer from '/src/reducers/orderReducer';

// UTILS 
import Redirector from '/src/utils/Redirector';
import {CartContext} from '/src/utils/myContext.js';
import formatNumberWithCommas from '/src/utils/formatNumberWithCommas';
import getCurrentDateFormat from '/src/utils/getCurrentDateFormat';

// ASSETS
import filter from '/assets/img/icons/filter_list.svg';
import keyboardArrowDropDown from '/assets/img/icons/keyboard_arrow_down.svg';

// ASSETS - DARK MODE
import filterDarkMode from '/assets/img/icons/filter_list_darkMode.svg';
import keyboardArrowDropDownDarkMode from '/assets/img/icons/keyboard_arrow_down_darkMode.svg';

function Checkout ({darkMode, lan}) {
  const en = lan === 'en';

  const cart = useCartStore(state => state.cart);
  const [order, dispatch] = useReducer(orderReducer, {
    orderId: 1,
    timestamp: '',
    products: [],
    deliverTo: '',
    shipping: 0,
    total: '',
  })
  const {total, shipping} = order;
  const [cityDelivery, setCityDelivery] = useState('');
  useEffect(() => {setCityDelivery(en ? 'Pick your City' : 'اختر مدينتك')}, [])

  const orderSummaryTopEL = useRef(null);
  const orderSummaryTopShowEL = useRef(null);
  const orderSummaryTopShowArrowEL = useRef(null);
  const orderSummaryTopShowTextEL = useRef(null);
  const pickCityInpEL = useRef(null);

  console.log('checkOut order: ', order);
  useEffect(() => dispatch({type: 'UPDATE_PRODUCTS', cart}), [cart])

  const handleClick = e => {
    e.stopPropagation();

    const toggleExpandDataATT = (el, expand) => el.dataset.expand = String(!expand);
    const {type, shippingFee, city} = e.currentTarget.dataset;

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
      case 'update_shipping_fee_and_inp':
        const selectedCity = e.target.textContent;
        setCityDelivery(selectedCity);
        dispatch({type, shippingFee: Number(shippingFee), city})
        pickCityInpEL.current.classList.remove('focus');
        break;
      case 'city-inp-to-focus':
        pickCityInpEL.current.focus();
        break;
      default:
        console.error('Error: Unknown type: ' + type);
    }
  }

  const handleFocus = e => {
    e.target.classList.add('focus');
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log('hi');
  }

  return (
    <div className="checkout">
      <section className="checkout__orderSummary-top" ref={orderSummaryTopEL}>
        <div className="checkout__orderSummary-top__show" role="button" tabIndex="0" data-expand="false" data-type="toggle_orderSummary" onClick={handleClick} ref={orderSummaryTopShowEL}>
          <span className="checkout__orderSummary-top__show__text" ref={orderSummaryTopShowTextEL}>{en ? 'Show order summary' : 'عرض ملخص الطلب'}</span>
          <img className="checkout__orderSummary-top__show__arrow" src={darkMode ? keyboardArrowDropDownDarkMode : keyboardArrowDropDown} ref={orderSummaryTopShowArrowEL} />
          <span className="checkout__orderSummary-top__show__total">{en ? 'S.P ' : 'ل.س '}{formatNumberWithCommas(total + shipping)}</span>
        </div>
        {/* <div className="checkout__orderSummary-top__show__order-box"> */}
          <OrderSummary darkMode={darkMode} lan={lan} order={order} />
        {/* </div> */}
      </section>
      <section className="checkout__btm-sec"> 
        <div className="checkout__btm-sec__delivery">
          <label className="checkout__btm-sec__delivery__lbl" htmlFor="delivery">{en ? 'Deliver to' : 'الشحن الى'}</label>
          <div className="checkout__btm-sec__delivery__inp-cont" data-type="city-inp-to-focus" onClick={handleClick}> 
            <input className="checkout__btm-sec__delivery__inp-cont__inp" value={cityDelivery} type="text" id="delivery" readOnly onFocus={handleFocus} ref={pickCityInpEL}/>
            <ul className="checkout__btm-sec__delivery__inp-cont__lst">
              {citiesAndShippingFee.map(item => 
              <li className="checkout__btm-sec__delivery__inp-cont__lst__itm" key={item.id} data-type="update_shipping_fee_and_inp" data-shipping-fee={item.fee} data-city={item.city.en} onClick={handleClick}>{item.city[lan]}</li>          
              )}
            </ul>
          </div>
          <div className="checkout__btm-sec__delivery__fee-cont">
            <span className="checkout__btm-sec__delivery__fee-cont__shipping-fee">{en ? 'Shipping fee:' : 'رسوم الشحن'}</span>
            <span className="checkout__btm-sec__delivery__fee-cont__total">{shipping === 0 ? '--' : ((en ? 'S.P ' : 'ل.س ') + shipping)}</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Checkout;