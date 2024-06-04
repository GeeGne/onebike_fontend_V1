// HOOKS
import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

// COMPONENTS
import HamMenu from './HamMenu';
import DropMenu from './DropMenu';
import CartSlider from './CartSlider';

// SCSS
import '/src/styles/components/header/navbar/Navbar.scss';

// ASSETS
import logo from '/src/assets/img/logo/onebike.webp';
import searchIcon from '/src/assets/img/icons/search.svg';
import searchIconDarkMode from '/src/assets/img/icons/search_darkMode.svg';


function Navbar ({darkMode, lan}) {
  
  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [cart, setCart] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  
  const searchInputElement = useRef(null);
  const searchButtonElement = useRef(null);

  const menuData = setMenu;
  const cartData = setCart;
  const cartProductsData = setCartProducts;

  const cartEmpty = cartProducts.length === 0;
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
          searchInputElement.current.classList.add('hover');
          searchButtonElement.current.classList.add('hover');
          document.body.style.overflow = 'hidden auto';
          break;
        case false: 
          searchInputElement.current.classList.remove('hover');
          searchButtonElement.current.classList.remove('hover');
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

  const handleClick = () => {
    if (!desktopWidth) {
      searchInputElement.current.classList.toggle('clicked');
      searchButtonElement.current.classList.toggle('clicked');
    }
  }

  const handleHover = type => {
    if (desktopWidth) {
      searchInputElement.current.classList.add('hover');
      searchButtonElement.current.classList.add('hover');
      return;
    }
    type ? searchInputElement.current.classList.add('hover') : searchInputElement.current.classList.remove('hover');
    type ? searchButtonElement.current.classList.add('hover') : searchButtonElement.current.classList.remove('hover'); 
  }

  return (
    <>
      <nav className="nav-container">
        <button className={`nav-container__hamburger${menu ? ' clicked' : ''}`} onClick={() => setMenu(oldMenu => !oldMenu)}/>
        <img className="nav-container__logo" onClick={() => navigate('/') } src={logo}/>
        <div className={`nav-container__search-input`} onMouseEnter={() => handleHover(true)}  onMouseLeave={() => handleHover(false)} ref={searchInputElement}>
          <input placeholder={lan === 'en' ? 'Type something' : 'هل تبحث عن شيء؟'} /* ref={searchInputElement} *//>
          <img src={darkMode ? searchIconDarkMode : searchIcon}/>
        </div>
        <button className={`nav-container__search`} onClick={handleClick} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} ref={searchButtonElement}/>
        <button className="nav-container__user"/>
        <button className="nav-container__favourite"/>
        <button className={`nav-container__shoppingCart${cartEmpty ? ' empty' : ''}`} onClick={() => setCart(true)}/>
      </nav>
      <DropMenu menu={menu} darkMode={darkMode} lan={lan}/>
      <HamMenu menu={menu} onMenuChange={menuData} darkMode={darkMode} lan={lan}/>
      <CartSlider darkMode={darkMode} lan={lan} cart={cart} onCartChange={cartData} onCartProductsChange={cartProductsData}/>
      {/* <NavBottom/> */}
      {/* <Outlet/> */}
    </>
  )
}

export default Navbar;