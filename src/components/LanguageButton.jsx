// HOOKS
import React, {useState, useRef, useEffect} from 'react';

// SCSS
import '../styles/components/LanguageButton.scss'

// UTILS
import localStorage from '/src/utils/localStorage';

function LanguageButton ({onLanguageChange}) {
  
  const [lan, setLanguage] = useState(() => {
    try {
      return localStorage.get('lan') || 'en';
    } catch (err) {
      console.error('Error parsing language from localStorage:', err);
      return 'en'
    }
  });
  const [languageList, setLanguageList] = useState(false);

  const isInitialMount = useRef(true);
  const languageElement = useRef(null);

  const en = lan === 'en';

  useEffect(() => {
    if (languageList) {
      languageElement.current.style.setProperty('--rotate-icon', 'rotate(180deg)');
    } else {
      languageElement.current.style.setProperty('--rotate-icon', 'rotate(0deg)');
    }
  },[languageList])

  useEffect(() => {
    const saveToStorage = () => isInitialMount.current ? (isInitialMount.current = false) : localStorage.set('lan', lan);
    const switchToArabic = () => document.body.classList.add('arabic');
    const switchToEnglish = () => document.body.classList.remove('arabic');
    en ? switchToEnglish() : switchToArabic();
    onLanguageChange(lan);
    saveToStorage();
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