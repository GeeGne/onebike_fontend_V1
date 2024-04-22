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

function HamMenu ({menu, onChange, darkMode}) {

  const hamMenuContainerElement = useRef(null)
  const hamMenuSideBoxElement = useRef(null)

  const handleClick = type => {
    type === 'exit' && onChange(false);
  }

  console.log({darkMode})

  useEffect(() => {

    const handleMenuStyles = menu => {
      if (menu) {
        console.log({hamMenuContainerElement, hamMenuSideBoxElement})
        hamMenuContainerElement.current.style.visibility = "visible";
        hamMenuContainerElement.current.style.backgroundColor = "var(--hamMenu-background-color)";
        hamMenuSideBoxElement.current.style.transform = "translateX(0)";
        return
      }

      hamMenuContainerElement.current.style.backgroundColor = "hsl(0, 0%, 0%, 0)";
      hamMenuSideBoxElement.current.style.transform = "translateX(-15rem)";


      setTimeout( () =>hamMenuContainerElement.current.style.visibility = "hidden", 500);
    }

    handleMenuStyles(menu);
  }, [menu])

  return (
    <nav className="ham-menu-container" ref={hamMenuContainerElement}>
      <div className="ham-menu-container__side-box" ref={hamMenuSideBoxElement}>
        <section className="ham-menu-container__side-box__menu">
          MENU
          <img onClick={() =>  handleClick('exit')} src={closeIcon}/>
        </section>
        <ul className="ham-menu-container__side-box__list">
          <li>
            Bikes
            <img className="expand-circle" src={darkMode ? expandCircleUpIconDarkMode : expandCircleUpIcon}/> 
          </li>
          <li>
            <img src=""/>
            Accessories
            <img className="expand-circle" src={darkMode ? expandCircleUpIconDarkMode : expandCircleUpIcon}/> 
          </li>
          <li>
            <img src=""/>
            Parts
            <img className="expand-circle" src={darkMode ? expandCircleUpIconDarkMode : expandCircleUpIcon}/> 
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default HamMenu;