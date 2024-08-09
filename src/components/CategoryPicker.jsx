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
  const getCategoryImg = category => '/assets/img/categories/' + category.en + '.webp';
  
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
    setTimeout(() => scroll({top: 0, behavior: 'smooth'}), 500);
  }

  return (
    <section className="categoryPicker">
      <ul className="categoryPicker__ul">
        {categories.map(category => 
        <li className="categoryPicker__ul__li --categoryAni" tabIndex="0" role="button" aria-label={`Head to ${category.en} page`} data-category={cleanseString(category.en)} onClick={handleClick} onKeyDown={e => e.key === 'Enter' && handleClick(e)} key={category.id}>
          <img className="categoryPicker__ul__li__img" src={getCategoryImg(category)} alt={category[lan]} fetchpriority="high" />
          <span className="categoryPicker__ul__li__name">{category[lan]}</span>
        </li>      
        )}
      </ul>
    </section>
  )
}

export default CategoryPicker;