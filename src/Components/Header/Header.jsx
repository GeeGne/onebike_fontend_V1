import React, {useState} from 'react';

import '../../Styles/Components/Header/Header.scss';

import IntroSection from './IntroSection';
import Navbar from './Navbar/Navbar';

function Header () {

 const [darkMode, setDarkMode] = useState(false);
 const [language, setLanguage] = useState('English');

  const themeData = data => {
    setDarkMode(data);
  }

  const languageData = data => {
    setLanguage(data);
  }


  return (
    <>
      <IntroSection onThemeChange={themeData} onLanguageChange={languageData}/>
      <Navbar darkMode={darkMode} language={language}/>
    </>
  )
}

export default Header;