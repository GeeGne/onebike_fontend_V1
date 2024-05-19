// HOOKS
import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';

// SCSS
import '../Styles/Components/Footer.scss';

//  ICONS
import facebookIcon from '/src/assets/Img/Icons/facebook.svg';
import instagramIcon from '/src/assets/Img/Icons/instagram.svg';
import whatsappIcon from '/src/assets/Img/Icons/whatsapp.svg';
import callIcon from '/src/assets/Img/Icons/call.svg';
import mailIcon from '/src/assets/Img/Icons/mail.svg';

//  ICONS - DARKMODE
import facebookIconDarkMode from '/src/assets/Img/Icons/facebook_darkMode.svg';
import instagramIconDarkMode from '/src/assets/Img/Icons/instagram_darkMode.svg';
import whatsappIconDarkMode from '/src/assets/Img/Icons/whatsapp_darkMode.svg';
import callIconDarkMode from '/src/assets/Img/Icons/call_darkMode.svg';
import mailIconDarkMode from '/src/assets/Img/Icons/mail_darkMode.svg';

function Footer ({darkMode, lan}) {


  return (
    <div className="footer-container">
      <div className="footer-container__footer-upper-grid">
        <section className="footer-container__footer-upper-grid__section-quick-links">
          <h2 className="footer-container__footer-upper-grid__section-quick-links__title">Quick Links</h2>
          <ul className="footer-container__footer-upper-grid__section-quick-links__list">
            <li className="footer-container__footer-upper-grid__section-quick-links__list__item">
              <Link className="footer-container__footer-upper-grid__section-quick-links__list__item__link">About us</Link>
            </li>
            <li className="footer-container__footer-upper-grid__section-quick-links__list__item">
              <Link className="footer-container__footer-upper-grid__section-quick-links__list__item__link">Privacty Policy</Link>
            </li>
            <li className="footer-container__footer-upper-grid__section-quick-links__list__item">
              <Link className="footer-container__footer-upper-grid__section-quick-links__list__item__link">Back to Home</Link>
            </li>
            <li className="footer-container__footer-upper-grid__section-quick-links__list__item">
              <Link className="footer-container__footer-upper-grid__section-quick-links__list__item__link">Shipping process</Link>
            </li>
            <li className="footer-container__footer-upper-grid__section-quick-links__list__item">
              <Link className="footer-container__footer-upper-grid__section-quick-links__list__item__link">Commonl Asked Questions</Link>
            </li>
          </ul>
        </section>
        <section className="footer-container__footer-upper-grid__section-contact-us">
          <h2 className="footer-container__footer-upper-grid__section-contact-us__title">Contact Us</h2>
          <ul className="footer-container__footer-upper-grid__section-contact-us__list">
            <li className="footer-container__footer-upper-grid__section-contact-us__list__item">
              <img className="footer-container__footer-upper-grid__section-contact-us__list__item__img" src={darkMode ? callIconDarkMode : callIcon}/>
              <Link className="footer-container__footer-upper-grid__section-contact-us__list__item__link">+963 964 803 712</Link>
            </li>
            <li className="footer-container__footer-upper-grid__section-contact-us__list__item">
              <img className="footer-container__footer-upper-grid__section-contact-us__list__item__img" src={darkMode ? mailIconDarkMode : mailIcon}/>
              <Link className="footer-container__footer-upper-grid__section-contact-us__list__item__link">example@gmail.com</Link>
            </li>
            <li className="footer-container__footer-upper-grid__section-contact-us__list__item">
              <img className="footer-container__footer-upper-grid__section-contact-us__list__item__img" src={darkMode ? whatsappIconDarkMode : whatsappIcon}/>
              <Link className="footer-container__footer-upper-grid__section-contact-us__list__item__link">Chat with us</Link>
            </li>
          </ul>
        </section>
   
      </div>

      <div className="footer-container__footer-lower">
        <section className="footer-container__footer-lower__media-section">
        <a><img className="footer-container__footer-lower__media-section__media-icon" src={darkMode ? facebookIcon : facebookIconDarkMode}/></a>
        <a><img className="footer-container__footer-lower__media-section__media-icon" src={darkMode ? whatsappIcon : whatsappIconDarkMode}/></a>
        <a><img className="footer-container__footer-lower__media-section__media-icon" src={darkMode ? instagramIcon : instagramIconDarkMode}/></a>
        </section>
        <section className="footer-container__footer-lower__organism-rights">
          <h3 className="footer-container__footer-lower__organism-rights__h3">Syria © 2024 ONE BIKE all rights reseved</h3>
        </section>
      </div>
    </div>
  )
}

export default Footer;