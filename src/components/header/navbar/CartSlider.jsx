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

// product img test
import productIMG from '/src/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg';
import productIMG2 from '/src/assets/img/products/Giant Bicycle Road full Carbon.avif';
import productIMG3 from '/src/assets/img/products/RIDE 12 Chili Red Carbon Grey 2023.avif';
import productIMG4 from '/src/assets/img/products/Seymour Oceanweave 1.3 H2O.avif';
import brandLogo from '/src/assets/img/logo/trek.webp';
import brandLogo2 from '/src/assets/img/logo/giant.webp';
import brandLogo3 from '/src/assets/img/logo/evoc.webp';

function CartSlider ({darkMode, lan, cart, onCartChange}) {
  const cartContainerElement = useRef(null);  
  const sliderElement = useRef(null);

  useEffect(() => {
    const containerStyle = cartContainerElement.current.style;
    const sliderStyle = sliderElement.current.style;
    switch (cart) {
      case true:
        document.body.style.overflow = 'hidden hidden';
        containerStyle.visibility= 'visible';
        containerStyle.backgroundColor= 'var(--cartSlider-background-color)'
        sliderStyle.transform = 'translateX(0)';
        break;
      case false:
        document.body.style.overflow = 'hidden auto';
        sliderStyle.transform = `translateX(${lan === 'en' ? '' : '-'}30em)`;
        containerStyle.backgroundColor= 'hsla(0, 0%, 0%, 0)';
        setTimeout(() => containerStyle.visibility = 'hidden', 500);
        break;
    }
  }, [cart, lan])

  return (
    <div className="cartSlider-container" onClick={() => onCartChange(false)} ref={cartContainerElement}>
      <div className="cartSlider-container__slider" onClick={e => e.stopPropagation()} ref={sliderElement}>
        <section className="cartSlider-container__slider__top">
          <div className="cartSlider-container__slider__top__cart">{lan === 'en' ? 'Cart' : 'السله'}</div>
          <div className="cartSlider-container__slider__top__quantity">3</div>
          <img className="cartSlider-container__slider__top__exit" onClick={() => onCartChange(false)} src={darkMode ? closeIconDarkMode : closeIcon} role="button" tabIndex="0"/>
        </section>
        <ul className="cartSlider-container__slider__products">
          <li className="cartSlider-container__slider__products__product">
            <img className="cartSlider-container__slider__products__product__image" src={productIMG}/>
            <a className="cartSlider-container__slider__products__product__title">Hand size Air Pump That is very VERYY good I don't know whta's better but YOU should try it.</a>
            <div className="cartSlider-container__slider__products__product__price">$ 20</div>
            <div className="cartSlider-container__slider__products__product__toggles">
            <button className="cartSlider-container__slider__products__product__toggles__delete"></button>
              <button className="cartSlider-container__slider__products__product__toggles__increment"></button>
              <div className="cartSlider-container__slider__products__product__toggles__value">1</div>
              <button className="cartSlider-container__slider__products__product__toggles__decrement"></button>
            </div>
          </li>
          <li className="cartSlider-container__slider__products__product">
            <img className="cartSlider-container__slider__products__product__image" src={productIMG}/>
            <a className="cartSlider-container__slider__products__product__title">Hand size Air Pump</a>
            <div className="cartSlider-container__slider__products__product__price">$ 20</div>
            <div className="cartSlider-container__slider__products__product__toggles">
              <button className="cartSlider-container__slider__products__product__toggles__delete"></button>
              <button className="cartSlider-container__slider__products__product__toggles__increment"></button>
              <div className="cartSlider-container__slider__products__product__toggles__value">1</div>
              <button className="cartSlider-container__slider__products__product__toggles__decrement"></button>
            </div>
          </li>
          <li className="cartSlider-container__slider__products__product">
            <img className="cartSlider-container__slider__products__product__image" src={productIMG}/>
            <a className="cartSlider-container__slider__products__product__title">Hand size Air Pump</a>
            <div className="cartSlider-container__slider__products__product__price">$ 20</div>
            <div className="cartSlider-container__slider__products__product__toggles">
              <button className="cartSlider-container__slider__products__product__toggles__delete"></button>
              <button className="cartSlider-container__slider__products__product__toggles__increment"></button>
              <div className="cartSlider-container__slider__products__product__toggles__value">1</div>
              <button className="cartSlider-container__slider__products__product__toggles__decrement"></button>
            </div>
          </li>
        </ul>
        <section className="cartSlider-container__slider__total"></section>
        {/* <section className="cartSlider-container__slider__"></section>
        <section className="cartSlider-container__slider__"></section> */}
      </div>
    </div>
  )
}

export default CartSlider;