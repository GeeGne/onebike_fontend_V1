// HOOKS
import React, {useState, useRef, useEffect, useReducer} from 'react';
import {useNavigate} from 'react-router-dom';

// COMPONENTS
import HamMenu from './HamMenu';
import DropMenu from './DropMenu';
import CartSlider from './CartSlider';

// REDUCERS
import cartReducer from '/src/reducers/cartReducer.js';

// SCSS
import '/src/styles/components/header/navbar/Navbar.scss';

// ASSETS
import logo from '/assets/img/logo/onebike.webp';
import searchIcon from '/assets/img/icons/search.svg';
import searchIconDarkMode from '/assets/img/icons/search_darkMode.svg';


function Navbar ({darkMode, lan, onCartChange}) {
  
  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [cartToggle, setCartToggle] = useState(false);
  const [cart ,setCart] = useState([]);
  
  const navDropMenuEL = useRef(null);
  const prevScrollY = useRef(0);
  const prevScrollYTimer = useRef(null);
  const searchEL = useRef(null);
  const searchInputEL = useRef(null);
  const searchButtonEL = useRef(null);

  const menuData = setMenu;
  const cartToggleData = setCartToggle;
  const cartData = (data) => {
    setCart(data);
    onCartChange(data);
  }

  const cartEmpty = cart.length === 0;
  const largeWidth = 1000;
  const webWidth = window.innerWidth;
  const desktopWidth = webWidth >= largeWidth;

  useEffect(() => {
    const handleResize = (menu) => {
      const largeWidth = 1000;
      const webWidth = window.innerWidth;
      const desktopWidth = webWidth >= largeWidth;

      switch (desktopWidth) {
        case true:
          searchEL.current.classList.add('hover');
          searchButtonEL.current.classList.add('hover');
          document.body.style.overflow = 'hidden auto';
          break;
        case false: 
          searchEL.current.classList.remove('hover');
          searchButtonEL.current.classList.remove('hover');
          document.body.style.overflow = menu ? 'hidden' : 'hidden auto';
          break;
      }
    }
    handleResize(menu);
    window.addEventListener('resize', () => handleResize(menu));
    return () => window.removeEventListener('resize', handleResize);
  }, [menu]);

  useEffect(() => {
    document.body.style.overflow = menu & !desktopWidth ? 'hidden' : 'hidden auto';
  }, [menu])

  useEffect(() => {
    const stylenavDropMenuELWhenScrolling = () => {
      const hideNav = (el, height) => el.style.transform = `translateY(-${height}px)`;
      const showNav = el => el.style.transform = `translateY(0)`;

      const navDropMenuELHeight = navDropMenuEL.current.scrollHeight;
      const currentScrollY = window.scrollY;
      const activateHeight = currentScrollY >= 400;
      clearTimeout(prevScrollYTimer.current);

      prevScrollYTimer.current = setTimeout(() => (prevScrollY.current = currentScrollY), 100);
      const scrollingUp = prevScrollY.current > currentScrollY;
      const scrollingDown = currentScrollY > prevScrollY.current + 50;

      switch (true) {
        case (activateHeight && scrollingDown):
          hideNav(navDropMenuEL.current, navDropMenuELHeight + 50);
          break;
        case (activateHeight && scrollingUp):
          showNav(navDropMenuEL.current);
          break;
        default:
          showNav(navDropMenuEL.current);
      }
    }
    window.addEventListener('scroll', stylenavDropMenuELWhenScrolling);
    return () => window.removeEventListener('scroll', stylenavDropMenuELWhenScrolling);
  }, [])

  const path = el => el.dataset.path;

  const handleClick = type => {
    if (!desktopWidth && type === 'search') {
      searchEL.current.classList.toggle('clicked');
      searchButtonEL.current.classList.toggle('clicked');
      return;
    }
    navigate(path(type.target));
    scroll({top: 0, behavior: 'smooth'});
  }

  const handleHover = type => {
    const isInputInFocus = document.activeElement === searchInputEL.current

    if (desktopWidth || isInputInFocus) {
      searchEL.current.classList.add('hover');
      searchButtonEL.current.classList.add('hover');
      return;
    }
    type ? searchEL.current.classList.add('hover') : searchEL.current.classList.remove('hover');
    type ? searchButtonEL.current.classList.add('hover') : searchButtonEL.current.classList.remove('hover'); 
  }

  return (
    <>
    <div className="dropMenu" ref={navDropMenuEL}>
      <nav className="dropMenu__nav">
        <button className={`dropMenu__nav__hamburger${menu ? ' clicked' : ''}`} onClick={() => setMenu(oldMenu => !oldMenu)}/>
        <img className="dropMenu__nav__logo" data-path="/" onClick={handleClick} src={logo}/>
        <div className="dropMenu__nav__search-input" onMouseEnter={() => handleHover(true)}  onMouseLeave={() => handleHover(false)} ref={searchEL}>
          <input placeholder={lan === 'en' ? 'Type something' : 'هل تبحث عن شيء؟'} onBlur={() => handleHover(false)} ref={searchInputEL}/>
          <img src={darkMode ? searchIconDarkMode : searchIcon}/>
        </div>
        <button className="dropMenu__nav__search" onClick={() => handleClick('search')} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} ref={searchButtonEL}/>
        <button className="dropMenu__nav__user" data-path="/account/login" onClick={handleClick}/>
        <button className="dropMenu__nav__favourite"/>
        <button className={`dropMenu__nav__shoppingCart${cartEmpty ? ' empty' : ''}`} onClick={() => setCartToggle(true)}/>
      </nav>
      <DropMenu menu={menu} darkMode={darkMode} lan={lan}/>
    </div>
      <HamMenu menu={menu} onMenuChange={menuData} darkMode={darkMode} lan={lan}/>
      <CartSlider darkMode={darkMode} lan={lan} onCartChange={cartData} cartToggle={cartToggle} onCartToggleChange={cartToggleData} />
      {/* <Outlet/> */}
    </>
  )
}

export default Navbar;