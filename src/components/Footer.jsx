// HOOKS
import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';

// SCSS
import '../styles/components/Footer.scss';

// COMPONENTS
import NeedHelp from './NeedHelp';
import Alert from './Alert';

// JSON
import oneBike from '/src/data/one-bike.json'

// UTILS
import strRemoveSpace from '/src/utils/strRemoveSpace.js';
import formatPhoneNumber from '/src/utils/formatPhoneNumber.js';

//  ICONS
import facebookIcon from '/assets/img/icons/facebook.svg';
import instagramIcon from '/assets/img/icons/instagram.svg';
import whatsappIcon from '/assets/img/icons/whatsapp.svg';
import callIcon from '/assets/img/icons/call.svg';
import mailIcon from '/assets/img/icons/mail.svg';

//  ICONS - DARKMODE
import facebookIconDarkMode from '/assets/img/icons/facebook_darkMode.svg';
import instagramIconDarkMode from '/assets/img/icons/instagram_darkMode.svg';
import whatsappIconDarkMode from '/assets/img/icons/whatsapp_darkMode.svg';
import callIconDarkMode from '/assets/img/icons/call_darkMode.svg';
import mailIconDarkMode from '/assets/img/icons/mail_darkMode.svg';

function Footer ({darkMode, lan}) {

  const [alertText, setAlertText] = useState(null);
  const [newAlert, setNewAlert] = useState(0);

  const handleClick = (type) => {
    let copiedMessage;
    let alertMessage ;
    
    if (type === 'phone') {
      copiedMessage = formatPhoneNumber(oneBike.phone);
      alertMessage = lan === 'en' ? 'Number is copied to the clipboard successfully!' : 'لقد تم نسخ رقم الهاتف بنجاح!';
    }

    if (type === 'email') {
      copiedMessage = oneBike.email;
      alertMessage = lan === 'en' ? 'Email is copied to the clipboard successfully!' : 'لقد تم نسخ عنوان البريد الاكنروني بنجاح!';
    }
  
    if (navigator.clipboard) {
      navigator.clipboard.writeText(copiedMessage).then(() => {
        setAlertText(alertMessage);
        setNewAlert(Math.random());
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    } else {
      // Fallback for browsers that do not support the Clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = copiedMessage;
      textarea.style.position = 'fixed';  // Avoid scrolling to bottom
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
        setAlertText(alertMessage);
        setNewAlert(Math.random());
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
      document.body.removeChild(textarea);
    }
  }

  return (
    <div className="footer-cont">
      <Alert alertText={alertText} newAlert={newAlert}/>
      <div className="footer-cont__upper-grd">
        <section className="footer-cont__upper-grd__subscribe-sec">
          <label htmlFor="subscribe">
            <h2 className="footer-cont__upper-grd__subscribe-sec__title">{lan === 'en' ? 'Subscribe to our newsletter' : 'اشترك في نشرتنا'}</h2>
          </label>
          <ul className="footer-cont__upper-grd__subscribe-sec__lst">
            <li className="footer-cont__upper-grd__subscribe-sec__lst__itm">
              <input className="footer-cont__upper-grd__subscribe-sec__lst__itm__inpt" id="subscribe" type="text" placeholder={lan === 'en' ? 'Email address' : 'عنوان البريد الاكتروني'} />
              <button className="footer-cont__upper-grd__subscribe-sec__lst__itm__btn">{lan === 'en' ? 'Subscribe': 'اشترك'}</button>
            </li>
          </ul>
        </section>
        <section className="footer-cont__upper-grd__quickLinks-sec">
          <h2 className="footer-cont__upper-grd__quickLinks-sec__title">{lan === 'en' ? 'Quick Links' : 'روابط سريعه'}</h2>
          <ul className="footer-cont__upper-grd__quickLinks-sec__lst">
            <li className="footer-cont__upper-grd__quickLinks-sec__lst__itm">
            <Link className="footer-cont__upper-grd__quickLinks-sec__lst__itm__link">{lan === 'en' ? 'About us' : 'عنّا'}</Link>
            </li>
            <li className="footer-cont__upper-grd__quickLinks-sec__lst__itm">
              <Link className="footer-cont__upper-grd__quickLinks-sec__lst__itm__link">{lan === 'en' ? 'Privacty Policy' : 'سياسه الخصوصيه'}</Link>
            </li>
            <li className="footer-cont__upper-grd__quickLinks-sec__lst__itm">
              <Link className="footer-cont__upper-grd__quickLinks-sec__lst__itm__link" to="/" onClick={() => window.scroll({top: 0, behavior: 'smooth'})}>{lan === 'en' ? 'Back to Home' : 'العوده الى الرئيسيه'}</Link>
            </li>
            <li className="footer-cont__upper-grd__quickLinks-sec__lst__itm">
              <Link className="footer-cont__upper-grd__quickLinks-sec__lst__itm__link">{lan === 'en' ? 'Shipping process' : 'عمليه الشحن'}</Link>
            </li>
            <li className="footer-cont__upper-grd__quickLinks-sec__lst__itm">
              <Link className="footer-cont__upper-grd__quickLinks-sec__lst__itm__link">{lan === 'en' ? 'Commonly Asked Questions' : 'الأسئله الشائعه'}</Link>
            </li>
          </ul>
        </section>
        <section className="footer-cont__upper-grd__contactUs-sec">
          <h2 className="footer-cont__upper-grd__contactUs-sec__title">{lan === 'en' ? 'Contact Us' : 'تواصل معنا'}</h2>
          <ul className="footer-cont__upper-grd__contactUs-sec__lst">
            <li className="footer-cont__upper-grd__contactUs-sec__lst__itm">
              <img className="footer-cont__upper-grd__contactUs-sec__lst__itm__img" src={darkMode ? callIconDarkMode : callIcon} fetchpriority="high" alt="Call Icon" />
              <button className="footer-cont__upper-grd__contactUs-sec__lst__itm__link" onClick={() => handleClick('phone')}>{formatPhoneNumber(oneBike.phone)}</button>
            </li>
            <li className="footer-cont__upper-grd__contactUs-sec__lst__itm">
              <img className="footer-cont__upper-grd__contactUs-scc__lst__itm__img" src={darkMode ? mailIconDarkMode : mailIcon} fetchpriority="high" alt="mail Icon"/>
              <button className="footer-cont__upper-grd__contactUs-sec__lst__itm__link" onClick={() => handleClick('email')}>{oneBike.email}</button>
            </li>
            <li className="footer-cont__upper-grd__contactUs-sec__lst__itm">
              <img className="footer-cont__upper-grd__contactUs-sec__lst__itm__img" src={darkMode ? whatsappIconDarkMode : whatsappIcon} fetchpriority="high" alt="Whatsapp Icon" />
            <Link className="footer-cont__upper-grd__contactUs-sec__lst__itm__link" to={oneBike.whatsApp} target="_blank" tabIndex="0">{lan === 'en' ? 'Chat with us' : 'تحدث معنا'}</Link>
            </li>
          </ul>
        </section>
      </div>

      <div className="footer-cont__lower">
        <section className="footer-cont__lower__media-sec">
        <a href={oneBike.facebook} target="_blank" tabIndex="0"><img className="footer-cont__lower__media-sec__media-icon" src={darkMode ? facebookIcon : facebookIconDarkMode} fetchpriority="high" alt="Facebook Icon"/></a>
        <a href={oneBike.whatsApp} target="_blank" tabIndex="0"><img className="footer-cont__lower__media-sec__media-icon" src={darkMode ? whatsappIcon : whatsappIconDarkMode} fetchpriority="high" alt="Whatsapp Icon"/></a>
        <a href={oneBike.instagram} target="_blank" tabIndex="0"><img className="footer-cont__lower__media-sec__media-icon" src={darkMode ? instagramIcon : instagramIconDarkMode} fetchpriority="high" alt="Instagram Icon"/></a>
        </section>
        <section className="footer-cont__lower__organism-rights">
          <h3 className="footer-cont__lower__organism-rights__h3">{lan === 'en' ? 'Syria © 2024 ONE BIKE all rights reseved' : 'سوريا © 2024 ون بايك جميع الحقوق محفوظة'}</h3>
        </section>
      </div>
    </div>
  )
}

export default Footer;