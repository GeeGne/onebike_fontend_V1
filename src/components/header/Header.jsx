// HOOKS
import React, {useState, useEffect} from 'react';

// SCSS
import '../../styles/components/header/Header.scss';

// COMPONENTS
import IntroSection from './IntroSection';
import Navbar from './navbar/Navbar';

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
      <Navbar darkMode={darkMode} lan={lan} />
    </>
  )
}

export default Header;