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

  const phoneNumberIconElement = useRef(null);
  const phoneNumberH2Element = useRef(null);

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
    <section className="userinfo-container">
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