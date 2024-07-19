// HOOKS
import React, {useState, useRef, useEffect} from 'react';

// SCSS
import '/src/styles/components/pages/checkout/OrderSummary.scss';

// UTILS
import formatNumberWithCommas from '/src/utils/formatNumberWithCommas';

// product img test
import productIMG from '/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg';
import productIMG2 from '/assets/img/products/Giant Bicycle Road full Carbon.avif';
import productIMG3 from '/assets/img/products/RIDE 12 Chili Red Carbon Grey 2023.avif';
import productIMG4 from '/assets/img/products/Seymour Oceanweave 1.3 H2O.avif';
import brandLogo from '/assets/img/logo/trek.webp';
import brandLogo2 from '/assets/img/logo/giant.webp';
import brandLogo3 from '/assets/img/logo/evoc.webp';


function OrderSummary ({darkMode, lan, order, hidePrices}) {
  const {products, shipping, total} = order;
  const en = lan === 'en';

  return (
    <div className={`orderSummary${hidePrices ? ' hidePrices' : ''}`}>
      <ul className="orderSummary__products">
        {products.map(item => 
        <li className="orderSummary__products__product" key={item.id}>
          <div className="orderSummary__products__product__img-quan">
            <img className="orderSummary__products__product__img-quan__img" src={`/assets/img/products/${item.product.category}/${item.product.type}/${item.product.id + '-' + item.product.color.en}-front.webp`} />
            <div className="orderSummary__products__product__img-quan__quan">{item.quantity}</div>
          </div>
          <span className="orderSummary__products__product__description">{item.product.title[lan]}</span>
          <span className="orderSummary__products__product__price">{en ? 'S.P ' : ' ل.س '}{formatNumberWithCommas(item.quantityPrice)}</span>
        </li>
        )}
      </ul>
      <div className="orderSummary__subtotal">
        <span className="orderSummary__subtotal__text">{en ? 'Subtotal' : 'المجموع الفرعي'}</span>
        <span className="orderSummary__subtotal__amount">{en ? 'S.P ' : ' ل.س '} {formatNumberWithCommas(total)}</span>
      </div>              
      <div className="orderSummary__shipping">
        <span className="orderSummary__shipping__text">{en ? 'Shipping' : 'الشحن'}</span>
        <span className="orderSummary__shipping__amount">{shipping === 0 ? '--' : (en ? 'S.P ' : ' ل.س ') + formatNumberWithCommas(shipping)}</span>
      </div>      
      <div className="orderSummary__total">
        <span className="orderSummary__total__text">{en ? 'Total' : 'الاجمالي'}</span>
        <span className="orderSummary__total__amount">{en ? 'S.P ' : ' ل.س '} {formatNumberWithCommas(shipping + total)}</span>
      </div>      
    </div>
  )
}

export default OrderSummary;