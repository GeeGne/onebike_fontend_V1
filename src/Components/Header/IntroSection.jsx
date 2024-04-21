import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';

import '../../Styles/Components/Header/IntroSection.scss';

import LanguageButton from '../LanguageButton.jsx';
import LightDarkButton from '../LightDarkButton.jsx';

//  ICONS
import facebookIcon from '../../assets/Img/Icons/facebook.svg';
import instagramIcon from '../../assets/Img/Icons/instagram.svg';
import whatsappIcon from '../../assets/Img/Icons/whatsapp.svg';

//  ICONS - DARKMODE
import facebookIconDarkMode from '../../assets/Img/Icons/facebook_darkMode.svg';
import instagramIconDarkMode from '../../assets/Img/Icons/instagram_darkMode.svg';
import whatsappIconDarkMode from '../../assets/Img/Icons/whatsapp_darkMode.svg';

function IntroSection () {
 
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  const getThemeData = (data) => {
    setDarkMode(data);
  }

  const facebookURL = "https://www.facebook.com/profile.php?id=61555487381717";
  const instagramURL = "https://www.instagram.com/onebike2024?fbclid=IwZXh0bgNhZW0CMTAAAR0j3tRBpSGxAkPztNBkI-KKoBI454wtiODT8gyzjrY2B6jtQhzTFDkpvuI_aem_AZvvFyQoDJ0_EqQr36CwzmanbLAnK_nFqsXLZollXvn2m7LBaFueZpOgtR9S0sRbuLf_CynuMk7xMjEVi3Capb1V";
  const whatsAppURL = "https://chat.whatsapp.com/BanGDxwaSLgKMBWN6eDVzq";

  return (
    <>
      <section className={`userinfo-container ${language === 'العربيه' && 'arabic'}`}>
        {/* <Link to="/">
          <img className="logo" src={shoppingCartLogo}/>
        </Link> */}

        <a 
          className="userinfo-container__icons-a"
          href={facebookURL}
          target="_blank" 
        >
          <img className="userinfo-container__icons-a__img" src={darkMode ? facebookIconDarkMode : facebookIcon}/>
        </a>
        <a 
          className="userinfo-container__icons-a"
          href={instagramURL}
          target="_blank"
        >
          <img className="userinfo-container__icons-a__img" src={darkMode ? instagramIconDarkMode : instagramIcon}/>
        </a>
        <a 
          className="userinfo-container__icons-a"
          href={whatsAppURL}
          target="_blank"
        >
          <img className="userinfo-container__icons-a__img" src={darkMode ? whatsappIconDarkMode : whatsappIcon}/>
        </a>

        <button className="userinfo-container__light-dark-button">
          <LightDarkButton getThemeData={getThemeData}/>
        </button>

        <button className="userinfo-container__language-button">
          <LanguageButton/>
        </button>
      </section>
    </>
  )
}

export default IntroSection;