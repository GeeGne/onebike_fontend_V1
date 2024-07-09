// HOOKS
import React, {useState, useEffect, useRef} from 'react';

// SCSS
import '/src/styles/components/header/navbar/WishlistSlider.scss';

// STORE
import {useWishlistStore} from '/src/store/store';

// UTILS
import formatNumberWithCommas from '/src/utils/formatNumberWithCommas';
import calculatePrice from '/src/utils/formatNumberWithCommas';

// DATA
import products from '/src/data/products.json';

// ASSETS
import img from '/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg';
import doubleArrowPrimary from '/assets/img/icons/keyboard_double_arrow_right_primary.svg';
import heart from '/assets/img/icons/heart.svg';
import deleteIcon from '/assets/img/icons/delete.svg';
import heartBrokenIcon from '/assets/img/icons/heart_broken.svg';

// ASSETS - DARKMODE
import doubleArrowSecondary from '/assets/img/icons/keyboard_double_arrow_right_secondary.svg';
import heartDarkMode from '/assets/img/icons/heart_darkMode.svg';
import deleteDarkModeIcon from '/assets/img/icons/delete_darkMode.svg';
import heartBrokenDarkmodeIcon from '/assets/img/icons/heart_broken_darkMode.svg';

function WishlistSlider ({darkMode, lan}) {
  const {wishlist, removeProductFromWishlist, wishlistToggle, setWishlistToggle} = useWishlistStore();

  const containerEL = useRef(null);  
  const sliderEL = useRef([]);
  const observerRef = useRef(null);
  const wishlistProductsELS = useRef([]);

  const isWishlistEmpty = wishlist.length === 0;
  const en = lan === 'en';
  const getProductImgURL = product => `/assets/img/products/${product.category}/${product.type}/${product.id + '-' + product.color.en}-front.webp`;
  const getProductPrice = product => formatNumberWithCommas(calculatePrice(product.price, product.discount));
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
  }, [wishlist]);

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

  useEffect(() => {
    const filterWishlistELS = () => wishlistProductsELS.current.filter(el => wishlist.some(product => product.id === Number(el.dataset.productId)));
    wishlistProductsELS.current = filterWishlistELS();
  }, [wishlist])

  const handleClick = e => {
    const {action, productId} = e.currentTarget.dataset;

    switch (action) {
      case 'remove_product_from_wishlist':
        const productEL = wishlistProductsELS.current.filter(el => el.dataset.productId === productId)[0];
        productEL.classList.remove('--pop-in');
        setTimeout(() => productEL.style.opacity= '0', 10);
        setTimeout(() => removeProductFromWishlist(getProduct(Number(productId))), 250);
        break;
      default:
        console.error('Error: Unknown Action: ' + action);
    }
  }

  const addRef = el => {
    if (!el) return;
    const {selector, productId} = el.dataset;
    const isElementIncluded = () =>  wishlistProductsELS.current.some(el => Number(productId) === Number(el.dataset.productId));
    const addElement = () => [...wishlistProductsELS.current, el];

    switch (selector) {
      case 'wishlistProductsELS':
        wishlistProductsELS.current = isElementIncluded() ? [...wishlistProductsELS.current] : addElement(); 
        break;
      default:
        console.log('unknown type:' + selector);
    }
  }

  return (
    <div className="wishlist" onClick={() => setWishlistToggle(false)} ref={containerEL}>
      <div className="wishlist__slider" onClick={e => e.stopPropagation()} ref={sliderEL}>
        <button className="wishlist__slider__exit-btn" onClick={() => setWishlistToggle(false)} />
        {isWishlistEmpty ?
        <div className="wishlist__slider__empty-list --pop-in">
          <img className="wishlist__slider__empty-list__broken-heart-img --heart-beat" src={darkMode ? heartBrokenDarkmodeIcon : heartBrokenIcon} />
          <h2 className="wishlist__slider__empty-list__description-h2">{en ? 'Looks like your wishlist needs some love' : 'يبدو أن قائمة أمنياتك بحاجة إلى بعض الاهتمام'}</h2>
          <h1 className="wishlist__slider__empty-list__description-h1">{en ? 'Start adding your favorite items!' : ' ابدأ بإضافة العناصر المفضلة لديك!'}</h1>
          <button className="wishlist__slider__empty-list__btn" onClick={() => setWishlistToggle(false)}>{en ? 'Back to shopping' : 'العوده للتسوق'}</button>
        </div> 
        :
        <ul className="wishlist__slider__list">
          {wishlist.map((product, i) => 
          <li className="wishlist__slider__list__product --pop-in" key={product.id} data-product-id={product.id} data-selector="wishlistProductsELS" ref={addRef}>
            <img className="wishlist__slider__list__product__img" src={getProductImgURL(product)} />
            <div className="wishlist__slider__list__product__title">{product.title[lan]}</div>
            <div className="wishlist__slider__list__product__price">{(en ? 'S.P ' : ' ل.س ') + getProductPrice(product)}</div>
            <button className="wishlist__slider__list__product__delete-btn" data-action="remove_product_from_wishlist" data-product-id={product.id} onClick={handleClick}/>
          </li>
          )}
        </ul>
        }
      </div>
    </div>
  )
}

export default WishlistSlider;