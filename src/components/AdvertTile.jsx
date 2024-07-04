// HOOKS
import React, {useState, useEffect, useRef} from 'react';

// SCSS
import '/src/styles/components/AdvertTile.scss';

// ASSETS
import img from '/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg';
import doubleArrowPrimary from '/assets/img/icons/keyboard_double_arrow_right_primary.svg';
import heart from '/assets/img/icons/heart.svg';

// ASSETS - DARKMODE
import doubleArrowSecondary from '/assets/img/icons/keyboard_double_arrow_right_secondary.svg';
import heartDarkMode from '/assets/img/icons/heart_darkMode.svg';

function AdvertTile ({darkMode, lan}) {


  return (
    <section className="advertTile">
      <div className="advertTile__panel">
        <span className="advertTile__panel__title --colorChange-view">Clothing</span>
        <span className="advertTile__panel__see-more --colorChange-view">See More</span>
        <img className="advertTile__panel__doubleArrow" src={darkMode ? doubleArrowSecondary : doubleArrowPrimary} />
      </div>
      <ul className="advertTile__list">
        <li className="advertTile__list__product">
          <img className="advertTile__list__product__heart-img" src={darkMode ? heartDarkMode : heart} />
          <img className="advertTile__list__product__img" src={img} />
          <div className="advertTile__list__product__description">Portable bike Air pump</div>
          <button className="advertTile__list__product__add-btn">Add to Cart</button>
        </li>
      </ul>
    </section>
  )
}

export default AdvertTile;