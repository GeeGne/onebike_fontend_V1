// HOOKS
import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';

// SCSS
import '../Styles/Components/Footer.scss';

// COMPONENTS
import NeedHelp from './NeedHelp';

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

  const facebookURL = "https://www.facebook.com/profile.php?id=61555487381717";
  const instagramURL = "https://www.instagram.com/onebike2024?fbclid=IwZXh0bgNhZW0CMTAAAR0j3tRBpSGxAkPztNBkI-KKoBI454wtiODT8gyzjrY2B6jtQhzTFDkpvuI_aem_AZvvFyQoDJ0_EqQr36CwzmanbLAnK_nFqsXLZollXvn2m7LBaFueZpOgtR9S0sRbuLf_CynuMk7xMjEVi3Capb1V";
  const whatsAppURL = "https://chat.whatsapp.com/BanGDxwaSLgKMBWN6eDVzq";

  return (
    <div className="footer-container">
      <div className="footer-container__footer-upper-grid">
        <section className="footer-container__footer-upper-grid__section-subscribe">
          <h2 className="footer-container__footer-upper-grid__section-subscribe__title">{lan === 'en' ? 'Subscribe to our newsletter' : 'اشترك في نشرتنا'}</h2>
          <ul className="footer-container__footer-upper-grid__section-subscribe__list">
            <li className="footer-container__footer-upper-grid__section-subscribe__list__item">
              <input className="footer-container__footer-upper-grid__section-subscribe__list__item__input" placeholder={lan === 'en' ? 'Email address' : 'عنوان البريد الاكتروني'} />
              <button className="footer-container__footer-upper-grid__section-subscribe__list__item__button">{lan === 'en' ? 'Subscribe': 'اشترك'}</button>
            </li>
          </ul>
        </section>
        <section className="footer-container__footer-upper-grid__section-quick-links">
          <h2 className="footer-container__footer-upper-grid__section-quick-links__title">{lan === 'en' ? 'Quick Links' : 'روابط سريعه'}</h2>
          <ul className="footer-container__footer-upper-grid__section-quick-links__list">
            <li className="footer-container__footer-upper-grid__section-quick-links__list__item">
            <Link className="footer-container__footer-upper-grid__section-quick-links__list__item__link">{lan === 'en' ? 'About us' : 'عنّا'}</Link>
            </li>
            <li className="footer-container__footer-upper-grid__section-quick-links__list__item">
              <Link className="footer-container__footer-upper-grid__section-quick-links__list__item__link">{lan === 'en' ? 'Privacty Policy' : 'سياسه الخصوصيه'}</Link>
            </li>
            <li className="footer-container__footer-upper-grid__section-quick-links__list__item">
              <Link className="footer-container__footer-upper-grid__section-quick-links__list__item__link" to="/">{lan === 'en' ? 'Back to Home' : 'العوده الى الرئيسيه'}</Link>
            </li>
            <li className="footer-container__footer-upper-grid__section-quick-links__list__item">
              <Link className="footer-container__footer-upper-grid__section-quick-links__list__item__link">{lan === 'en' ? 'Shipping process' : 'عمليه الشحن'}</Link>
            </li>
            <li className="footer-container__footer-upper-grid__section-quick-links__list__item">
              <Link className="footer-container__footer-upper-grid__section-quick-links__list__item__link">{lan === 'en' ? 'Commonly Asked Questions' : 'الأسئله الشائعه'}</Link>
            </li>
          </ul>
        </section>
        <section className="footer-container__footer-upper-grid__section-contact-us">
          <h2 className="footer-container__footer-upper-grid__section-contact-us__title">{lan === 'en' ? 'Contact Us' : 'تواصل معنا'}</h2>
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
            <Link className="footer-container__footer-upper-grid__section-contact-us__list__item__link" to={whatsAppURL} target="_blank">{lan === 'en' ? 'Chat with us' : 'تحدث معنا'}</Link>
            </li>
          </ul>
        </section>
      </div>

      <div className="footer-container__footer-lower">
        <section className="footer-container__footer-lower__media-section">
        <a href={facebookURL} target="_blank" tabIndex="0"><img className="footer-container__footer-lower__media-section__media-icon" src={darkMode ? facebookIcon : facebookIconDarkMode}/></a>
        <a href={whatsAppURL} target="_blank" tabIndex="0"><img className="footer-container__footer-lower__media-section__media-icon" src={darkMode ? whatsappIcon : whatsappIconDarkMode}/></a>
        <a href={instagramURL} target="_blank" tabIndex="0"><img className="footer-container__footer-lower__media-section__media-icon" src={darkMode ? instagramIcon : instagramIconDarkMode}/></a>
        </section>
        <section className="footer-container__footer-lower__organism-rights">
          <h3 className="footer-container__footer-lower__organism-rights__h3">{lan === 'en' ? 'Syria © 2024 ONE BIKE all rights reseved' : 'سوريا © 2024 ون بايك جميع الحقوق محفوظة'}</h3>
        </section>
      </div>
    </div>
  )
}

export default Footer;