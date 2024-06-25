// HOOKS
import React, {useState, useRef, useEffect} from 'react';

// SCSS
import '/src/styles/components/pages/checkout/OrderSummary.scss'

// product img test
import productIMG from '/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg';
import productIMG2 from '/assets/img/products/Giant Bicycle Road full Carbon.avif';
import productIMG3 from '/assets/img/products/RIDE 12 Chili Red Carbon Grey 2023.avif';
import productIMG4 from '/assets/img/products/Seymour Oceanweave 1.3 H2O.avif';
import brandLogo from '/assets/img/logo/trek.webp';
import brandLogo2 from '/assets/img/logo/giant.webp';
import brandLogo3 from '/assets/img/logo/evoc.webp';


function OrderSummary ({darkMode, lan}) {

  return (
    <div className="orderSummary">
      <ul className="orderSummary__products">
        <li className="orderSummary__products__product">
          <div className="orderSummary__products__product__img-quan">
            <img className="orderSummary__products__product__img-quan__img" src={productIMG} />
            <div className="orderSummary__products__product__img-quan__quan">5</div>
          </div>
          <span className="orderSummary__products__product__description">Portable Bike Air Pump</span>
          <span className="orderSummary__products__product__price">S.P 2000</span>
        </li>
        <li className="orderSummary__products__product">
          <div className="orderSummary__products__product__img-quan">
            <img className="orderSummary__products__product__img-quan__img" src={productIMG} />
            <div className="orderSummary__products__product__img-quan__quan">5</div>
          </div>
          <span className="orderSummary__products__product__description">Portable Bike Air Pump</span>
          <span className="orderSummary__products__product__price">S.P 2000</span>
        </li>
        <li className="orderSummary__products__product">
          <div className="orderSummary__products__product__img-quan">
            <img className="orderSummary__products__product__img-quan__img" src={productIMG} />
            <div className="orderSummary__products__product__img-quan__quan">5</div>
          </div>
          <span className="orderSummary__products__product__description">Portable Bike Air Pump</span>
          <span className="orderSummary__products__product__price">S.P 2000</span>
        </li>
      </ul>
      <div className="orderSummary__subtotal">
        <span className="orderSummary__subtotal__text">Subtotal</span>
        <span className="orderSummary__subtotal__amount">S.P 60</span>
      </div>              
      <div className="orderSummary__shipping">
        <span className="orderSummary__shipping__text">Shipping</span>
        <span className="orderSummary__shipping__amount">S.P 600</span>
      </div>      
      <div className="orderSummary__total">
        <span className="orderSummary__total__text">Total</span>
        <span className="orderSummary__total__amount">S.P 550</span>
      </div>      
    </div>
  )
}

export default OrderSummary;