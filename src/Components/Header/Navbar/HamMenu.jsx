import React, {useRef, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import mainListData from '/src/Data/Menu.json';

import '../../../Styles/Components/Header/Navbar/HamMenu.scss';

// UTILS
import cleanseString from '/src/Utils/cleanseString.js';

// ICONS
import expandCircleUpIcon from '../../../assets/Img/Icons/expand_circle_down.svg';
import closeIcon from '../../../assets/Img/Icons/close.svg';

// ICONS - DARKMODE
import expandCircleUpIconDarkMode from '../../../assets/Img/Icons/expand_circle_down_darkMode.svg';
import closeIconDarkMode from '../../../assets/Img/Icons/close_darkMode.svg';

function HamMenu ({menu, onMenuChange, darkMode, language}) {

  const navigate = useNavigate();

  // Elements
  const hamMenuContainerElement = useRef(null);
  const hamMenuSideBoxElement = useRef(null);
  const mainListElements = useRef([]);
  const secondaryListElements = useRef([]);
  const thirdListContainerElements = useRef([]);

  const textLanguage = useRef({})
  const randomNum = useRef(0);

  // const mainListsArray = language === 'english' ? mainListData : mainListData;
  const arrayLength = mainListData.length;
  let secondListLength = 0;
  mainListData.forEach(list => list.secondaryList.forEach(() => secondListLength++))

  useEffect(() => {
    if (language === 'english') {
      textLanguage.current = {
        menu: 'MENU',
      }
    } else if (language === 'العربيه') {
      textLanguage.current = {
        menu: 'القائمه',
      }
    }
  }, [language])

  useEffect(() => {
    const handleMenuStyles = menu => {        
      const containerStyle = hamMenuContainerElement.current.style;
      const sideBoxStyle = hamMenuSideBoxElement.current.style;

      if (menu) {
        containerStyle.visibility = "visible";
        containerStyle.backgroundColor = "var(--hamMenu-background-color)";
        sideBoxStyle.transform = "translateX(0)";
        return;
      }

      containerStyle.backgroundColor = "hsl(0, 0%, 0%, 0)";
      sideBoxStyle.transform = `translateX(${language === 'english' ? '-15em' : '15em'})`;
      setTimeout( () => containerStyle.visibility = "hidden", 500);
    }
    handleMenuStyles(menu);
  }, [menu, language])

  const handleClick = (type, other, mainList, thirdData) => {

    const getElement = (elements, id) => {
      let matchedElement;

      elements.forEach(element => {
        const {listId} = element.dataset;
        listId === id && (matchedElement = element)
      })

      return matchedElement;
    }

    const getListId = element => element.dataset.listId;

    // type === 'exit' && onMenuChange(false);

    if (type === 'title element') {
      const event = other;
      const titleElement = event.currentTarget;
      const matchedSecondaryElement = getElement(secondaryListElements.current, getListId(titleElement));
      const matchedSecondaryElementScrollHeight = matchedSecondaryElement.scrollHeight; 
      const elementClicked = titleElement.classList.contains('clicked') ? true : false;
      
      if (elementClicked) {
        titleElement.classList.remove('clicked');
        matchedSecondaryElement.classList.remove('clicked');
        matchedSecondaryElement.style.height = '0';
      } else if (!elementClicked) {
        document.body.style.overFlow = "hidden hidden";
        titleElement.classList.add('clicked');
        matchedSecondaryElement.classList.add('clicked');
        matchedSecondaryElement.style.height = `${matchedSecondaryElementScrollHeight}px`;
      }
    }

    if (type === 'second list') {
      const event = other;
      const secondSectionElement = event.currentTarget;
      const matchedThirdElement = getElement(thirdListContainerElements.current, getListId(secondSectionElement));
      const matchedThirdElementScrollHeight = matchedThirdElement.scrollHeight; 
      const elementClicked = secondSectionElement.classList.contains('clicked');

      if (elementClicked) {
        secondSectionElement.classList.remove('clicked');
        matchedThirdElement.style.height = '0';
      } else if (!elementClicked) {
        document.body.style.overFlow = "hidden hidden";
        secondSectionElement.classList.add('clicked');
        matchedThirdElement.style.height = `${matchedThirdElementScrollHeight}px`;
      }
      secondaryListElements.current.forEach(el => el.classList.contains('clicked') && (el.style.height = `100%`))
    }

    if (type === 'third list') {
      navigate(`/${cleanseString(mainList)}/${cleanseString(thirdData)}`);
      onMenuChange(false);
    }
  }

  const addRef = (type, el, i) => {
    if (type === 'mainListElement') {
      i === 0 && (mainListElements.current = []);
      const {length} = mainListElements.current;
      length < arrayLength && (mainListElements.current = [...mainListElements.current, el])
    }

    if (type === 'secondaryListElements') {
      i === 0 && (secondaryListElements.current = []);
      const {length} = secondaryListElements.current;
      length < arrayLength && (secondaryListElements.current = [...secondaryListElements.current, el])
    }

    if (type === 'thirdListContainerElements') {
      const {length} = thirdListContainerElements.current;
      length < secondListLength && (thirdListContainerElements.current = [...thirdListContainerElements.current, el])
    }
  }

  return (
    <nav className="ham-menu-container" ref={hamMenuContainerElement}>
      <div className="ham-menu-container__side-box" ref={hamMenuSideBoxElement}>
        <section className="ham-menu-container__side-box__menu">
          <h1 className="ham-menu-container__side-box__menu__h1">
            {textLanguage.current.menu}
          </h1>
          <img 
            className="ham-menu-container__side-box__menu__exit-icon" 
            onClick={() => onMenuChange(false)} src={darkMode ? closeIconDarkMode : closeIcon}
          />
        </section>
        <ul className="ham-menu-container__side-box__menu-list">
          {mainListData.map((mainData, i) => 
          <li
            className="ham-menu-container__side-box__menu-list__lists"
            ref={el => addRef('mainListElement', el, i)} data-list-id={i} key={mainData.id}
          >
            <div 
              className="ham-menu-container__side-box__menu-list__lists__title"
              onClick={e => handleClick('title element', e, i)} data-list-id={i}
            >
              <h2 className="ham-menu-container__side-box__menu-list__lists__title__h2">{mainData.mainList[language]}</h2>
              <img className="expand-circle" src={darkMode ? expandCircleUpIconDarkMode : expandCircleUpIcon}/>
            </div>
            <ul 
              className="ham-menu-container__side-box__menu-list__lists__secondary-list"
              ref={el => addRef('secondaryListElements', el, i)} data-list-id={i}
            >
              {mainData.secondaryList.map(secondData => 
              <li className="ham-menu-container__side-box__menu-list__lists__secondary-list__lists" key={secondData.id}>
                <div 
                  className="ham-menu-container__side-box__menu-list__lists__secondary-list__lists__section"
                  onClick={(e) => handleClick('second list', e)}
                  data-list-id={randomNum.current = Math.random()}
                >
                  <h3 className="ham-menu-container__side-box__menu-list__lists__secondary-list__lists__section__h3">{secondData.name[language]}</h3>
                  <div className="ham-menu-container__side-box__menu-list__lists__secondary-list__lists__section__img"></div>
                </div>
                <ul 
                  className="ham-menu-container__side-box__menu-list__lists__secondary-list__lists__third-list"
                  ref={el => addRef('thirdListContainerElements', el, i)} data-list-id={randomNum.current}
                >
                  {secondData.thirdList[language].map(thirdData =>           
                  <li className="ham-menu-container__side-box__menu-list__lists__secondary-list__lists__third-list__lists" onClick={() => handleClick('third list', null, mainData.mainList.english, thirdData)} key={thirdData}>
                    <h3 className="ham-menu-container__side-box__menu-list__lists__secondary-list__lists__third-list__lists__h3">{thirdData}</h3>
                  </li>
                  )}
                </ul>
              </li>
              )}
            </ul>
          </li> 
          )}
        </ul>
      </div>
    </nav>
  )
}

export default HamMenu;