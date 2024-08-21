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
    const switchToDarkTheme = () => {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    };
    const switchToLightTheme = () => {
      document.body.classList.remove('dark-theme')
      document.body.classList.add('light-theme')
    };
    darkTheme ? switchToDarkTheme() : switchToLightTheme();
    onThemeChange(darkTheme);
    saveToLocalStorage();
  }, [darkTheme]);

  const toggleTheme = (event) => {
    event.target.style.opacity = '0';
    setTimeout(() => {
      setDarkTheme(theme => !theme);
      event.target.style.opacity = '1';
    }, 150)
  }

  return (
    <button onClick={event => toggleTheme(event)} aria-label="Change Theme">
      <img className="light-dark-button" src={darkTheme ? moonIcon : sunIcon} alt={darkTheme ? "Moon Icon" : "Sun Icon"}/>
    </button>
  )
}

export default LightDarkButton;