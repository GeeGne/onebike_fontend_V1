// HOOKS
import React, {useState, useEffect, useRef} from 'react';

// SCSS
import '/src/styles/components/header/navbar/WishlistSlider.scss';

// STORE
import {useWishlistStore} from '/src/store/store';

// ASSETS
import img from '/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg';
import doubleArrowPrimary from '/assets/img/icons/keyboard_double_arrow_right_primary.svg';
import heart from '/assets/img/icons/heart.svg';
import deleteIcon from '/assets/img/icons/delete.svg';

// ASSETS - DARKMODE
import doubleArrowSecondary from '/assets/img/icons/keyboard_double_arrow_right_secondary.svg';
import heartDarkMode from '/assets/img/icons/heart_darkMode.svg';
import deleteDarkModeIcon from '/assets/img/icons/delete_darkMode.svg';

function WishlistSlider ({darkMode, lan, onWishlistToggleChange}) {
  const {wishlist, wishlistToggle, setWishlistToggle} = useWishlistStore();
  const containerEL = useRef(null);  
  const sliderEL = useRef(null);
  const isWishlistEmpty = wishlist.length === 0;

  useEffect(() => {
    const containerStyle = containerEL.current.style;
    const sliderStyle = sliderEL.current.style;

    switch (wishlistToggle) {
      case true:
        document.body.style.overflow = 'hidden hidden';
        containerStyle.visibility= 'visible';
        containerStyle.backgroundColor= 'var(--cartSlider-background-color)'
        sliderStyle.transform = 'translateY(0)';
        setTimeout(() => sliderStyle.transform = 'translateY(4em)', 250);
        break;
      case false:
        document.body.style.overflow = 'hidden auto';
        sliderStyle.transform = `translateY(100%)`;
        containerStyle.backgroundColor= 'hsla(0, 0%, 0%, 0)';
        setTimeout(() => containerStyle.visibility = 'hidden', 500);
        break;
    }
  }, [wishlistToggle])

  return (
    <div className="wishlist" onClick={() => setWishlistToggle(false)} ref={containerEL}>
      <div className="wishlist__slider" onClick={e => e.stopPropagation()} ref={sliderEL}>
        <button className="wishlist__slider__exit-btn" onClick={() => setWishlistToggle(false)} />
        <ul className="wishlist__slider__list">
          {wishlist.map(product => 
          <li className="wishlist__slider__list__product" key={product.id}>
            <img className="wishlist__slider__list__product__img" src={img} />
            <div className="wishlist__slider__list__product__title">{product.title[lan]}</div>
            <div className="wishlist__slider__list__product__price">S.P 2000</div>
            <img className="wishlist__slider__list__product__delete-img" role="button" tab-index="0" src={darkMode ? deleteDarkModeIcon : deleteIcon} />
          </li>
          )}
          <li className="wishlist__slider__list__product">
            <img className="wishlist__slider__list__product__img" src={img} />
            <div className="wishlist__slider__list__product__title">Portable Air Pump</div>
            <div className="wishlist__slider__list__product__price">S.P 2000</div>
            <img className="wishlist__slider__list__product__delete-img" role="button" tab-index="0" src={darkMode ? deleteDarkModeIcon : deleteIcon} />
          </li>
          <li className="wishlist__slider__list__product">
            <img className="wishlist__slider__list__product__img" src={img} />
            <div className="wishlist__slider__list__product__title">Portable Air Pump</div>
            <div className="wishlist__slider__list__product__price">S.P 2000</div>
            <img className="wishlist__slider__list__product__delete-img" src={darkMode ? deleteDarkModeIcon : deleteIcon} />
          </li>
          <li className="wishlist__slider__list__product">
            <img className="wishlist__slider__list__product__img" src={img} />
            <div className="wishlist__slider__list__product__title">Portable Air Pump</div>
            <div className="wishlist__slider__list__product__price">S.P 2000</div>
            <img className="wishlist__slider__list__product__delete-img" src={darkMode ? deleteDarkModeIcon : deleteIcon} />
          </li>
          <li className="wishlist__slider__list__product">
            <img className="wishlist__slider__list__product__img" src={img} />
            <div className="wishlist__slider__list__product__title">Portable Air Pump</div>
            <div className="wishlist__slider__list__product__price">S.P 2000</div>
            <img className="wishlist__slider__list__product__delete-img" src={darkMode ? deleteDarkModeIcon : deleteIcon} />
          </li>
          <li className="wishlist__slider__list__product">
            <img className="wishlist__slider__list__product__img" src={img} />
            <div className="wishlist__slider__list__product__title">Portable Air Pump</div>
            <div className="wishlist__slider__list__product__price">S.P 2000</div>
            <img className="wishlist__slider__list__product__delete-img" src={darkMode ? deleteDarkModeIcon : deleteIcon} />
          </li>
          <li className="wishlist__slider__list__product">
            <img className="wishlist__slider__list__product__img" src={img} />
            <div className="wishlist__slider__list__product__title">Portable Air Pump</div>
            <div className="wishlist__slider__list__product__price">S.P 2000</div>
            <img className="wishlist__slider__list__product__delete-img" src={darkMode ? deleteDarkModeIcon : deleteIcon} />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default WishlistSlider;