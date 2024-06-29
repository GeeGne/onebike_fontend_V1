// HOOKS
import React, {useState, useEffect, useRef, useContext, useReducer} from 'react';
import {useNavigate} from 'react-router-dom';

// SCSS
import '/src/styles/components/header/navbar/CartSlider.scss';

// REDUCERS
import cartReducer from '/src/reducers/cartReducer';

// UTILS
import {CartProductsContext} from '/src/utils/myContext';
import formatNumberWithCommas from '/src/utils/formatNumberWithCommas';
import calculatePrice from '/src/utils/calculatePrice';
import calculateDiscountPercantage from '/src/utils/calculateDiscountPercantage';
import fetchElementById from '/src/utils/fetchElementById';

// ICONS
import closeIcon from '/assets/img/icons/close.svg';
import cartIcon from '/assets/img/icons/shopping_cart.svg';

// ICONS - DARKMODE
import closeIconDarkMode from '/assets/img/icons/close_darkMode.svg';
import cartIconDarkMode from '/assets/img/icons/shopping_cart_darkMode.svg';

// product img test
import productIMG from '/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg';
import productIMG2 from '/assets/img/products/Giant Bicycle Road full Carbon.avif';
import productIMG3 from '/assets/img/products/RIDE 12 Chili Red Carbon Grey 2023.avif';
import productIMG4 from '/assets/img/products/Seymour Oceanweave 1.3 H2O.avif';
import brandLogo from '/assets/img/logo/trek.webp';
import brandLogo2 from '/assets/img/logo/giant.webp';
import brandLogo3 from '/assets/img/logo/evoc.webp';

