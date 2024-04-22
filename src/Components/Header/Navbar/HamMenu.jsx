import React, {useRef, useState, useEffect} from 'react';

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

  const hamMenuContainerElement = useRef(null)
  const hamMenuSideBoxElement = useRef(null)

  const textLanguage = useRef({
    bike: 'Bikes',
    accessories: 'Accessories',
    parts: 'Parts'
  })

  useEffect(() => {
    if (language === 'English') {
      textLanguage.current = {
        menu: 'MENU',
        bike: 'Bikes',
        accessories: 'Accessories',
        parts: 'Parts'
      }
    } else if (language === 'العربيه') {
      textLanguage.current = {
        menu: 'القا،مه',
        bike: 'دراجات',
        accessories: 'اكسسوارات',
        parts: 'ملحقات الدراجه'
      }
    }
  }, [language])

  const handleClick = type => {
    type === 'exit' && onChange(false);
  }

  useEffect(() => {

    const handleMenuStyles = menu => {
      if (menu) {
        hamMenuContainerElement.current.style.visibility = "visible";
        hamMenuContainerElement.current.style.backgroundColor = "var(--hamMenu-background-color)";
        hamMenuSideBoxElement.current.style.transform = "translateX(0)";
        return
      }

      hamMenuContainerElement.current.style.backgroundColor = "hsl(0, 0%, 0%, 0)";
      hamMenuSideBoxElement.current.style.transform = `translateX(${language === 'English' ? '-15rem' : '15rem'})`;
      setTimeout( () =>hamMenuContainerElement.current.style.visibility = "hidden", 500);
    }

    handleMenuStyles(menu);
  }, [menu, language])

  return (
    <nav className="ham-menu-container" ref={hamMenuContainerElement}>
      <div className="ham-menu-container__side-box" ref={hamMenuSideBoxElement}>

        <section className="ham-menu-container__side-box__menu">
          {textLanguage.current.menu}
          <img className="ham-menu-container__side-box__menu__exit-icon" onClick={() =>  handleClick('exit')} src={darkMode ? closeIconDarkMode : closeIcon}/>
        </section>

        <ul className="ham-menu-container__side-box__menu-list">
          <li className="ham-menu-container__side-box__menu-list__lists">
            <div className="ham-menu-container__side-box__menu-list__lists__title">
              {textLanguage.current.bike}
              <img className="expand-circle" src={darkMode ? expandCircleUpIconDarkMode : expandCircleUpIcon}/>
            </div>
            <ul className="ham-menu-container__side-box__menu-list__lists__secondary-list clicked">
              <li className="ham-menu-container__side-box__menu-list__lists__secondary-list__lists">something</li>
              <li className="ham-menu-container__side-box__menu-list__lists__secondary-list__lists">something</li>
              <li className="ham-menu-container__side-box__menu-list__lists__secondary-list__lists">something</li>
              <li className="ham-menu-container__side-box__menu-list__lists__secondary-list__lists">something</li>
            </ul> 
          </li>

          <li className="ham-menu-container__side-box__menu-list__lists">
            <div className="ham-menu-container__side-box__menu-list__lists__title">
            <img src=""/>
            {textLanguage.current.accessories}
            <img className="expand-circle" src={darkMode ? expandCircleUpIconDarkMode : expandCircleUpIcon}/> 
            </div>
          </li>
          <li className="ham-menu-container__side-box__menu-list__lists">
            <div className="ham-menu-container__side-box__menu-list__lists__title">
            <img src=""/>
            {textLanguage.current.parts}
            <img className="expand-circle" src={darkMode ? expandCircleUpIconDarkMode : expandCircleUpIcon}/> 
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default HamMenu;