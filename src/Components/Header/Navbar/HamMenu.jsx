import React, {useRef, useState, useEffect} from 'react';

import mainListData from '/src/Data/Menu.json';

import '../../../Styles/Components/Header/Navbar/HamMenu.scss';

// ICONS
import expandCircleUpIcon from '../../../assets/Img/Icons/expand_circle_down.svg';
import expandCircleDownIcon from '../../../assets/Img/Icons/expand_circle_up.svg';
import closeIcon from '../../../assets/Img/Icons/close.svg';
import bicycleIcon from '../../../assets/Img/Icons/bicycle.svg';
import bicycle2Icon from '../../../assets/Img/Icons/menu.svg';
import accesssoriesIcon from '../../../assets/Img/Icons/menu.svg';
import partsIcon from '../../../assets/Img/Icons/menu.svg';

// ICONS - DARKMODE
import expandCircleUpIconDarkMode from '../../../assets/Img/Icons/expand_circle_down_darkMode.svg';
import expandCircleDownIconDarkMode from '../../../assets/Img/Icons/expand_circle_up_darkMode.svg';
import closeIconDarkMode from '../../../assets/Img/Icons/close_darkMode.svg';
import bicycleIconDarkMode from '../../../assets/Img/Icons/bicycle_darkMode.svg';
import bicycle2IconDarkMode from '../../../assets/Img/Icons/menu_darkMode.svg';
import accesssoriesIconDarkMode from '../../../assets/Img/Icons/menu_darkMode.svg';
import partsIconDarkMode from '../../../assets/Img/Icons/menu_darkMode.svg';

function HamMenu ({menu, onChange, darkMode, language}) {

  const hamMenuContainerElement = useRef(null);
  const hamMenuSideBoxElement = useRef(null);
  const mainListElements = useRef([]);
  const secondaryListElements = useRef([]);

  const textLanguage = useRef({})

  useEffect(() => {
    if (language === 'English') {
      textLanguage.current = {
        menu: 'MENU',
      }
    } else if (language === 'العربيه') {
      textLanguage.current = {
        menu: 'القا،مه',
      }
    }
  }, [language])

  const handleClick = (type, other) => {
    
    const getElement = (elements, id) => {
      let matchedElement;

      elements.forEach(element => {
        const {listId} = element.dataset;
        listId === id && (matchedElement = element)
      })

      return matchedElement;
    }

    type === 'exit' && onChange(false);

    if (type === 'title element') {
      const event = other;
      const titleElement = event.currentTarget;
      const {listId} = titleElement.dataset;
      const matchedSecondaryElement = getElement(secondaryListElements.current, listId);
      const matchedSecondaryElementScrollHeight = matchedSecondaryElement.scrollHeight; 
      const elementClicked = titleElement.classList.contains('clicked') ? true : false;
      
      if (elementClicked) {
        titleElement.classList.remove('clicked');
        matchedSecondaryElement.style.height = '0';
      } else if (!elementClicked) {
        titleElement.classList.add('clicked');
        matchedSecondaryElement.style.height = `${matchedSecondaryElementScrollHeight}px`;
      }
    }
  }

  useEffect(() => {
    const handleMenuStyles = menu => {        
      const containerStyle = hamMenuContainerElement.current.style;
      const sideBoxStyle = hamMenuSideBoxElement.current.style;

      if (menu) {
        containerStyle.visibility = "visible";
        containerStyle.backgroundColor = "var(--hamMenu-background-color)";
        sideBoxStyle.transform = "translateX(0)";
        return
      }

      containerStyle.backgroundColor = "hsl(0, 0%, 0%, 0)";
      sideBoxStyle.transform = `translateX(${language === 'English' ? '-15em' : '15em'})`;
      setTimeout( () => containerStyle.visibility = "hidden", 500);
    }
    handleMenuStyles(menu);
  }, [menu, language])

  const mainListsArray = language === 'English' ? mainListData.english : mainListData.arabic;
  const mainListDOM = mainListsArray.map((data, i) => {
    const {mainList} = data;
    const {secondaryList} = data;
    const arrayLength = mainListsArray.length;

    const secondaryListHTML = secondaryList.map(list => 
      <li key={list.id} className="ham-menu-container__side-box__menu-list__lists__secondary-list__lists">
        <h3 className="ham-menu-container__side-box__menu-list__lists__secondary-list__lists__h3">
          {list.name}
        </h3>  
      </li>
    )

    return (
      <li
        className="ham-menu-container__side-box__menu-list__lists"
        ref={el => {
          i === 0 && (mainListElements.current = []);
          const {length} = mainListElements.current;
          length < arrayLength && (mainListElements.current = [...mainListElements.current, el])
        }}  
        data-list-id={i}
        key={mainList}
      >

        <div 
          className="ham-menu-container__side-box__menu-list__lists__title"
          onClick={e => handleClick('title element', e)}
          data-list-id={i}
        >
          <h2 
            className="ham-menu-container__side-box__menu-list__lists__title__h2" 
          >
            {mainList}
          </h2>
          <img 
            className="expand-circle" 
            src={darkMode ? expandCircleUpIconDarkMode : expandCircleUpIcon}
          />
        </div>

        <ul 
          className="ham-menu-container__side-box__menu-list__lists__secondary-list"
          data-list-id={i}
          ref={le => {
            i === 0 && (secondaryListElements.current = []);
            const {length} = secondaryListElements.current;
            length < arrayLength && (secondaryListElements.current = [...secondaryListElements.current, le]);
          }}  
        >
            {secondaryListHTML}
        </ul>

      </li> 
    )
  })

  return (
    <nav className="ham-menu-container" ref={hamMenuContainerElement}>
      <div className="ham-menu-container__side-box" ref={hamMenuSideBoxElement}>

        <section className="ham-menu-container__side-box__menu">
          <h1 className="ham-menu-container__side-box__menu__h1">
            {textLanguage.current.menu}
          </h1>
          <img 
            className="ham-menu-container__side-box__menu__exit-icon" 
            onClick={() =>  handleClick('exit')} src={darkMode ? closeIconDarkMode : closeIcon}
          />
        </section>

        <ul className="ham-menu-container__side-box__menu-list">
          {mainListDOM}
        </ul>

      </div>
    </nav>
  )
}

export default HamMenu;