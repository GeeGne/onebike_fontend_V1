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
    newNumber: false,
    shipping: 0,
    total: '',
  })
  const {total, shipping} = order;
  const [cityDelivery, setCityDelivery] = useState('');
  useEffect(() => {
    if (!isInputDefault.current) return;
    setCityDelivery(en ? 'Pick your City' : 'اختر مدينتك')
  }, [lan])

  const orderSummaryTopEL = useRef(null);
  const orderSummaryTopShowEL = useRef(null);
  const orderSummaryTopShowArrowEL = useRef(null);
  const orderSummaryTopShowTextEL = useRef(null);
  const pickCityInpEL = useRef(null);
  const phoneNumberConInpEL = useRef(null);
  const phoneNumberInpEL = useRef(null);
  const phoneNumberLblEL = useRef(null);
  const isInputDefault = useRef(true);

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
        isInputDefault.current = false;
        setCityDelivery(selectedCity);
        dispatch({type, shippingFee: Number(shippingFee), city})
        break;
      case 'city_inp_to_focus':
        pickCityInpEL.current.focus();
        break;
      case 'toggle_phone_number_inp_to_focus':
        phoneNumberInpEL.current.focus();
        break;
      default:
        console.error('Error: Unknown type: ' + type);
    }
  }

  const handleFocus = e => {
    const {type} = e.currentTarget.dataset;

    switch (type) {
      case 'city_inp':
        e.target.classList.add('focus')
        break;
      case 'phone_number_inp':
        phoneNumberConInpEL.current.classList.add('focus');
        break;
      default:
        console.error('Error: Unknown type: ', type);
    }
  };

  const handleBlur = e => {
    const {type} = e.currentTarget.dataset;
    
    switch (type) {
      case 'city_inp':
        setTimeout(() => e.target.classList.remove('focus'), 100);
        break;
      case 'phone_number_inp':
        const isInputEmpty = phoneNumberInpEL.current.value === '';
        if (!isInputEmpty) return;
        phoneNumberConInpEL.current.classList.remove('focus');
        break;
      default:
        console.error('Error: Unknown type: ', type);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('hi');
  }

  const handleChange = e => {
    const {type} = e.currentTarget.dataset
    let newNumber;

    switch (type) {
      case 'default_number_is_selected':
        newNumber = false;
        dispatch({type, newNumber})
        phoneNumberConInpEL.current.style.maxHeight= '0px'
        setTimeout(() => {
          phoneNumberInpEL.current.style.opacity = '0';
          phoneNumberInpEL.current.style.transform = 'translateY(0.3em)';
          phoneNumberLblEL.current.style.opacity = '0';
          phoneNumberLblEL.current.style.transform = 'translateY(calc(-50% + 0.3em))';
          phoneNumberInpEL.current.value = '';
          phoneNumberConInpEL.current.classList.remove('focus');
        }, 250);
        break;
      case 'new_number_is_selected':
        newNumber = true;
        dispatch({type, newNumber})
        phoneNumberConInpEL.current.style.maxHeight = phoneNumberConInpEL.current.scrollHeight +'px';
        setTimeout(() => {
          phoneNumberInpEL.current.style.opacity = '1';
          phoneNumberInpEL.current.style.transform = 'translateY(0)';
          phoneNumberLblEL.current.style.opacity = '1';
          phoneNumberLblEL.current.style.transform = 'translateY(-50%)';
        }, 350);
        break;
      case 'phone_number_inp':
        newNumber = e.currentTarget.value;
        console.log ({newNumber})
        dispatch({type, newNumber})
        break;
      default:
        console.error('Error Unknown type:', type);
    }
  }

  return (
    <div className="checkout">
      <section className="checkout__orderSummary-sec" ref={orderSummaryTopEL}>
        <div className="checkout__orderSummary-sec__show" role="button" tabIndex="0" data-expand="false" data-type="toggle_orderSummary" onClick={handleClick} ref={orderSummaryTopShowEL}>
          <span className="checkout__orderSummary-sec__show__text" ref={orderSummaryTopShowTextEL}>{en ? 'Show order summary' : 'عرض ملخص الطلب'}</span>
          <img className="checkout__orderSummary-sec__show__arrow" src={darkMode ? keyboardArrowDropDownDarkMode : keyboardArrowDropDown} ref={orderSummaryTopShowArrowEL} />
          <span className="checkout__orderSummary-sec__show__total">{en ? 'S.P ' : 'ل.س '}{formatNumberWithCommas(total + shipping)}</span>
        </div>
        <OrderSummary darkMode={darkMode} lan={lan} order={order} />
      </section>
      <section className="checkout__orderSummary-largeLayout-sec">
        <span className="checkout__orderSummary-largeLayout-sec__title">{en ? 'Order summary' : 'ملخص الطلب'}</span>
        <OrderSummary darkMode={darkMode} lan={lan} order={order} />
      </section>
      <section className="checkout__delivery-sec"> 
        <label className="checkout__delivery-sec__lbl" htmlFor="delivery">{en ? 'Deliver to' : 'الشحن الى'}</label>
        <div className="checkout__delivery-sec__inp-cont" data-type="city_inp_to_focus" onClick={handleClick}> 
          <input className="checkout__delivery-sec__inp-cont__inp" value={cityDelivery} type="text" id="delivery" readOnly data-type="city_inp" onFocus={handleFocus} onBlur={handleBlur} ref={pickCityInpEL}/>
          <ul className="checkout__delivery-sec__inp-cont__lst">
            {citiesAndShippingFee.map(item => 
            <li className="checkout__delivery-sec__inp-cont__lst__itm" key={item.id} data-type="update_shipping_fee_and_inp" data-shipping-fee={item.fee} data-city={item.city.en} onClick={handleClick}>{item.city[lan]}</li>          
            )}
          </ul>
        </div>
        <div className="checkout__delivery-sec__fee-cont">
          <span className="checkout__delivery-sec__fee-cont__shipping-fee">{en ? 'Shipping fee:' : 'رسوم الشحن'}</span>
          <span className="checkout__delivery-sec__fee-cont__total">{shipping === 0 ? '--' : ((en ? 'S.P ' : 'ل.س ') + formatNumberWithCommas(shipping))}</span>
        </div>
      </section>
      <section className="checkout__phone-sec">
        <h2 className="checkout__phone-sec__h2">{en ? 'Contact Phone Number' : 'رقم الهاتف للتواصل'}</h2>
        <div className="checkout__phone-sec__radio-cont">
          <input className="checkout__phone-sec__radio-cont__inp" type="radio" id="existed-number" name="phone" data-type="default_number_is_selected" onChange={handleChange} />    
          <label className="checkout__phone-sec__radio-cont__lbl" htmlFor="existed-number">{en ? 'Use the Phone Number that you provided when Signing up' : 'استخدم رقم الهاتف الذي قدمته عند التسجيل'}</label>
        </div>
        <div className="checkout__phone-sec__radio-cont">
          <input className="checkout__phone-sec__radio-cont__inp" type="radio" id="new-number" name="phone" data-type="new_number_is_selected" onChange={handleChange} />
          <label className="checkout__phone-sec__radio-cont__lbl" htmlFor="new-number">{en ? 'Use another Phone Number' : 'استخدم رقم هاتف آخر'}</label>
        </div>
        <div className="checkout__phone-sec__number-cont" ref={phoneNumberConInpEL}>
          <label className="checkout__phone-sec__number-cont__lbl" htmlFor="new-number" ref={phoneNumberLblEL} data-type="toggle_phone_number_inp_to_focus" onClick={handleClick}>{en ? 'Phone Number' : 'رقم الهاتف'}</label>
          <input className="checkout__phone-sec__number-cont__inp" type="text" id="new-number" name="phoneNumber" data-type="phone_number_inp" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} ref={phoneNumberInpEL} />
        </div>
      </section>
      <section className="checkout__shipping-address-sec">
        <h2 className="checkout__shipping-address-sec__h2">Shipping Adress</h2>
        <div className="checkout__shipping-address-sec__form focus">
          <label className="checkout__shipping-address-sec__form__lbl" htmlFor="1" onClick={handleClick}>{en ? 'Phone Number' : 'رقم الهاتف'}</label>
          <input className="checkout__shipping-address-sec__form__inp" type="text" id="1" name="phoneNumber" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
        </div>
        <div className="checkout__shipping-address-sec__form">
          <label className="checkout__shipping-address-sec__form__lbl" htmlFor="2" onClick={handleClick}>{en ? 'Phone Number' : 'رقم الهاتف'}</label>
          <input className="checkout__shipping-address-sec__form__inp" type="text" id="2" name="phoneNumber" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
        </div>
        <div className="checkout__shipping-address-sec__form">
          <label className="checkout__shipping-address-sec__form__lbl" htmlFor="3" onClick={handleClick}>{en ? 'Phone Number' : 'رقم الهاتف'}</label>
          <input className="checkout__shipping-address-sec__form__inp" type="text" id="3" name="phoneNumber" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
        </div>
      </section>
    </div>
  )
}

export default Checkout;