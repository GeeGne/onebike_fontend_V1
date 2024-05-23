import React, {useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';

// SCSS
import '../../Styles/Components/Header/IntroSection.scss';

// COMPONENTS
import Alert from '../Alert';
import LanguageButton from '../LanguageButton';
import LightDarkButton from '../LightDarkButton';

// ICONS
import facebookIcon from '../../assets/Img/Icons/facebook.svg';
import instagramIcon from '../../assets/Img/Icons/instagram.svg';
import whatsappIcon from '../../assets/Img/Icons/whatsapp.svg';
import callIcon from '../../assets/Img/Icons/call.svg';
import callPlusFillIcon from '../../assets/Img/Icons/call_plus_fill.svg';

// ICONS - DARKMODE
import facebookIconDarkMode from '../../assets/Img/Icons/facebook_darkMode.svg';
import instagramIconDarkMode from '../../assets/Img/Icons/instagram_darkMode.svg';
import whatsappIconDarkMode from '../../assets/Img/Icons/whatsapp_darkMode.svg';
import callIconDarkMode from '../../assets/Img/Icons/call_darkMode.svg';
import callPlusFillIconDarkMode from '../../assets/Img/Icons/call_plus_fill_darkMode.svg';

function IntroSection ({onThemeChange, onLanguageChange}) {
 
  const [darkMode, setDarkMode] = useState(false);
  const [lan, setLanguage] = useState('en');
  const [alertText, setAlertText] = useState(null);
  const [newAlert, setNewAlert] = useState(0);

  const phoneNumberIconElement = useRef(null);
  const phoneNumberH2Element = useRef(null);

  const facebookURL = "https://www.facebook.com/profile.php?id=61555487381717";
  const instagramURL = "https://www.instagram.com/onebike2024?fbclid=IwZXh0bgNhZW0CMTAAAR0j3tRBpSGxAkPztNBkI-KKoBI454wtiODT8gyzjrY2B6jtQhzTFDkpvuI_aem_AZvvFyQoDJ0_EqQr36CwzmanbLAnK_nFqsXLZollXvn2m7LBaFueZpOgtR9S0sRbuLf_CynuMk7xMjEVi3Capb1V";
  const whatsAppURL = "https://chat.whatsapp.com/BanGDxwaSLgKMBWN6eDVzq";

  useEffect(() => {
    onThemeChange(darkMode);
  }, [darkMode])

  useEffect(() => {
    onLanguageChange(lan);
  }, [lan])

  const themeData = data => {
    setDarkMode(data);
  }

  const languageData = data => {
    setLanguage(data);
  }

  const handleClick = () => {
    const number = phoneNumberH2Element.current.textContent;
    const alertMessage = lan === 'en' ? 
    'Number is copied to the clipboard successfully!' : 
    'لقد تم نسخ رقم الهاتف بنجاح!';
    
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
    <>
      <Alert alertText={alertText} newAlert={newAlert}/>
      <section className="userinfo-container">
        <a className="userinfo-container__icons-a" href={facebookURL} target="_blank" tabIndex="0">
          <img className="userinfo-container__icons-a__img" src={darkMode ? facebookIconDarkMode : facebookIcon}/>
        </a>
        <a className="userinfo-container__icons-a" href={instagramURL} target="_blank" tabIndex="0">
          <img className="userinfo-container__icons-a__img" src={darkMode ? instagramIconDarkMode : instagramIcon}/>
        </a>
        <a className="userinfo-container__icons-a" href={whatsAppURL} target="_blank" tabIndex="0">
          <img className="userinfo-container__icons-a__img" src={darkMode ? whatsappIconDarkMode : whatsappIcon}/>
        </a>

        <button className="userinfo-container__phone-number" onClick={handleClick} onMouseEnter={() => handleHover('enter')} onMouseLeave={() => handleHover('leave')}>
          <img src={darkMode ? callIconDarkMode : callIcon} ref={phoneNumberIconElement}/>
          <h2 ref={phoneNumberH2Element}>+963 964 803 712</h2>
        </button>

        <div className="userinfo-container__light-dark-button-container">
          <LightDarkButton onThemeChange={themeData}/>
        </div>

        <div className="userinfo-container__language-button-container">
          <LanguageButton onLanguageChange={languageData}/>
        </div>
      </section>
    </>
  )
}

export default IntroSection;