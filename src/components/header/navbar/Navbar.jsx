// HOOKS
import React, {useState, useRef, useEffect, Suspense} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

// COMPONENTS
const HamMenu = React.lazy(() => import('./HamMenu'));
const DropMenu = React.lazy(() => import('./DropMenu'));
const CartSlider = React.lazy(() => import('./CartSlider'));
const WishlistSlider = React.lazy(() => import('./WishlistSlider'));
import DisplayImg from '/src/components/DisplayImg';

// REDUCERS
import cartReducer from '/src/reducers/cartReducer.js';

// STORE
import {useWishlistStore, useCartStore, useDataStore} from '/src/store/store';

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
  const [searchParams, setSearchParams] = useSearchParams();
  // const [cartToggle, setCartToggle] = useState(false);
  const {cart, toggle: cartToggle, setToggle: setCartToggle} = useCartStore();
  const {wishlist, setToggle: setWishlistToggle} = useWishlistStore();
  const { user } = useDataStore();

  const navDropMenuEL = useRef(null);
  const prevScrollY = useRef(0);
  const prevScrollYTimer = useRef(null);
  const searchEL = useRef(null);
  const searchInputEL = useRef(null);
  const searchBtnEL = useRef(null);
  const favouriteBtnEL = useRef(null);
  const cartBtnEL = useRef(null);

  const menuData = setMenu;

  const isCartEmpty = cart.length === 0;
  const isWishlistEmpty = wishlist.length === 0;
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
          searchBtnEL.current.classList.add('hover');
          document.body.style.overflow = 'hidden auto';
          break;
        case false: 
          searchEL.current.classList.remove('hover');
          searchBtnEL.current.classList.remove('hover');
          document.body.style.overflow = menu ? 'hidden' : 'hidden auto';
          break;
        default:
          console.error('Error: Unknown type:', desktopWidth)
      }
    }
    handleResize(menu);
    window.addEventListener('resize', () => handleResize(menu));
    return () => window.removeEventListener('resize', handleResize);
  }, [menu]);

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

  useEffect(() => {cartBtnEL.current.style.backgroundImage = isCartEmpty ? 'var(--shoppingCart-icon)' : 'var(--shoppingCart-fill-icon)'}, [cart])
  useEffect(() => {favouriteBtnEL.current.style.backgroundImage = isWishlistEmpty ? 'var(--heart-icon)' : 'var(--heart-fill-default-icon)'}, [wishlist])

  const handleClick = e => {
    const {action, path} = e.currentTarget.dataset;

    switch (action) {
      case 'toggle_search':
        if (!desktopWidth) {
          searchEL.current.classList.toggle('clicked');
          searchBtnEL.current.classList.toggle('clicked');

          const isSearchToggled = searchEL.current.classList.contains('clicked');
          if (!isSearchToggled) {
            searchInputEL.current.blur();
            searchInputEL.current.value = '';
            setSearchParams('');
          } else {
            searchInputEL.current.focus();
          }
        }
        break;
      case 'toggle_wishlist_to_true':
        return setWishlistToggle(true);
      case 'navigate_to_path':
        navigate(path);
        setTimeout(() => scroll({top: 0, behavior: 'smooth'}), 500);
        break;
      default:
        console.error('Error: Unknown action: ' + action);
    }
  }

  const handleHover = type => {
    const isInputInFocus = document.activeElement === searchInputEL.current

    if (desktopWidth || isInputInFocus) {
      searchEL.current.classList.add('hover');
      searchBtnEL.current.classList.add('hover');
      return;
    }
    type ? searchEL.current.classList.add('hover') : searchEL.current.classList.remove('hover');
    type ? searchBtnEL.current.classList.add('hover') : searchBtnEL.current.classList.remove('hover'); 
  }

  const handleChange = e => {
    const searchValue = e.currentTarget.value;
    setSearchParams({search: searchValue})
  }

  return (
    <>
    <div className="dropMenu --fade-in animate--05s delay--03s iteration--1" ref={navDropMenuEL}>
      <nav className="dropMenu__nav">
        <button className={`dropMenu__nav__hamburger${menu ? ' clicked' : ''}`} aria-label="Toggle Drop Menu" onClick={() => setMenu(oldMenu => !oldMenu)}/>
         <button className="dropMenu__nav__logo-btn" aria-label="Home Icon" data-action="navigate_to_path" data-path="/" onClick={handleClick}>
          <DisplayImg className="dropMenu__nav__logo-btn__img" alt="ONEBIKE Logo" fetchpriority="high" onClick={handleClick} src={logo}/>
        </button> 
        <div className="dropMenu__nav__search-input" ref={searchEL}>
          <input placeholder={lan === 'en' ? 'Type something' : 'هل تبحث عن شيء؟'} onBlur={() => handleHover(false)} onChange={handleChange} ref={searchInputEL}/>
          <DisplayImg src={darkMode ? searchIconDarkMode : searchIcon} alt="Search Icon"/>
        </div>
        <button className="dropMenu__nav__search" aria-label="Search on a product" data-action="toggle_search" onClick={handleClick} /* onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} */ ref={searchBtnEL}/>
        <button className="dropMenu__nav__user" aria-label="head to your account" data-action="navigate_to_path" data-path={user ? "/account" : "/account/login"} onClick={handleClick}/>
        <button className={`dropMenu__nav__favourite${isWishlistEmpty ? ' empty' : ''}`} aria-label="Open favorite tab" data-action="toggle_wishlist_to_true" onClick={handleClick} ref={favouriteBtnEL}/>
        <button className={`dropMenu__nav__shoppingCart${isCartEmpty ? ' empty' : ''}`} aria-label="Open shoppingcart tab" onClick={() => setCartToggle(true)} ref={cartBtnEL}/>
      </nav>
      <Suspense fallback="">
        <DropMenu menu={menu} darkMode={darkMode} lan={lan}/>
      </Suspense>
    </div>

    <Suspense fallback="">
      <HamMenu menu={menu} onMenuChange={menuData} darkMode={darkMode} lan={lan}/>
      <CartSlider darkMode={darkMode} lan={lan} />
      <WishlistSlider darkMode={darkMode} lan={lan} />
    </Suspense>

      {/* <Outlet/> */}
    </>
  )
}

export default Navbar;