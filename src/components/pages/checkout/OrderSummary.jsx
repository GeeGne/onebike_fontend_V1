// HOOKS
import React, {useState, useRef, useEffect} from 'react';

// COMPONENTS
import DisplayWebImg from '/src/components/DisplayWebImg';

// SCSS
import '/src/styles/components/pages/checkout/OrderSummary.scss';

// UTILS
import formatNumberWithCommas from '/src/utils/formatNumberWithCommas';

function OrderSummary ({darkMode, lan, order, hidePrices}) {
  const {products, shippingCost, total, subtotal} = order;
  const en = lan === 'en';

  return (
    <div className={`orderSummary${hidePrices ? ' hidePrices' : ''}`}>
      <ul className="orderSummary__products">
        {products.map(item => 
        <li className="orderSummary__products__product" key={item.id}>
          <div className="orderSummary__products__product__img-quan">
            <DisplayWebImg className="orderSummary__products__product__img-quan__img" src={`/assets/img/products/${item.id}/main.webp`} />
            <div className="orderSummary__products__product__img-quan__quan">{item.quantity}</div>
          </div>
          <span className="orderSummary__products__product__description">{item.product.title[lan]}</span>
          <span className="orderSummary__products__product__price">{en ? 'S.P ' : ' ل.س '}{formatNumberWithCommas(item.quantityPrice)}</span>
        </li>
        )}
      </ul>
      <div className="orderSummary__subtotal">
        <span className="orderSummary__subtotal__text">{en ? 'Subtotal' : 'المجموع الفرعي'}</span>
        <span className="orderSummary__subtotal__amount">{en ? 'S.P ' : ' ل.س '} {formatNumberWithCommas(subtotal)}</span>
      </div>              
      <div className="orderSummary__shipping">
        <span className="orderSummary__shipping__text">{en ? 'Shipping' : 'الشحن'}</span>
        <span className="orderSummary__shipping__amount">{shippingCost === 0 ? '--' : (en ? 'S.P ' : ' ل.س ') + formatNumberWithCommas(shippingCost)}</span>
      </div>      
      <div className="orderSummary__total">
        <span className="orderSummary__total__text">{en ? 'Total' : 'الاجمالي'}</span>
        <span className="orderSummary__total__amount">{en ? 'S.P ' : ' ل.س '} {formatNumberWithCommas(total)}</span>
      </div>      
    </div>
  )
}

export default OrderSummary;