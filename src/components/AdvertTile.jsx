// HOOKS
import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

// SCSS
import '/src/styles/components/AdvertTile.scss';

// DATA
import products from '/src/data/products.json';

// UTILS
import calculateDiscountPercantage from '/src/utils/calculateDiscountPercantage';
import formatNumberWithCommas from '/src/utils/formatNumberWithCommas';
import calculatePrice from '/src/utils/calculatePrice';

// ASSETS
import img from '/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg';
import doubleArrowPrimary from '/assets/img/icons/keyboard_double_arrow_right_primary.svg';
import heart from '/assets/img/icons/heart.svg';

// ASSETS - DARKMODE
import doubleArrowSecondary from '/assets/img/icons/keyboard_double_arrow_right_secondary.svg';
import heartDarkMode from '/assets/img/icons/heart_darkMode.svg';

function AdvertTile ({darkMode, lan, type}) {
  
  const listEL = useRef(null);
  const productConEL = useRef(null);
  const observerRef = useRef(null);

  const navigate = useNavigate();  
  const en = lan === "en";
  const nowStyle = {color: "var(--primary-color)"}

  useEffect(() => {
    // const elements = en ? document.querySelectorAll('.--slide-to-left') : document.querySelectorAll('.--slide-to-right');
    const elements = document.querySelectorAll('.--slide-to-left');
    
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observerRef.current.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    
    elements.forEach(el => {
      el.style.animationPlayState = 'paused';
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [/* lan */]);

  const handleCategoryType = product => {
    const {categoryType, name} = type;
    
    switch (categoryType) {
      case 'type':
      case 'category':
        return product.hide ? false : product[categoryType] === name.en;
      case 'discount':
        return product.hide ? false : product[categoryType] !== false;
      default:
        console.error('Error: unknown categoryType', categoryType);
    }
  }

  const getProducts = products.filter(handleCategoryType);

  const handleClick = e => {
    const {categoryType, name} = type;
    const {action} = e.currentTarget.dataset;
    const productConWidth = productConEL.current.offsetWidth;
    const fontSize = window.getComputedStyle(productConEL.current, null).getPropertyValue('font-size');
    const gapLength = parseFloat(fontSize);

    const getURL = () => {
      switch (categoryType) {
        case 'type':
          const getCategory = () => products.filter(product => product.type === name.en);
          return '/' + getCategory()[0].category + '/' + name.en;
        case 'category':
        case 'discount':
          return '/' + name.en;
        default:
          console.error('Error: unknown categoryType', categoryType);
      }
    }
    switch (action) {
      case 'navigate_to_url':
        navigate(getURL());
        setTimeout(() => scroll({top: 0, behavior: 'smooth'}), 500);
        break;
      case 'scroll_left':
        listEL.current.scrollBy({left: -(productConWidth + gapLength), behavior: "smooth"});
        break;
      case 'scroll_right':
        listEL.current.scrollBy({left: productConWidth + gapLength, behavior: "smooth"});
        break;
    }
  }

  return (
    <section className="advertTile">
      <div className="advertTile__panel">
        <h2 className="advertTile__panel__title --colorChange-view">{type.name[lan].toUpperCase()}</h2>
        <span className="advertTile__panel__see-more --colorChange-view" data-action="navigate_to_url" onClick={handleClick}>{en ? 'See More' : 'شاهد المزيد'}</span>
        <img className="advertTile__panel__doubleArrow" src={darkMode ? doubleArrowSecondary : doubleArrowPrimary} onClick={handleClick}/>
      </div>
      <div className="advertTile__list">
        <button className="advertTile__list__left-arr-btn" data-action="scroll_left" onClick={handleClick}></button>
        <button className="advertTile__list__right-arr-btn" data-action="scroll_right" onClick={handleClick}></button>
        <ul className="advertTile__list__products" ref={listEL}>
          {getProducts.map(product => 
          <li className="advertTile__list__products__product --slide-to-left" key={product.id} ref={productConEL}>
            <img className="advertTile__list__products__product__heart-img" src={darkMode ? heartDarkMode : heart} />
            <img className="advertTile__list__products__product__img" src={`/assets/img/products/${product.category}/${product.type}/${product.id + '-' + product.color.en}-front.webp`} />
            {product.discount && <div className="advertTile__list__products__product__discount">{lan === 'ar' ? 'خصم ' : ''}{calculateDiscountPercantage(product.price, product.discount)}{en ? ' off' : ''}</div>}
            <h3 className="advertTile__list__products__product__description">{product.title[lan]}</h3>
            <div className="advertTile__list__products__product__price">
              {product.discount ? <>
              <span className="now" style={nowStyle}>{en ? 'NOW' : 'الان'}</span> 
              <span className="total">{formatNumberWithCommas(calculatePrice(product.price, product.discount))}</span>
              <span className="currency-symbol">{en ? 'S.P ' : 'ل.س'}</span>
              <s className='old'>{formatNumberWithCommas(product.price)}</s></> 
              : <><span className="total">{formatNumberWithCommas(product.price)}</span> 
              <span className="currency-symbol">{en ? 'S.P' : 'ل.س'}</span>
              </>}
            </div>
            <button className="advertTile__list__products__product__add-btn">{en ? 'Add to cart' : 'اضف الى السله'}</button>
          </li>      
          )}
        </ul>
      </div>
    </section>
  )
}

export default AdvertTile;