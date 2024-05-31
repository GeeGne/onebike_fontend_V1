// HOOKS
import React, {useState, useEffect, useRef} from 'react';

// SCSS
import '/src/styles/components/header/navbar/CartSlider.scss';

// ICONS
import expandCircleUpIcon from '../../../assets/img/icons/expand_circle_down.svg';
import closeIcon from '../../../assets/img/icons/close.svg';

// ICONS - DARKMODE
import expandCircleUpIconDarkMode from '../../../assets/img/icons/expand_circle_down_darkMode.svg';
import closeIconDarkMode from '../../../assets/img/icons/close_darkMode.svg';

function CartSlider () {

  return (
    <div className="cartSlider-container">
      <div className="cartSlider-container__slider">
        <section className="cartSlider-container__slider__top">
          <h1 className="cartSlider-container__slider__top__cart">Cart</h1>
          <div className="cartSlider-container__slider__top__quanitity">3</div>
          <img className="cartSlider-container__slider__top__exit" src={closeIcon}/>
        </section>
        <section className="cartSlider-container__slider__products"></section>
        <section className="cartSlider-container__slider__total"></section>
        {/* <section className="cartSlider-container__slider__"></section>
        <section className="cartSlider-container__slider__"></section> */}
      </div>
    </div>
  )
}

export default CartSlider;