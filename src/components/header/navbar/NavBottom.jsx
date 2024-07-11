// HOOKS
import React, {useState, useRef, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';

// STORE
import {useWishlistStore} from '/src/store/store';

// UTILS
import {WishlistToggleContext} from '/src/utils/myContext';

// SCSS
import '/src/styles/components/header/navbar/NavBottom.scss';

function NavBottom ({darkMode, lan}) {
  const {wishlist, setToggle} = useWishlistStore();
  const navigate = useNavigate();
  const navBottomEL = useRef(null);
  const favouriteBtnEL = useRef(null);
  const prevScrollY = useRef(0);
  const prevScrollYTimer = useRef(null);
  const isWishlistEmpty = wishlist.length === 0;

  const handleClick = e => {
    const {action, path} = e.currentTarget.dataset;

    switch (action) {
      case 'navigate_to_path':
        navigate(path);
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
      <a className={`navBottom__favourite${isWishlistEmpty ? ' empty' : ''}`} data-action="toggle_wishlist_to_true" onClick={handleClick} ref={favouriteBtnEL} />
      <a className="navBottom__user" data-action="navigate_to_path" data-path="/account/login" onClick={handleClick}/>
    </section>
  )
}

export default NavBottom;