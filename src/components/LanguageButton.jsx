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
    <div className="language-btn" tabIndex="0" role="button" aria-label="Change Language To Arabic or English" onClick={() => setLanguageList(prevLang => !prevLang)} onKeyDown={e => e.key === 'Enter' && setLanguageList(prevLang => !prevLang)} ref={languageElement}>
      <span className="language-btn__display">{lan === 'en' ? 'English' : 'العربيه'}</span>
      {languageList &&
      <ul className="language-btn__list">
        <li tabIndex="0" role="button" onKeyDown={e => e.key === 'Enter' && setLanguage('en')} onClick={() => setLanguage('en')} aria-label="Set Language To English">English</li>
        <li tabIndex="0" role="button" onKeyDown={e => e.key === 'Enter' && setLanguage('ar')} onClick={() => setLanguage('ar')} aria-label="Set Language To Arabic">العربيه</li>
      </ul>
      }
    </div>
  )
}

export default LanguageButton;