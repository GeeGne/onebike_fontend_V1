import React, {useState, useRef, useEffect} from 'react';
import '../Styles/Components/LanguageButton.scss'

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
    <div 
      className="language-button"
      onClick={() => setLanguageList(prevLang => !prevLang)}
      ref={languageElement}
    >
      <h3 className="language-button__display">{lan === 'en' ? 'English' : 'العربيه'}</h3>
      {languageList &&
      <ul className="language-button__list">
        <li onClick={() => setLanguage('en')}><h3>English</h3></li>
        <li onClick={() => setLanguage('ar')}><h3>العربيه</h3></li>
      </ul>
      }
    </div>
  )
}

export default LanguageButton;