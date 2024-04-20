import React, {useState, useEffect} from 'react';

import '../Styles/Components/LightDarkButton.scss';

import sunIcon from "../assets/Img/Icons/sun.svg";
import moonIcon from "../assets/Img/Icons/moon.svg";

function LightDarkButton ({getThemeData}) {

  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    darkTheme ? document.body.classList.add('dark-theme') :
    document.body.classList.remove('dark-theme');
    getThemeData(darkTheme);
  }, [darkTheme])


  const toggleTheme = (event) => {
    event.target.style.opacity = '0';
    setTimeout(() => {
      setDarkTheme(theme => !theme);

      event.target.style.opacity = '1';
    }, 500)
  }

  return (
    <>
      <img 
        className="light-dark-button" 
        onClick={event => toggleTheme(event)} 
        src={darkTheme? moonIcon : sunIcon}
      />
    </>
  )
}

export default LightDarkButton;