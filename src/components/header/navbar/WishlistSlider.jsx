// HOOKS
import React, {useState, useEffect, useRef} from 'react';

// SCSS
import '/src/styles/components/header/navbar/WishlistSlider.scss';

// STORE
import {useWishlistStore} from '/src/store/store';

function WishlistSlider ({darkMode, lan, /* wishlistToggle, */ onWishlistToggleChange}) {
  const {wishlistToggle, setWishlistToggle} = useWishlistStore();
  const containerEL = useRef(null);  
  const sliderEL = useRef(null);

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
    // <div className="wishlist" onClick={() => onWishlistToggleChange(false)} ref={containerEL}>
    <div className="wishlist" onClick={() => setWishlistToggle(false)} ref={containerEL}>
      <div className="wishlist__slider" onClick={e => e.stopPropagation()} ref={sliderEL}>
        <button className="wishlist__slider__exit-btn" onClick={() => setWishlistToggle(false)}></button>
      </div>
    </div>
  )
}

export default WishlistSlider;