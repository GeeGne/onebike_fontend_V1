import React, {useState, useEffect} from 'react';

import '../../Styles/Components/Header/Header.scss';

import IntroSection from './IntroSection';
import Navbar from './Navbar/Navbar';

function Header ({onThemeChange, onLanguageChange}) {

 const [darkMode, setDarkMode] = useState(false);
 const [lan, setLanguage] = useState('en');

  useEffect(() => {
    onThemeChange(darkMode);
  }, [darkMode]);

  useEffect(() => {
    onLanguageChange(lan);
  }, [lan]);

  const themeData = data => {
    setDarkMode(data);
  }

  const languageData = data => {
    setLanguage(data);
  }


  return (
    <>
      <IntroSection onThemeChange={themeData} onLanguageChange={languageData}/>
      <Navbar darkMode={darkMode} lan={lan}/>
    </>
  )
}

export default Header;