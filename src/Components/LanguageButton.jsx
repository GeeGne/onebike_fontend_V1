// HOOKS
import React, {useState, useRef, useEffect} from 'react';

// SCSS
import '../styles/components/LanguageButton.scss'

function LanguageButton ({onLanguageChange}) {

  const [lan, setLanguage] = useState('en');
  const [languageList, setLanguageList] = useState(false);

  const languageElement = useRef(null);

  useEffect(() => {
    if (languageList) {
      languageElement.current.style.setProperty('--rotate-icon', 'rotate(180deg)');
    } else {
      languageElement.current.style.setProperty('--rotate-icon', 'rotate(0deg)');
    }
  },[languageList])

  useEffect(() => {
    onLanguageChange(lan);

    if (lan === 'ar') {
      document.body.classList.add('arabic');
      return;
    }
    document.body.classList.remove('arabic');
  },[lan])

  return (
    <button className="language-button" onClick={() => setLanguageList(prevLang => !prevLang)} ref={languageElement}>
      <h3 className="language-button__display">{lan === 'en' ? 'English' : 'العربيه'}</h3>
      {languageList &&
      <ul className="language-button__list">
        <li><button onClick={() => setLanguage('en')}><h3>English</h3></button></li>
        <li><button onClick={() => setLanguage('ar')}><h3>العربيه</h3></button></li>
      </ul>
      }
    </button>
  )
}

export default LanguageButton;