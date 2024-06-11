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


function Navbar ({darkMode, lan}) {
  
  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [cartToggle, setCartToggle] = useState(false);
  const [cart,setCart] = useState([]);
  
  const navDropMenuEL = useRef(null);
  const prevScrollY = useRef(0);
  const prevScrollYTimer = useRef(null);
  const searchInputEL = useRef(null);
  const searchButtonEL = useRef(null);

  const menuData = setMenu;
  const cartToggleData = setCartToggle;
  const cartData = setCart;

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
          searchInputEL.current.classList.add('hover');
          searchButtonEL.current.classList.add('hover');
          document.body.style.overflow = 'hidden auto';
          break;
        case false: 
          searchInputEL.current.classList.remove('hover');
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
      searchInputEL.current.classList.toggle('clicked');
      searchButtonEL.current.classList.toggle('clicked');
      return;
    }
    navigate(path(type.target));
    scroll({top: 0, behavior: 'smooth'});
  }

  const handleHover = type => {
    if (desktopWidth) {
      searchInputEL.current.classList.add('hover');
      searchButtonEL.current.classList.add('hover');
      return;
    }
    type ? searchInputEL.current.classList.add('hover') : searchInputEL.current.classList.remove('hover');
    type ? searchButtonEL.current.classList.add('hover') : searchButtonEL.current.classList.remove('hover'); 
  }

  return (
    <>
    <div className="nav-dropMenu-container" ref={navDropMenuEL}>
      <nav className="nav-dropMenu-container__nav-container">
        <button className={`nav-dropMenu-container__nav-container__hamburger${menu ? ' clicked' : ''}`} onClick={() => setMenu(oldMenu => !oldMenu)}/>
        <img className="nav-dropMenu-container__nav-container__logo" data-path="/" onClick={handleClick} src={logo}/>
        <div className={`nav-dropMenu-container__nav-container__search-input`} onMouseEnter={() => handleHover(true)}  onMouseLeave={() => handleHover(false)} ref={searchInputEL}>
          <input placeholder={lan === 'en' ? 'Type something' : 'هل تبحث عن شيء؟'} /* ref={searchInputEL} *//>
          <img src={darkMode ? searchIconDarkMode : searchIcon}/>
        </div>
        <button className={`nav-dropMenu-container__nav-container__search`} onClick={handleClick} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} ref={searchButtonEL}/>
        <button className="nav-dropMenu-container__nav-container__user" data-path="/account/login" onClick={handleClick}/>
        <button className="nav-dropMenu-container__nav-container__favourite"/>
        <button className={`nav-dropMenu-container__nav-container__shoppingCart${cartEmpty ? ' empty' : ''}`} onClick={() => setCartToggle(true)}/>
      </nav>
      <DropMenu menu={menu} darkMode={darkMode} lan={lan}/>
    </div>
      <HamMenu menu={menu} onMenuChange={menuData} darkMode={darkMode} lan={lan}/>
      <CartSlider darkMode={darkMode} lan={lan} onCartChange={cartData} cartToggle={cartToggle} onCartToggleChange={cartToggleData} /* onCartProductsChange={cartProductsData} */ />
      {/* <NavBottom/> */}
      {/* <Outlet/> */}
    </>
  )
}

export default Navbar;