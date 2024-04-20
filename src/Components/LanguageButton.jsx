import React, {useState, useRef, useEffect} from 'react';
import '../Styles/Components/LanguageButton.scss'

function LanguageButton ({getLanguageData}) {

  const [language, setLanguage] = useState('English');
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
    getLanguageData(language);
  },[language])

  const handleClick = e => {
    const selectedLanguage = e.target.textContent;
    setLanguage(selectedLanguage)
  }

  return (
    <div 
      className="language-button"
      onClick={() => setLanguageList(prevLang => !prevLang)}
      ref={languageElement}
    >
      {language}
      {languageList &&
      <ul className="language-button__list">
        <li onClick={e => handleClick(e)}>English</li>
        <li onClick={e => handleClick(e)}>العربيه</li>
      </ul>
      }
    </div>
  )
}

export default LanguageButton;