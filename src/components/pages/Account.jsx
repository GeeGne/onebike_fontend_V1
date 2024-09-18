// HOOKS
import React, {useState, useRef, useEffect, useReducer} from 'react';
import {useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

// COMPONENTS
import DisplayWebImg from '/src/components/DisplayWebImg';
import DisplayImg from '/src/components/DisplayImg';
import Alert from '/src/components/Alert';
import ProgressActivity from '/src/components/ProgressActivity';

// FIREBASE
import {auth} from '/src/firebase/authSignUp';
import {signOut, updateProfile, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import {db} from '/src/firebase/fireStore';
import {getDoc, doc, collection, getDocs, updateDoc} from 'firebase/firestore';
import { storage } from '/src/firebase/storage';
import { ref, uploadBytes } from "firebase/storage";

// SCSS
import '/src/styles/components/pages/Account.scss';

// STORE
import { useDataStore } from '/src/store/store';

// REDUCERS
import editAltWindowReducer from '/src/reducers/editAltWindowReducer';
import editPersonalDetailsWindowReducer from '/src/reducers/editPersonalDetailsWindowReducer';

// UTILS 
import Redirector from '/src/utils/Redirector';
import formatPhoneNumber from '/src/utils/formatPhoneNumber';
import formatNumberWithCommas from '/src/utils/formatNumberWithCommas';
import calculatePrice from '/src/utils/calculatePrice';

// ASSETS
import personIcon from '/assets/img/icons/person.svg';
import callIcon from '/assets/img/icons/call.svg';
import callDarkModeIcon from '/assets/img/icons/call_darkMode.svg';
import locationIcon from '/assets/img/icons/location.svg';
import locationDarkModeIcon from '/assets/img/icons/location_darkMode.svg';
import notesIcon from '/assets/img/icons/notes.svg';
import notesDarkModeIcon from '/assets/img/icons/notes_darkMode.svg';
import personDarkModeIcon from '/assets/img/icons/person_darkMode.svg';
import mailIcon from '/assets/img/icons/mail.svg';
import mailDarkModeIcon from '/assets/img/icons/mail_darkMode.svg';

function Account ({darkMode, lan}) {

  const pageURL = window.location.href;
  const siteName = "ONEBIKE";
  const pageTitle = "My Account - ONEBIKE";
  const pageDescription = "Manage your account details, view your orders, and update your preferences on ONEBIKE.";
  const pageKeywords = "ONEBIKE, account, manage account, orders, preferences, bicycle, bicycle parts, Syria";
  const en = lan === 'en';

  const [ editPersonalDetails, dispatch ] = useReducer(editPersonalDetailsWindowReducer, { toggle: '' });
  const { user, userData, rolesData, setRefreshUserData } = useDataStore();
  const [ pfpSrc, setPfpSrc] = useState("");
  const [ newAlert, setNewAlert ] = useState(0);
  const [ alertText, setAlertText ] = useState(null);
  const [ activity, setActivity ] = useState(false);

  const ordersData = userData?.ordersData || [];
  const navigate = useNavigate();
  const redirector = new Redirector(navigate);

  const imgFile = useRef(null);
  const pfpImgEL = useRef(null);

  const accountEL = useRef(null);
  const topBarSliderEL = useRef(null);
  const myInfoEL = useRef(null);
  const ordersEL = useRef(null);
  const descriptionContEL = useRef(null);
  const myInfoContEL = useRef(null);
  const myInfoListContEL = useRef(null);
  const ordersContEL = useRef(null);
  const ordersListContEL = useRef(null);  

  const fullNameInputEL = useRef(null);
  const phoneInputEL = useRef(null);
  const addressDetailsInputEL = useRef(null);
  const secondAddressInputEL = useRef(null);
  const notesInputEL = useRef(null);

  //Set Personal Data to Input Values
  useEffect(() => {
    fullNameInputEL.current.value = userData?.fullName || '';
    phoneInputEL.current.value = userData?.phone || '';
    addressDetailsInputEL.current.value = userData?.addressDetails || '';
    secondAddressInputEL.current.value = userData?.secondAddress || '';
    notesInputEL.current.value = userData?.notes || '';
  }, [userData]);

  const getProductImgURL = product => `/assets/img/products/${product.id}/main.webp`;
  const getProductPrice = product => formatNumberWithCommas(calculatePrice(product.price, product.discount));
  const getUserImgURL = () => `/assets/img/userpfp/${user?.uid}/main.webp`;
  const isOrdersEmpty = ordersData.length === 0;
  const handleOrderStatus = (orderStatus) => {
    switch (orderStatus) {
      case 'On schedule':
        return <span style={{color: '#E3242B'}}>{en ? 'On schedule' : 'في الموعد المحدد'}</span>
      case 'Delivered':
        return <span style={{color: '#AAFF00'}}>{en ? 'Delivered' : 'تم الاستلام'}</span>
      case 'Canceled':
        return <span style={{color: '#C0C0C0'}}>{en ? 'Canceled' : 'الغى'}</span>
      default:
        console.error('Error: Unknown Order statue: ', orderStatus)
    }
  };

  const renderLoadingState = textContent => {
    if (activity) {
      return <ProgressActivity darkMode={darkMode} invert={false} />
    } else {
      return textContent;
    } 
  };
  
  useEffect(() => {
    redirector.account(user);
  }, [user]);

  useEffect(() => {
    const maxHeight = myInfoListContEL.current.scrollHeight;
    const heightGap = 16;

    if (userData) descriptionContEL.current.style.maxHeight = String(maxHeight + heightGap) + 'px';
    topBarSliderEL.current.style.left = en ? '0%' : '50%';
  }, [userData, lan])

  const updateUserData = async (personalData) => {
    setActivity(true);

    try {
      const productRef = doc(db, "users", user?.uid);
      await updateDoc(productRef, personalData);

      if (imgFile.current) {
        const storageRef = ref(storage, getUserImgURL());
        await uploadBytes(storageRef, imgFile.current);
      }
  
      dispatch({ type: 'user_data_is_updated' });
      setRefreshUserData(Math.random());
      setAlertText(en ? 'Success! Your Personal Data is Updated' : 'تم تحديث بياناتك الشخصية بنجاح!')
    } catch(err) {
      console.error('Error updating perosnal data: ', err);
      setAlertText(en ? 'Error updating Persoanl Data' : 'خطأ في تحديث البيانات الشخصية')
    } finally {
      setNewAlert(Math.random());
      setActivity(false);  
    }
  }

  const handleClick = async e => {
    const {action} = e.currentTarget.dataset;
    const containerWidth =  myInfoContEL.current.scrollWidth
    const widthGap = 50;
    const heightGap = 16;
    const accountELheightGap = 300;
    const scrollWidth = containerWidth + widthGap;
    let maxHeight;
    const accountScrollHeight = () => accountEL.current.scrollHeight;

    switch (action) {      
      case 'myInfo_is_clicked':
        maxHeight = myInfoListContEL.current.scrollHeight;
        topBarSliderEL.current.style.transform = 'scale(0.9)';
        myInfoEL.current.style.color = 'var(--font-h-color)';
        ordersEL.current.style.color = 'var(--font-p-color)';
        descriptionContEL.current.scroll({left: 0, behavior: 'smooth'});
        descriptionContEL.current.style.maxHeight = String(maxHeight + heightGap) + 'px';
        setTimeout(() => {
          topBarSliderEL.current.style.transform = 'scale(1)';
          topBarSliderEL.current.style.left = en ? '0%' : '50%';
        }, 150);
        setTimeout(() => {
          accountEL.current.style.setProperty('--stretch-height', String(accountScrollHeight() + accountELheightGap) + 'px');
        }, 550);
        break;
      case 'orders_is_clicked':
        maxHeight = ordersListContEL.current.scrollHeight;
        topBarSliderEL.current.style.transform = 'scale(0.9)';
        myInfoEL.current.style.color = 'var(--font-p-color)';
        ordersEL.current.style.color = 'var(--font-h-color)';
        descriptionContEL.current.scroll({left: en ? scrollWidth : -scrollWidth, behavior: 'smooth'});
        descriptionContEL.current.style.maxHeight = String(maxHeight + heightGap) + 'px';
        setTimeout(() => {
          topBarSliderEL.current.style.transform = 'scale(1)';
          topBarSliderEL.current.style.left = en ? '50%' : '0%';
        }, 150);
        setTimeout(() => {
          accountEL.current.style.setProperty('--stretch-height', String(accountScrollHeight() + accountELheightGap) + 'px');
        }, 550);
        break;
      case 'signOut_is_clicked':
        try {
          const response = await signOut(auth);
          setTimeout(() => window.scroll({top: 0, behavior: 'smooth'}), 500);
        } catch (err) {
          console.error(err);
        }
        break;
      case 'manage_content_btn_is_clicked':
        navigate('/account/admin');
        break;
      case 'personalDetails_window_background_is_clicked':
      case 'cancel_personalDetails_window_button_is_clicked':
      case 'edit_personal_details_btn_is_clicked':
        dispatch({type: action})
        break;
      case 'save_personalDetails_window_button_is_clicked':
        const { toggle, ...personalData } = editPersonalDetails;
        updateUserData(personalData);
        break;
      default:
        console.error('Error: Unknown action', action);
    }
  }

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'fullName':
      case 'phone':
      case 'addressDetails':
      case 'secondAddress':
      case 'notes':
        dispatch({ type: 'add_inputs_values', name, value: value.trim() })
        break;
      case 'userPfp':
        const previewImage = () => {
          const file = e.currentTarget.files[0];
          const reader = new FileReader();
          reader.onloadend = function () {
            setPfpSrc(reader.result);
          }

          file ? reader.readAsDataURL(file) : setPfpSrc("");
          imgFile.current = file;
        }

        previewImage();
        break;
      default:
        console.error('Error: unknown name: ', name);
    }
  }

  // console.log('user', user?.uid);
  // console.log('userData', userData);
  // console.log('reducer', editPersonalDetails);

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
      <div className="account" ref={accountEL}>
      <Alert alertText={alertText} newAlert={newAlert} />

        <section className="account__banner">
          <button className={`account__banner__manageContent-btn${rolesData?.role === 'admin' || rolesData?.role === 'owner' ? ' show': ''}`} data-action="manage_content_btn_is_clicked" onClick={handleClick} />
          <button className="account__banner__editPersonalDetails-btn" data-action="edit_personal_details_btn_is_clicked" onClick={handleClick} />
          <div className="account__banner__pfp">
            <DisplayImg className="account__banner__pfp__default-img" src={darkMode ? personIcon : personDarkModeIcon} />
            <DisplayWebImg className="account__banner__pfp__user-img" src={getUserImgURL()} backup={false} refresh={userData} />
          </div>
        </section>

        <section className="account__userName-sec">
          <h2 className="account__userName-sec__h2">{userData?.fullName || (en ? 'Loading..' : '..جاري التحميل')}</h2>
        </section>

        <div className={`account__editPersonalDetails-window${editPersonalDetails.toggle}`} data-action="personalDetails_window_background_is_clicked" onClick={handleClick}>
          <div className="account__editPersonalDetails-window__wrapper" data-action="personalDetails_window_wrapper_is_clicked" onClick={e => e.stopPropagation()}>
            <h2 className="account__editPersonalDetails-window__wrapper__title">{en ? 'Edit Personal Details' : 'تعديل المعلومات الشخصيه'}</h2>
            <div className="account__editPersonalDetails-window__wrapper__pfp-wrapper" htmlFor="userPfp">
              <DisplayWebImg className="account__editPersonalDetails-window__wrapper__pfp-wrapper__current-img" src={getUserImgURL()} backup={false} />
              <DisplayImg className="account__editPersonalDetails-window__wrapper__pfp-wrapper__new-img" src={pfpSrc} />
              <input className="account__editPersonalDetails-window__wrapper__pfp-wrapper__inpt" type="file" id="userPfp" name="userPfp" onChange={handleChange} ref={pfpImgEL} />
            </div>
            <label className="account__editPersonalDetails-window__wrapper__fullName-lbl" htmlFor="fullName">
              <DisplayImg className="account__editPersonalDetails-window__wrapper__fullName-lbl__icon" src={darkMode ? personDarkModeIcon : personIcon } loading="lazy" alt="Person Icon"/>
              <span className="account__editPersonalDetails-window__wrapper__fullName-lbl__span">{en ? 'Full Name' : 'الاسم الكامل'}</span>
              <input className="account__editPersonalDetails-window__wrapper__fullName-lbl__fullName-inpt" id="fullName" name="fullName" onChange={handleChange} ref={fullNameInputEL} />
            </label>
            <label className="account__editPersonalDetails-window__wrapper__phone-lbl" htmlFor="phone">
              <DisplayImg className="account__editPersonalDetails-window__wrapper__phone-lbl__icon" src={darkMode ? callDarkModeIcon : callIcon } loading="lazy" alt="Call Icon"/>
              <span className="account__editPersonalDetails-window__wrapper__phone-lbl__span">{en ? 'Phone': 'رقم الهاتف'}</span>
              <input className="account__editPersonalDetails-window__wrapper__phone-lbl__phone-inpt" id="phone" name="phone" onChange={handleChange} ref={phoneInputEL} />
            </label>
            <label className="account__editPersonalDetails-window__wrapper__addressDetails-lbl" htmlFor="addressDetails">
              <DisplayImg className="account__editPersonalDetails-window__wrapper__addressDetails-lbl__icon" src={darkMode ? locationDarkModeIcon : locationIcon } loading="lazy" alt="Adress Details Icon"/>
              <span className="account__editPersonalDetails-window__wrapper__addressDetails-lbl__span">{en ? 'Address Details' : 'تفاصيل العنوان'}</span>
              <input className="account__editPersonalDetails-window__wrapper__addressDetails-lbl__addressDetails-inpt" id="addressDetails" name="addressDetails" onChange={handleChange} ref={addressDetailsInputEL} />
            </label>
            <label className="account__editPersonalDetails-window__wrapper__secondAddress-lbl" htmlFor="secondAddress">
              <DisplayImg className="account__editPersonalDetails-window__wrapper__secondAddress-lbl__icon" src={darkMode ? locationDarkModeIcon : locationIcon } loading="lazy" alt="Second Address Icon"/>
              <span className="account__editPersonalDetails-window__wrapper__secondAddress-lbl__span">{en ? 'Second Address' : 'العنوان الثاني'}</span>
              <input className="account__editPersonalDetails-window__wrapper__secondAddress-lbl__secondAddress-inpt" id="secondAddress" name="secondAddress" onChange={handleChange} ref={secondAddressInputEL} />
            </label>
            <label className="account__editPersonalDetails-window__wrapper__notes-lbl" htmlFor="notes">
              <DisplayImg className="account__editPersonalDetails-window__wrapper__notes-lbl__icon" src={darkMode ? notesDarkModeIcon : notesIcon } loading="lazy" alt="Notes Icon"/>
              <span className="account__editPersonalDetails-window__wrapper__notes-lbl__span">{en ? 'Notes' : 'ملاحظات'}</span>
              <input className="account__editPersonalDetails-window__wrapper__notes-lbl__notes-inpt" id="notes" name="notes" onChange={handleChange} ref={notesInputEL} />
            </label>
            <button className="account__editPersonalDetails-window__wrapper__cancel-btn" data-action="cancel_personalDetails_window_button_is_clicked" onClick={handleClick}>{en ? 'Cancel' : 'الغاء'}</button>
            <button className="account__editPersonalDetails-window__wrapper__save-btn" data-action="save_personalDetails_window_button_is_clicked" onClick={handleClick}>{renderLoadingState(en ? 'Save' : 'حفظ')}</button>          
          </div>
        </div>

        <section className="account__userData">
          <div className="account__userData__top-bar">
            <div className="account__userData__top-bar__slider" ref={topBarSliderEL} />
            <span className="account__userData__top-bar__item" data-action="myInfo_is_clicked" onClick={handleClick} ref={myInfoEL}>{en ? 'My Info' : 'معلوتي الشخصيه'}</span>
            <span className="account__userData__top-bar__item clicked" data-action="orders_is_clicked" onClick={handleClick} ref={ordersEL}>{en ? 'Orders' : 'الطلبات'}</span>
          </div>
          <ul className="account__userData__description-cont" ref={descriptionContEL}>
            <li className="account__userData__description-cont__myInfo-cont" ref={myInfoContEL}>
              <ul className="account__userData__description-cont__myInfo-cont__list" ref={myInfoListContEL}>
                <li className="account__userData__description-cont__myInfo-cont__list__item">
                  <DisplayImg className="account__userData__description-cont__myInfo-cont__list__item__img" src={darkMode ? callDarkModeIcon : callIcon} alt="Phone Icon" />
                  <span className="account__userData__description-cont__myInfo-cont__list__item__title">{en ? 'Mobile Phone' : 'رقم الهاتف'}</span> 
                  <span className="account__userData__description-cont__myInfo-cont__list__item__description">{formatPhoneNumber(userData?.phone) || (en ? 'Loading..' : '..جاري التحميل')}</span> 
                </li>
                <li className="account__userData__description-cont__myInfo-cont__list__item">
                  <DisplayImg className="account__userData__description-cont__myInfo-cont__list__item__img" src={darkMode ? mailDarkModeIcon : mailIcon} loading="lazy" alt="Email Icon" />
                  <span className="account__userData__description-cont__myInfo-cont__list__item__title">{en ? 'Email Address' : 'عنوان البريد'}</span> 
                  <span className="account__userData__description-cont__myInfo-cont__list__item__description">{userData?.email || (en ? 'Loading..' : '..جاري التحميل')}</span> 
                </li>
                {!userData?.addressDetails || <li className="account__userData__description-cont__myInfo-cont__list__item">
                  <DisplayImg className="account__userData__description-cont__myInfo-cont__list__item__img" src={darkMode ? locationDarkModeIcon : locationIcon} loading="lazy" alt="Address Details Icon" />
                  <span className="account__userData__description-cont__myInfo-cont__list__item__title">{en ? 'Address Details' : 'تفاصيل العنوان'}</span> 
                  <span className="account__userData__description-cont__myInfo-cont__list__item__description">{userData?.addressDetails || (en ? 'Loading..' : '..جاري التحميل')}</span> 
                </li>}
                {!userData?.secondAddress || <li className="account__userData__description-cont__myInfo-cont__list__item">
                  <DisplayImg className="account__userData__description-cont__myInfo-cont__list__item__img" src={darkMode ? locationDarkModeIcon : locationIcon} loading="lazy" alt="Second Address Icon" />
                  <span className="account__userData__description-cont__myInfo-cont__list__item__title">{en ? 'Second Address' : 'العنوان الثاني'}</span> 
                  <span className="account__userData__description-cont__myInfo-cont__list__item__description">{userData?.secondAddress || (en ? 'Loading..' : '..جاري التحميل')}</span> 
                </li>}
                {!userData?.notes || <li className="account__userData__description-cont__myInfo-cont__list__item">
                  <DisplayImg className="account__userData__description-cont__myInfo-cont__list__item__img" src={darkMode ? notesDarkModeIcon : notesIcon} loading="lazy" alt="Notes Icon" />
                  <span className="account__userData__description-cont__myInfo-cont__list__item__title">{en ? 'Notes' : 'ملاحظات'}</span> 
                  <span className="account__userData__description-cont__myInfo-cont__list__item__description">{userData?.notes || (en ? 'Loading..' : '..جاري التحميل')}</span> 
                </li>}
                {/* <li className="account__userData__description-cont__myInfo-cont__list__item">
                  <span className="account__userData__description-cont__myInfo-cont__list__item__title">ID</span> 
                  <span className="account__userData__description-cont__myInfo-cont__list__item__description">{userData?.userId}</span> 
                </li> */}
              </ul>
            </li>
            <li className="account__userData__description-cont__orders-cont" ref={ordersContEL}>
              <ul className="account__userData__description-cont__orders-cont__orders" ref={ordersListContEL}>
                {isOrdersEmpty
                ? <li className="account__userData__description-cont__orders-cont__orders__empty">
                  <div className="account__userData__description-cont__orders-cont__orders__order__empty">
                    {en ? 'No orders found. Browse our store to place your first order.' : 'لم يتم العثور على طلبات. تصفح متجرنا لوضع طلبك الأول.'}
                  </div>
                </li>      
                : ordersData.map(order => 
                <li className="account__userData__description-cont__orders-cont__orders__order" key={order.orderId}>
                  <div className="account__userData__description-cont__orders-cont__orders__order__id">
                    <span className="account__userData__description-cont__orders-cont__orders__order__id__title">{en ? 'Order ID' : 'رمز الطلب'}</span> 
                    <span className="account__userData__description-cont__orders-cont__orders__order__id__description">{order.orderId}</span> 
                  </div>
                  <div className="account__userData__description-cont__orders-cont__orders__order__date">
                    <span className="account__userData__description-cont__orders-cont__orders__order__date__title">{en ? 'Requested Date' : 'تاريخ طلب الشراء'}</span> 
                    <span className="account__userData__description-cont__orders-cont__orders__order__date__description">{order.orderDate}</span> 
                  </div>
                  <div className="account__userData__description-cont__orders-cont__orders__order__orderStatus">{handleOrderStatus(order.orderStatus)}</div>
                  <ul className="account__userData__description-cont__orders-cont__orders__order__products">
                    {order.products.map((product, i) =>
                    <li className="account__userData__description-cont__orders-cont__orders__order__products__product" key={product.id}>
                      <div className="account__userData__description-cont__orders-cont__orders__order__products__product__img-cont">
                        <DisplayWebImg className="account__userData__description-cont__orders-cont__orders__order__products__product__img-cont__img" src={getProductImgURL(product.product)} alt={product.product.title[lan]} loading={i <= 3 ? "eager" : "lazy"} fetchpriority={i <= 3 ? "high" : ""} />
                        <span className="account__userData__description-cont__orders-cont__orders__order__products__product__img-cont__amount">{product.quantity}</span>
                      </div>
                      <span className="account__userData__description-cont__orders-cont__orders__order__products__product__title">{product.product.title[lan]}</span>
                      <span className="account__userData__description-cont__orders-cont__orders__order__products__product__price">{(en ? 'S.P ' : 'ل.س ') + getProductPrice(product.product)}</span>
                    </li>
                    )}
                  </ul>
                  <div className="account__userData__description-cont__orders-cont__orders__order__date">
                    <span className="account__userData__description-cont__orders-cont__orders__order__date__title">{en ? 'Subtotal' : 'المجموع الفرعي'}</span> 
                    <span className="account__userData__description-cont__orders-cont__orders__order__date__description">{(en ? 'S.P ' : 'ل.س ') + formatNumberWithCommas(order.subtotal)}</span> 
                  </div>
                  <div className="account__userData__description-cont__orders-cont__orders__order__date">
                    <span className="account__userData__description-cont__orders-cont__orders__order__date__title">{en ? 'Shipping fee' : 'الشحن'}</span> 
                    <span className="account__userData__description-cont__orders-cont__orders__order__date__description">{(en ? 'S.P ' : 'ل.س ') + formatNumberWithCommas(order.shippingCost)}</span> 
                  </div>
                  <div className="account__userData__description-cont__orders-cont__orders__order__date">
                    <span className="account__userData__description-cont__orders-cont__orders__order__date__title">{en ? 'Total' : 'الاجمالي'}</span> 
                    <span className="account__userData__description-cont__orders-cont__orders__order__date__description">{(en ? 'S.P ' : 'ل.س ') + formatNumberWithCommas(order.total)}</span> 
                  </div>
                </li>
                )}
              </ul>
            </li>
          </ul>
        </section>
        <button className="account__signOut-btn" data-action="signOut_is_clicked" onClick={handleClick}>{en ? 'Sign Out' : 'تسجيل الخروج'}</button>
      </div>
    </>
  )
}

export default Account;