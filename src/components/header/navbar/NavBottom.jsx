// HOOKS
import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

// SCSS
import '/src/styles/components/header/navbar/NavBottom.scss';

function NavBottom () {

  const navigate = useNavigate();
  const navBottomEL = useRef(null);
  const prevScrollY = useRef(0);
  const prevScrollYTimer = useRef(null);

  const path = el => el.dataset.path;

  const handleClick = e => {
    navigate(path(e.target))
    scroll({top: 0, behavior: 'smooth'})
  }


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
      <a className="navBottom__favourite" />
      <a className="navBottom__user" data-path="/account/login" onClick={handleClick}/>
    </section>
  )
}

export default NavBottom;