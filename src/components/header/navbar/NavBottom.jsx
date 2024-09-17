// HOOKS
import React, {useState, useRef, useEffect, useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';

// COMPONENTS
import DisplayWebImg from '/src/components/DisplayWebImg';
import DisplayImg from '/src/components/DisplayImg';

// STORE
import { useWishlistStore, useDataStore } from '/src/store/store';

// UTILS
import {WishlistToggleContext} from '/src/utils/myContext';

// SCSS
import '/src/styles/components/header/navbar/NavBottom.scss';

// ASSETS
import userIcon from '/assets/img/icons/user.svg';
import userIconDarkMode from '/assets/img/icons/user_darkMode.svg';

function NavBottom ({darkMode, lan}) {
  const user = useDataStore(state => state.user);
  const userData = useDataStore(state => state.userData);
  const {wishlist, setToggle} = useWishlistStore();
  const navigate = useNavigate();

  const navBottomEL = useRef(null);
  const favouriteBtnEL = useRef(null);
  const prevScrollY = useRef(0);
  const prevScrollYTimer = useRef(null);

  const isWishlistEmpty = wishlist.length === 0;
  const getUserImgURL = () => `/assets/img/userpfp/${user?.uid}/main.webp`;

  const handleClick = e => {
    const { action } = e.currentTarget.dataset;

    switch (action) {
      case 'navigate_to_path':
        setTimeout(() => scroll({top: 0, behavior: 'smooth'}), 500);
        break;
      case 'toggle_wishlist_to_true':
        setToggle(true);
        break;
      default:
        console.error('Error: Unknown action: ', action);
    }

  }

  useEffect(() => {favouriteBtnEL.current.style.backgroundImage = isWishlistEmpty ? 'var(--heart-icon)' : 'var(--heart-fill-default-icon)'}, [wishlist])
  useEffect(() => {
    const stylenavBottomELWhenScrolling = () => {
      const hideNav = (el, height) => el.style.transform = `translateY(${height}px)`;
      const showNav = el => el.style.transform = `translateY(0)`;

      const navBottomELHeight = navBottomEL.current.scrollHeight;
      const currentScrollY = window.scrollY;
      const windowHeight = document.body.scrollHeight;
      const viewportHeight = window.innerHeight;
      const activateHeight = currentScrollY <= (windowHeight - ( viewportHeight + navBottomELHeight + 10));
      clearTimeout(prevScrollYTimer.current);

      prevScrollYTimer.current = setTimeout(() => (prevScrollY.current = currentScrollY), 100);
      const scrollingUp = prevScrollY.current > currentScrollY;
      const scrollingDown = currentScrollY > prevScrollY.current + 50;

      switch (true) {
        case (activateHeight && scrollingDown):
          hideNav(navBottomEL.current, navBottomELHeight + 50);
          break;
        case (activateHeight && scrollingUp):
          showNav(navBottomEL.current);
          break;
        default:
          showNav(navBottomEL.current);
      }
    }
    window.addEventListener('scroll', stylenavBottomELWhenScrolling);
    return () => window.removeEventListener('scroll', stylenavBottomELWhenScrolling);
  }, [])

  return (
    <section className="navBottom" ref={navBottomEL}>
      <button className={`navBottom__favourite${isWishlistEmpty ? ' empty' : ''}`} aria-label="Toggle Wishlst" data-action="toggle_wishlist_to_true" onClick={handleClick} ref={favouriteBtnEL} />
      <Link className="navBottom__user" to={user ? "/account" : "/account/login"} aria-label="Navigate to Your Account" data-action="navigate_to_path" onClick={handleClick}>
        <DisplayWebImg className="navBottom__user__img" src={getUserImgURL()} backup={darkMode ? userIconDarkMode : userIcon} refresh={userData} />
      </Link> 
    </section>
  )
}

export default NavBottom;