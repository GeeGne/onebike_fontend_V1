// HOOKS
import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

// COMPONENTS
import TwoBarsActivity from '/src/components/TwoBarsActivity';

// STORE
import {useOrderStore} from '/src/store/store';

// SCSS
import '/src/styles/components/pages/checkout/OrderCompleteLayout.scss';

// ASSETS
import check2Icon from '/assets/img/icons/check2.svg'

// ASSETS - DARKMODE
import check2DarkModeIcon from '/assets/img/icons/check2_darkMode.svg'

function OrderCompleteLayout ({darkMode, lan}) {
  const en = lan === 'en';

  const {orderState, setOrderState} = useOrderStore(); 

  const navigate = useNavigate();

  const mainContEL = useRef(null);
  const contentContEL = useRef(null);

  const descriptionContent = () => en 
    ? 'Success! Your order has been placed. We\'ll keep you updated on its progress and send a confirmation email soon. Thank you for shopping with us!' 
    : 'تم تقديم طلبك بنجاح. سنبقيك على اطلاع بتقدمه وسنرسل لك بريدًا إلكترونيًا لتأكيد الطلب قريبًا. شكرًا لتسوقك معنا!';

  useEffect(() => {
    if (orderState) {
      document.body.style.overflow = 'hidden';
      mainContEL.current.style.visibility = 'visible';
      mainContEL.current. style.opacity = '1';
      setTimeout(() => { 
        contentContEL.current.style.opacity = '1'       
        contentContEL.current.style.transform = 'translate(-50%, -50%) scale(1.2)'     
      }, 250);
      setTimeout(() => contentContEL.current.style.transform = 'translate(-50%, -50%) scale(1)',  550);
    } else {
      document.body.style.overflow = 'hidden auto';
      mainContEL.current.style.visibility = 'hidden';
      mainContEL.current.style.opacity = '0';
      contentContEL.current.style.opacity = '0';
      contentContEL.current.style.transform = 'translate(-50%, -50%) scale(0.8)';
    }
  }, [orderState])

  const handleClick = e => {
    navigate('/');
    setTimeout(() => window.scroll({top: 0, behavior: 'smooth'}) ,500);
    setOrderState(false);
  }

  return (
    <div className="order-complete" ref={mainContEL}>
      <div className="order-complete__content" ref={contentContEL}>
        <div className="order-complete__content__upper-cont">
          <h2 className="order-complete__content__upper-cont__title">{en ? 'Order is placed!' : 'تم تقديم الطلب!'}</h2>
          <TwoBarsActivity darkMode={darkMode} icon={darkMode? check2DarkModeIcon : check2Icon} />
        </div>
        <div className="order-complete__content__bottom-cont">
          <h3 className="order-complete__content__bottom-cont__description">{descriptionContent()}</h3>
          <button className="order-complete__content__bottom-cont__btn" onClick={handleClick}>{en ? 'Back To Home' : 'العوده الى الرئيسيه'}</button>
        </div>
      </div>
    </div>
  )
}

export default OrderCompleteLayout;