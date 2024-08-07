// HOOKS
import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

// FIREBASE
import {auth} from '/src/firebase/authSignUp.js';
import {signOut, updateProfile, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import {db} from '/src/firebase/fireStore';
import {setDoc, updateDoc, getDoc, doc, collection, getDocs} from 'firebase/firestore';

// SCSS
import '/src/styles/components/pages/Account.scss';

// UTILS 
import Redirector from '/src/utils/Redirector';
import formatPhoneNumber from '/src/utils/formatPhoneNumber';
import formatNumberWithCommas from '/src/utils/formatNumberWithCommas';
import calculatePrice from '/src/utils/calculatePrice';

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
  const ordersData = userData?.ordersData || [];
  const {pathname} = window.location;
  const navigate = useNavigate();
  const redirector = new Redirector(navigate);

  const accountEL = useRef(null);
  const topBarSliderEL = useRef(null);
  const myInfoEL = useRef(null);
  const ordersEL = useRef(null);
  const descriptionContEL = useRef(null);
  const myInfoContEL = useRef(null);
  const myInfoListContEL = useRef(null);
  const ordersContEL = useRef(null);
  const ordersListContEL = useRef(null);

  const getProductImgURL = product => `/assets/img/products/${product.category}/${product.type}/${product.id + '-' + product.color.en}-front.webp`;
  const getProductPrice = product => formatNumberWithCommas(calculatePrice(product.price, product.discount));
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
  }
  
  useEffect(() => {
    redirector.account(pathname, user);
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

    const fetchOrdersData = async () => {
      try {
        const ordersCollectionRef = collection(db, 'users', user.uid, 'orders');
        const ordersSnapshot = await getDocs(ordersCollectionRef);

        if (!ordersSnapshot.empty) {
          const ordersData = ordersSnapshot.docs.map(doc => (
            {...doc.data()}
          ));
          setUserData(prevData => ({...prevData, ordersData}))
        } else {
          console.log("No orders found for this user");
          setUserData(prevData => ({...prevData, ordersData: []}))
        }
      } catch (err) {
        console.error("Error fetching orders data:", err);
      }
    }

    const fetchData = async () => {
      await fetchUserData();
      await fetchOrdersData();
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const maxHeight = myInfoListContEL.current.scrollHeight;
    const heightGap = 16;

    if (userData) descriptionContEL.current.style.maxHeight = String(maxHeight + heightGap) + 'px';
    topBarSliderEL.current.style.left = en ? '0%' : '50%';
  }, [userData, lan])

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
      <div className="account" ref={accountEL}>

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
            <span className="account__userData__top-bar__item" data-action="myInfo_is_clicked" onClick={handleClick} ref={myInfoEL}>{en ? 'My Info' : 'معلوتي الشخصيه'}</span>
            <span className="account__userData__top-bar__item clicked" data-action="orders_is_clicked" onClick={handleClick} ref={ordersEL}>{en ? 'Orders' : 'الطلبات'}</span>
          </div>
          <ul className="account__userData__description-cont" ref={descriptionContEL}>
            <li className="account__userData__description-cont__myInfo-cont" ref={myInfoContEL}>
              <ul className="account__userData__description-cont__myInfo-cont__list" ref={myInfoListContEL}>
                <li className="account__userData__description-cont__myInfo-cont__list__item">
                  <span className="account__userData__description-cont__myInfo-cont__list__item__title">{en ? 'Mobile Phone' : 'رقم الهاتف'}</span> 
                  <span className="account__userData__description-cont__myInfo-cont__list__item__description">{formatPhoneNumber(userData?.phone)}</span> 
                </li>
                <li className="account__userData__description-cont__myInfo-cont__list__item">
                  <span className="account__userData__description-cont__myInfo-cont__list__item__title">{en ? 'Email Address' : 'عنوان البريد'}</span> 
                  <span className="account__userData__description-cont__myInfo-cont__list__item__description">{userData?.email}</span> 
                </li>
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
                    {order.products.map(product =>
                    <li className="account__userData__description-cont__orders-cont__orders__order__products__product" key={product.id}>
                      <div className="account__userData__description-cont__orders-cont__orders__order__products__product__img-cont">
                        <img className="account__userData__description-cont__orders-cont__orders__order__products__product__img-cont__img" src={getProductImgURL(product.product)}/>
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