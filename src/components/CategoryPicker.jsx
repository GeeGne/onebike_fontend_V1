// HOOKS
import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

// DATA
import categories from '/src/data/menu.json';

// SCSS
import '/src/styles/components/CategoryPicker.scss';

// UTIL
import cleanseString from '/src/utils/cleanseString';

function CategoryPicker ({darkMode, lan}) {

  const navigate = useNavigate();
  const observerRef = useRef(null);

  useEffect(() => {
    const elements = document.querySelectorAll('.--categoryAni');
    
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observerRef.current.unobserve(entry.target);
        }
      });
    }, { threshold: 1 });
    
    elements.forEach(el => {
      el.style.animationPlayState = 'paused';
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const  handleClick = e => {
    const {category} = e.currentTarget.dataset;
    navigate(category);
    scroll({top: 0, behavior: 'smooth'});
  }

  return (
    <section className="categoryPicker">
      <ul className="categoryPicker__ul">
        {categories.map(category => 
        <li className="categoryPicker__ul__li --categoryAni" data-category={cleanseString(category.en)} onClick={handleClick} key={category.id}>
          <img className="categoryPicker__ul__li__img" src={'/assets/img/categories/' + category.en + '.webp'}/>
          <span className="categoryPicker__ul__li__name">{category[lan]}</span>
        </li>      
        )}
      </ul>
    </section>
  )
}

export default CategoryPicker;