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

function HamMenu () {

  return (
    <nav className="ham-menu-container">
      <div className="ham-menu-container__side-box">
        <section className="ham-menu-container__side-box__menu">
          MENU
          <img src={closeIcon}/>
        </section>
        <ul className="ham-menu-container__side-box__list">
          <li>
            Bikes
            <img className="expand-circle" src={expandCircleUpIcon}/> 
          </li>
          <li>
            <img src=""/>
            Accessories
            <img className="expand-circle" src={expandCircleUpIcon}/> 
          </li>
          <li>
            <img src=""/>
            Parts
            <img className="expand-circle" src={expandCircleUpIcon}/> 
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default HamMenu;