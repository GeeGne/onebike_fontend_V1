import React, {useState} from 'react';

import '../../Styles/Components/Header/Header.scss';

import IntroSection from './IntroSection';
import Navbar from './Navbar/Navbar';

function Header () {

 const [darkMode, setDarkMode] = useState(false)

  const themeData = data => {
    setDarkMode(data);
  }

  return (
    <>
      <IntroSection onThemeChange={themeData}/>
      <Navbar darkMode={darkMode}/>
    </>
  )
}

export default Header;