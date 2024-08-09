// HOOKS
import React, {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

// COMPONENTS
import Alert from '/src/components/Alert';
import BreadCrumb from '/src/components/BreadCrumb';

// SCSS
import '/src/styles/components/pages/Cart.scss';

// STORES
import {useCartStore, useOrderStore} from '/src/store/store';

// DATA
import products from '/src/data/products.json';

// UTILS
import formatNumberWithCommas from '/src/utils/formatNumberWithCommas';

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

function Cart ({darkMode, lan}) {

  const {
    cart, 
    toggle: cartToggle, 
    setToggle: setCartToggle, 
    addProductToCart, 
    removeProductFromCart
  } = useCartStore();
  const setHeadToCheckouts = useOrderStore(state => state.setHeadToCheckouts);

  const cartProductsELS = useRef([]);
  const observerRef = useRef([]);

  const navigate = useNavigate();
  const isCartEmpty = cart.length === 0;
  const en = lan === 'en';

  let totalPrice = 0;
  cart.forEach(list => (totalPrice += list.quantityPrice));
  const getProductImgURL = product => `/assets/img/products/${product.category}/${product.type}/${product.id + '-' + product.color.en}-front.webp`;
  const getProduct = id => products.filter(product => product.id === id)[0];

  useEffect(() => {
    const elements = document.querySelectorAll('.--pop-in');
    
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
  }, []);

  const handleClick = e => {
    const {type, productId} = e.currentTarget.dataset;
    const getElement = (els, id) => els.filter(el => Number(el.dataset.productId) === id)[0];
    const styleProductWhenRemoved = productId => getElement(cartProductsELS.current, productId).style.opacity = '0';

    switch(type) {
      case 'remove_from_cart':
        styleProductWhenRemoved(Number(productId));
        setTimeout(() => removeProductFromCart(getProduct(Number(productId))), 250);
        break;
      case 'increase_amount_by_one':
        addProductToCart(getProduct(Number(productId)), 1);
        break;
      case 'decrease_amount_by_one':
        addProductToCart(getProduct(Number(productId)), -1);
        break;
      case 'exit_slider':
        setCartToggle(false);
        break;
      case 'nav_to_checkouts':
        setTimeout(() => window.scroll({top: 0, behavior: 'smooth'}), 500);
        setHeadToCheckouts(true);
        navigate('/account/login');
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
        console.log('Error: Unknown type:' + type);
    }
  }

  return (
    <div className="cart">
      <section className="cart__breadCrumb-sec">
        <BreadCrumb category={{en :'cart', ar: 'السله'}} type={false} lan={lan}/>
      </section>
      <section className="cart__yourCart-sec">
        <h1 className="cart__yourCart-sec__h1">{en ? 'Your Cart' : 'سله التسوق'}</h1>
      </section>
      {isCartEmpty 
      ? <section className="cart__empty-sec --pop-in unpause">
        <h2 className="cart__empty-sec__h2">{en ? 'Your Cart is empty' : 'سله التسوق فارغه'}</h2>
      </section>
      : <><section className="cart__products-sec">
        <div className="cart__products-sec__header-row">
          <span className="cart__products-sec__header-row__label">{en ? 'Products' : 'المنتجات'}</span>
          <span className="cart__products-sec__header-row__label">{en ? 'Quantity' : 'الكميه'}</span>
          <span className="cart__products-sec__header-row__label">{en ? 'Total' : 'المجموع'}</span>
        </div>
        <ul className="cart__products-sec__products">
          {cart.map((list, i) => 
          <li className="cart__products-sec__products__product --pop-in" key={list.id} data-product-id={list.product.id} ref={el => addRef('cartProductsELS', el, i)}>
            <img className="cart__products-sec__products__product__img" src={getProductImgURL(list.product)} alt={list.product.title[lan]} loading={i <= 3 ? "eager" : "lazy"} fetchpriority={i <= 3 ? "high" : ""} />
            <div className="cart__products-sec__products__product__title">{list.product.title[lan]}</div>
            <div className="cart__products-sec__products__product__total">{en ? 'S.P' : 'ل.س'} {formatNumberWithCommas(list.quantityPrice)}</div>
            <div className="cart__products-sec__products__product__toggles">
              <button className="cart__products-sec__products__product__toggles__increment" data-type="increase_amount_by_one" data-product-id={list.id} onClick={handleClick}/>
              <div className="cart__products-sec__products__product__toggles__value">{list.quantity}</div>
              <button className="cart__products-sec__products__product__toggles__decrement" data-type="decrease_amount_by_one" data-product-id={list.id} onClick={handleClick}/>
              <button className="cart__products-sec__products__product__toggles__delete" data-type="remove_from_cart" data-product-id={list.id} onClick={handleClick} /> 
            </div>
          </li>
          )}
        </ul>
      </section>
      <section className="cart__checkout-sec"> 
        <div className="cart__checkout-sec__total-cont">
          <span className="cart__checkout-sec__total-cont__span">{en ? 'Total' : 'المجموع'}</span>
          <span className="cart__checkout-sec__total-cont__span">{(en ? 'S.P ' : 'ل.س ') + formatNumberWithCommas(totalPrice)}</span>
        </div>
        <span className="cart__checkout-sec__message">{en ? 'Shipment fee calculated at Checkout' : 'تكاليف الشحن ستضاف عند الدفع'}</span>
        <button className="cart__checkout-sec__checkout-btn" data-type="nav_to_checkouts" onClick={handleClick}>{en ? 'Checkout' : 'الدفع'}</button>
      </section></>
      }
    </div>
  )
}

export default Cart;