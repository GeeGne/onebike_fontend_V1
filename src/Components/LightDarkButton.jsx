import React, {useState, useEffect} from 'react';

import '../Styles/Components/LightDarkButton.scss';

import sunIcon from "../assets/Img/Icons/sun.svg";
import moonIcon from "../assets/Img/Icons/moon.svg";

function LightDarkButton ({onThemeChange}) {

  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    darkTheme ? document.body.classList.add('dark-theme') :
    document.body.classList.remove('dark-theme');
    onThemeChange(darkTheme);
  }, [darkTheme])


  const toggleTheme = (event) => {
    event.target.style.opacity = '0';
    setTimeout(() => {
      setDarkTheme(theme => !theme);

      event.target.style.opacity = '1';
    }, 500)
  }

  return (
    <button onClick={event => toggleTheme(event)} >
      <img className="light-dark-button" src={darkTheme? moonIcon : sunIcon}/>
    </button>
  )
}

export default LightDarkButton;