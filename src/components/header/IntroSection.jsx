// HOOKS
import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';

// SCSS
import '../../styles/components/header/IntroSection.scss';

// COMPONENTS
import Alert from '../Alert';
import LanguageButton from '../LanguageButton';
import LightDarkButton from '../LightDarkButton';

// JSON
import oneBike from '/src/data/one-bike.json';

// UTILS
import strRemoveSpace from '/src/utils/strRemoveSpace.js';

// ICONS
import facebookIcon from '../../assets/img/icons/facebook.svg';
import instagramIcon from '../../assets/img/icons/instagram.svg';
import whatsappIcon from '../../assets/img/icons/whatsapp.svg';
import callIcon from '../../assets/img/icons/call.svg';
import callPlusFillIcon from '../../assets/img/icons/call_plus_fill.svg';

// ICONS - DARKMODE
import facebookIconDarkMode from '../../assets/img/icons/facebook_darkMode.svg';
import instagramIconDarkMode from '../../assets/img/icons/instagram_darkMode.svg';
import whatsappIconDarkMode from '../../assets/img/icons/whatsapp_darkMode.svg';
import callIconDarkMode from '../../assets/img/icons/call_darkMode.svg';
import callPlusFillIconDarkMode from '../../assets/img/icons/call_plus_fill_darkMode.svg';

function IntroSection ({onThemeChange, onLanguageChange}) {
 
  const [darkMode, setDarkMode] = useState(false);
  const [lan, setLanguage] = useState('en');
  const [alertText, setAlertText] = useState(null);
  const [newAlert, setNewAlert] = useState(0);

  const infoSectionEL = useRef(null);
  const phoneNumberIconElement = useRef(null);
  const phoneNumberH2Element = useRef(null);
  const sectionHeight = useRef(null);

  useEffect(() => {
    sectionHeight.current = infoSectionEL.current.scrollHeight; 
  }, []);

  useEffect(() => {
    const styleIntroElWhenScrollToTop = () => {
      const currentScrollY = window.scrollY;

      switch (true) {
        case (currentScrollY >= 1):
          infoSectionEL.current.style.setProperty('--set-introSection-before-width', '100%');
          const timerA = setTimeout(() => {
            infoSectionEL.current.style.overflow = 'hidden';
            infoSectionEL.current.style.height = '0';
            infoSectionEL.current.style.paddingBlock = '0';
          }, 250);
          const timerB = setTimeout(() => {
            infoSectionEL.current.style.setProperty('--set-introSection-after-visibility', 'visible');
            infoSectionEL.current.style.setProperty('--set-introSection-after-opacity', '1');
          }, 500);
          break;
        default:
          const timerC = setTimeout(() => {
            infoSectionEL.current.style.height = `${sectionHeight.current}px`;
            infoSectionEL.current.style.paddingBlock = '0.3em';
          }, 250);
          const timerD = setTimeout(() => {
            infoSectionEL.current.style.setProperty('--set-introSection-after-opacity', '0');
          }, 500);
          const timerE = setTimeout(() => {
            infoSectionEL.current.style.overflow = `visible`;
            infoSectionEL.current.style.setProperty('--set-introSection-after-visibility', 'hidden');
            infoSectionEL.current.style.setProperty('--set-introSection-before-width', '100vw');
          }, 750);
      }
    }

    window.addEventListener && window.addEventListener('scroll', styleIntroElWhenScrollToTop);
    return () => window.removeEventListener('scroll', styleIntroElWhenScrollToTop);
  }, [])

  useEffect(() => {
    onThemeChange(darkMode);
  }, [darkMode])

  useEffect(() => {
    onLanguageChange(lan);
  }, [lan])

  const themeData = setDarkMode;
  const languageData = setLanguage;

  const handleClick = () => {
    const number = strRemoveSpace(phoneNumberH2Element.current.textContent);
    const alertMessage = lan === 'en' ? 
    'Number is copied to the clipboard successfully!' : 'لقد تم نسخ رقم الهاتف بنجاح!';
    
    navigator.clipboard.writeText(number);
    setAlertText(alertMessage);
    setNewAlert(Math.random());
  }

  const handleHover = type => {
    const element = phoneNumberIconElement.current;
    const callImg = darkMode ? callIconDarkMode : callIcon;
    const callFillImg = darkMode ? callPlusFillIconDarkMode : callPlusFillIcon;

    type === 'enter' ? (element.src = callFillImg) : (element.src = callImg);
  }

  return (
    <section className="userinfo-container" ref={infoSectionEL}>
      <Alert alertText={alertText} newAlert={newAlert}/>
        <a className="userinfo-container__icons-a" href={oneBike.facebook} target="_blank" tabIndex="0">
          <img className="userinfo-container__icons-a__img" src={darkMode ? facebookIconDarkMode : facebookIcon}/>
        </a>
        <a className="userinfo-container__icons-a" href={oneBike.instagram} target="_blank" tabIndex="0">
          <img className="userinfo-container__icons-a__img" src={darkMode ? instagramIconDarkMode : instagramIcon}/>
        </a>
        <a className="userinfo-container__icons-a" href={oneBike.whatsApp} target="_blank" tabIndex="0">
          <img className="userinfo-container__icons-a__img" src={darkMode ? whatsappIconDarkMode : whatsappIcon}/>
        </a>

        <button className="userinfo-container__phone-number" onClick={handleClick} onMouseEnter={() => handleHover('enter')} onMouseLeave={() => handleHover('leave')}>
          <img src={darkMode ? callIconDarkMode : callIcon} ref={phoneNumberIconElement}/>
          <span ref={phoneNumberH2Element}>{oneBike.phone}</span>
        </button>

        <LightDarkButton onThemeChange={themeData}/>
        <LanguageButton onLanguageChange={languageData}/>
    </section>
  )
}

export default IntroSection;