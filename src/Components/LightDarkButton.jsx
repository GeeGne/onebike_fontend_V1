// HOOKS
import React, {useState, useEffect} from 'react';

// SCSS
import '../styles/components/LightDarkButton.scss';

// ICONS
import sunIcon from "../assets/img/icons/sun.svg";
import moonIcon from "../assets/img/icons/moon.svg";

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