function CartSlider ({darkMode, lan, onCartChange, cartToggle, onCartToggleChange}) {
  const cartDispatchData = useContext(CartProductsContext);
  const [cart, dispatch] = useReducer(cartReducer, []);
  const cartContainerElement = useRef(null);  
  const sliderElement = useRef(null);
  const cartProductsELS = useRef([]);
  const navigate = useNavigate();

  let totalPrice = 0;
  cart.forEach(list => (totalPrice += list.quantityPrice))

  const cartEmpty = cart.length === 0;
  const en = lan === 'en';

  useEffect(() => onCartChange(cart), [cart])
  useEffect(() => dispatch(cartDispatchData), [cartDispatchData])

  useEffect(() => {
    const containerStyle = cartContainerElement.current.style;
    const sliderStyle = sliderElement.current.style;
    switch (cartToggle) {
      case true:
        document.body.style.overflow = 'hidden hidden';
        containerStyle.visibility= 'visible';
        containerStyle.backgroundColor= 'var(--cartSlider-background-color)'
        sliderStyle.transform = 'translateX(0)';
        break;
      case false:
        document.body.style.overflow = 'hidden auto';
        sliderStyle.transform = `translateX(${en ? '' : '-'}30em)`;
        containerStyle.backgroundColor= 'hsla(0, 0%, 0%, 0)';
        setTimeout(() => containerStyle.visibility = 'hidden', 500);
        break;
    }
  }, [cartToggle, lan])

  const handleClick = (e, product) => {
    const {type} = e.target.dataset;
    const getElement = (els, id) => els.filter(el => Number(el.dataset.productId) === id)[0];
    const styleProductWhenRemoved = () => getElement(cartProductsELS.current, product.id).style.opacity = '0';

    switch(type) {
      case 'REMOVE_FROM_CART':
        styleProductWhenRemoved();
        setTimeout(() => dispatch({type, product}), 250);
        break;
      case 'INCREASE_AMOUNT_BY_ONE':
        dispatch({type, product, quantity: 1});
        break;
      case 'DECREASE_AMOUNT_BY_ONE':
        dispatch({type, product, quantity: -1});
        break;
      case 'exit-slider':
        onCartToggleChange(false);
        break;
      case 'nav-to-checkouts':
        onCartToggleChange(false);
        navigate('/checkouts/login');
        break;
      default:
        console.log('Unknown type: ' + type)
    }
  }

  const addRef = (type, el, i) => {
    const updateElements = (currentArray, el) => currentArray.length < cart.length ? [...currentArray, el] : currentArray;
    
    switch (type) {
      case 'cartProductsELS':
        i === 0 && (cartProductsELS.current = []);
        cartProductsELS.current = updateElements(cartProductsELS.current, el)
        break;
      default:
        console.log('unknown type:' + type);
    }
  }

  return (
    <div className="cartSlider" data-type="exit-slider" onClick={handleClick} ref={cartContainerElement}>
      <div className={`cartSlider__slider${cartEmpty ? ' empty' : ''}`} onClick={e => e.stopPropagation()} ref={sliderElement}>
        <div className="cartSlider__slider__empty">
          <img className="cartSlider__slider__empty__cart" src={darkMode ? cartIconDarkMode : cartIcon}/>
          <div className="cartSlider__slider__empty__note">{en ? 'Your Cart Is Empty' : 'سله التسوق فارغه'}</div>
          <button className="cartSlider__slider__empty__button" data-type="exit-slider" onClick={handleClick}>{en ? 'Back to shopping' : 'العوده للتسوق'}</button>
        </div>
        <section className="cartSlider__slider__top">
          <div className="cartSlider__slider__top__cart">{en ? 'Cart' : 'السله'}</div>
          <div className="cartSlider__slider__top__quantity">{cart.length}</div>
          <img className="cartSlider__slider__top__exit" data-type="exit-slider" onClick={handleClick} src={darkMode ? closeIconDarkMode : closeIcon} role="button" tabIndex="0"/>
        </section>
        <ul className="cartSlider__slider__products">
          {cart.map((list, i) =>
          <li className="cartSlider__slider__products__product" key={list.id} data-product-id={list.product.id} ref={el => addRef('cartProductsELS', el, i)}>
            <img className="cartSlider__slider__products__product__image" src={`/assets/img/products/${list.product.category}/${list.product.type}/${list.product.id + '-' + list.product.color.en}-front.webp`}/>
            <a className="cartSlider__slider__products__product__title">{list.product.title[lan]}</a>
            <div className="cartSlider__slider__products__product__price">{en ? 'S.P' : 'ل.س'} {formatNumberWithCommas(list.quantityPrice)}</div>
            <div className="cartSlider__slider__products__product__toggles">
              <button className="cartSlider__slider__products__product__toggles__delete" data-type="REMOVE_FROM_CART" onClick={e => handleClick(e, list.product)}/> 
              <button className="cartSlider__slider__products__product__toggles__increment" data-type="INCREASE_AMOUNT_BY_ONE" onClick={e => handleClick(e, list.product)}/>
              <div className="cartSlider__slider__products__product__toggles__value">{list.quantity}</div>
              <button className="cartSlider__slider__products__product__toggles__decrement" data-type="DECREASE_AMOUNT_BY_ONE" onClick={e => handleClick(e, list.product)}/>
            </div>
          </li>
          )}
        </ul>
        <section className="cartSlider__slider__bottom">
          <div className="cartSlider__slider__bottom__total">{en ? 'Total' : 'اجمالي'} <span>{en ? 'S.P' : 'ل.س'} {formatNumberWithCommas(totalPrice)}</span></div>
          <div className="cartSlider__slider__bottom__shipment">{en ? 'Shipment fee calculated at Checkout' : 'تكاليف الشحن ستضاف عند الدفع'}</div>
          <button className="cartSlider__slider__bottom__view-cart">{en ? 'View cart' : 'عرض العربة'}</button>
          <button className="cartSlider__slider__bottom__checkout" data-type="nav-to-checkouts" onClick={handleClick}>{en ? 'Checkout' : 'الدفع'}</button>
        </section>
      </div>
    </div>
  )
}

export default CartSlider;