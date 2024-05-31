// HOOKS
import React, {useState, useEffect, useRef} from 'react';

// SCSS
import '/src/styles/components/pages/products/AdvertList.scss';

// JSON
import products from '/src/data/products.json';

// UTILS
import formatNumberWithCommas from '/src/utils/formatNumberWithCommas.js'
import calculatePrice from '/src/utils/calculatePrice.js'
import calculateDiscountPercantage from '/src/utils/calculateDiscountPercantage.js'

// product img test
import productIMG from '/src/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg';
import productIMG2 from '/src/assets/img/products/Giant Bicycle Road full Carbon.avif';
import productIMG3 from '/src/assets/img/products/RIDE 12 Chili Red Carbon Grey 2023.avif';
import productIMG4 from '/src/assets/img/products/Seymour Oceanweave 1.3 H2O.avif';
import brandLogo from '/src/assets/img/logo/trek.webp';
import brandLogo2 from '/src/assets/img/logo/giant.webp';
import brandLogo3 from '/src/assets/img/logo/evoc.webp';

function AdvertList ({darkMode, lan, matchedProducts}) {

  const nowStyle = {
    color: "var(--primary-color)"
  }

  return (
    <div className="advertList-container">
      <section className="advertList-container__advert-section">
        <ul className="advertList-container__advert-section__grid">
          {matchedProducts.map(product => 
          <li className={`advertList-container__advert-section__grid__product-content${product.outOfStock ? ' out-of-stock' : ''}`} key={product.id}>
          <button className="advertList-container__advert-section__grid__product-content__favourite"></button>
          <img className="advertList-container__advert-section__grid__product-content__img" src={`/src/assets/img/products/${product.category}/${product.type}/${product.id + '-' + product.color.en}-front.webp`}/>
          {product.discount ? <h3 className="advertList-container__advert-section__grid__product-content__discount">{lan === 'ar' ? 'خصم ' : ''}{calculateDiscountPercantage(product.price, product.discount)}{lan === 'en' ? ' off' : ''}</h3> : <></>}
          <h3 className="advertList-container__advert-section__grid__product-content__description">{product.title[lan]}</h3>
          <img className="advertList-container__advert-section__grid__product-content__brand-logo" src={product.brand ? `/src/assets/img/logo/${product.brand}.webp` : ''}/>
          <h2 className="advertList-container__advert-section__grid__product-content__price">{product.discount ? <><span style={nowStyle}>{lan === 'en' ? 'NOW' : 'الان'}</span> {formatNumberWithCommas(calculatePrice(product.price, product.discount))} <span className="currency-symbol">{lan === 'en' ? 'S.P ' : 'ل.س'}</span><s>{formatNumberWithCommas(product.price)}</s></> : <>{formatNumberWithCommas(product.price)} <span className="currency-symbol">{lan === 'en' ? 'S.P' : 'ل.س'}</span></>}</h2>
          <div className="advertList-container__advert-section__grid__product-content__cart-utils">
            <button className="advertList-container__advert-section__grid__product-content__cart-utils__add-to-cart">{lan === 'en' ? 'Add to cart' : 'اضف الى السله'}</button>  
            <button className="advertList-container__advert-section__grid__product-content__cart-utils__increment"></button>  
            <div className="advertList-container__advert-section__grid__product-content__cart-utils__total">1</div>  
            <button className="advertList-container__advert-section__grid__product-content__cart-utils__decrement"></button>  
          </div>
          </li>
          )}
        </ul>
      </section>
      <section className="advertList-container__button-section">
        <button className="advertList-container__button-section__load-more">Load More</button>
      </section>
    </div>
  )
}

export default AdvertList;