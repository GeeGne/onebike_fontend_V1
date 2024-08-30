// HOOKS
import React, {useState, useEffect, useRef} from 'react';

// SCSS
import '../styles/components/LightDarkButton.scss';

// UTILS
import localStorage from '/src/utils/localStorage';

// ICONS
import sunIcon from "/assets/img/icons/sun.svg";
import moonIcon from "/assets/img/icons/moon.svg";

function LightDarkButton ({onThemeChange}) {

  const [darkTheme, setDarkTheme] = useState(() => {
    try {
      return localStorage.get('darkTheme') || false;
    } catch {
      return false;
    }
  });

  const isInitialMount = useRef(true);

  useEffect(() => {
    const saveToLocalStorage = () => isInitialMount.current ? (isInitialMount.current = false) : localStorage.set('darkTheme', darkTheme);
    const switchToDarkTheme = () => document.body.classList.add('dark-theme');
    const switchToLightTheme = () => document.body.classList.remove('dark-theme');
    darkTheme ? switchToDarkTheme() : switchToLightTheme();
    onThemeChange(darkTheme);
    saveToLocalStorage();
  }, [darkTheme]);

  const toggleTheme = (event) => {
    setDarkTheme(theme => !theme);

    // event.target.style.opacity = '0';
    // setTimeout(() => {
      // setDarkTheme(theme => !theme);
      // event.target.style.opacity = '1';
    // }, 150)
  }

  return (
    <button 
      className="theme" 
      aria-label="Change Theme" 
      onClick={event => toggleTheme(event)}
    >
      <div className="theme__slider" />
    </button>
  )
}

export default LightDarkButton;

{/* <button onClick={event => toggleTheme(event)} aria-label="Change Theme"> */}
{/* <img className="light-dark-button" src={darkTheme ? moonIcon : sunIcon} alt={darkTheme ? "Moon Icon" : "Sun Icon"}/> */}
{/* </button> */}
