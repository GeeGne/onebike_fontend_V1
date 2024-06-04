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
      <span className="language-button__display">{lan === 'en' ? 'English' : 'العربيه'}</span>
      {languageList &&
      <ul className="language-button__list">
        <li><button onClick={() => setLanguage('en')}>English</button></li>
        <li><button onClick={() => setLanguage('ar')}>العربيه</button></li>
      </ul>
      }
    </button>
  )
}

export default LanguageButton;