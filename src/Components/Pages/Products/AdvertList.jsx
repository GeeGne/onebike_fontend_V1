// HOOKS
import React, {useState, useEffect, useRef} from 'react';

// SCSS
import '/src/Styles/Components/Pages/Products/AdvertList.scss';

// product img test
import productIMG from '/src/assets/Img/Products/GIYO Small Bike tire Pump Schrader.jpg';
import productIMG2 from '/src/assets/Img/Products/Giant Bicycle Road full Carbon.avif';
import productIMG3 from '/src/assets/Img/Products/RIDE 12 Chili Red Carbon Grey 2023.avif';
import productIMG4 from '/src/assets/Img/Products/Seymour Oceanweave 1.3 H2O.avif';
import brandLogo from '/src/assets/Img/Logo/TREK.avif';
import brandLogo2 from '/src/assets/Img/Logo/GIANT.avif';
import brandLogo3 from '/src/assets/Img/Logo/EVOC.avif';

function AdvertList ({darkMode, lan}) {

  return (
    <>
      <div className="advertList-container">
        <section className="advertList-container__advert-section">
          <ul className="advertList-container__advert-section__grid">
            <li className="advertList-container__advert-section__grid__product-content">
              <button className="advertList-container__advert-section__grid__product-content__favourite"></button>
              <img className="advertList-container__advert-section__grid__product-content__img" src={productIMG}/>
              <h3 className="advertList-container__advert-section__grid__product-content__description">{lan === 'en' ? 'Hand size air pump' : 'منفاخ هوائي بحجم اليد'}</h3>
              <img className="advertList-container__advert-section__grid__product-content__brand-logo" src={brandLogo}/>
              <h2 className="advertList-container__advert-section__grid__product-content__price">500 <span className="currency-symbol">{lan === 'en' ? 'S.P' : 'ل.س'}</span></h2>
              <div className="advertList-container__advert-section__grid__product-content__cart-utils">
                <button className="advertList-container__advert-section__grid__product-content__cart-utils__add-to-cart">{lan === 'en' ? 'Add to cart' : 'اضف الى السله'}</button>  
                <button className="advertList-container__advert-section__grid__product-content__cart-utils__increment"></button>  
                <div className="advertList-container__advert-section__grid__product-content__cart-utils__total">1</div>  
                <button className="advertList-container__advert-section__grid__product-content__cart-utils__decrement"></button>  
              </div>
            </li>
            <li className="advertList-container__advert-section__grid__product-content">
              <img className="advertList-container__advert-section__grid__product-content__img" src={productIMG2}/>
              <button className="advertList-container__advert-section__grid__product-content__favourite"></button>
              <h3 className="advertList-container__advert-section__grid__product-content__description">{lan === 'en' ? 'Giant Road Bicycle full Carbon' : 'دراجه جيانت سباق فول كربون'}</h3>
              <img className="advertList-container__advert-section__grid__product-content__brand-logo" src={brandLogo2}/>
              <h2 className="advertList-container__advert-section__grid__product-content__price discount">{lan === 'en' ? 'NOW' : 'الان'} 25 <span className="currency-symbol">{lan === 'en' ? 'S.P ' : 'ل.س'}</span><s>50</s></h2>
              <div className="advertList-container__advert-section__grid__product-content__cart-utils">
                <button className="advertList-container__advert-section__grid__product-content__cart-utils__add-to-cart">{lan === 'en' ? 'Add to cart' : 'اضف الى السله'}</button>  
                <button className="advertList-container__advert-section__grid__product-content__cart-utils__increment"></button>  
                <div className="advertList-container__advert-section__grid__product-content__cart-utils__total">1</div>  
                <button className="advertList-container__advert-section__grid__product-content__cart-utils__decrement"></button>  
              </div>
            </li>
            <li className="advertList-container__advert-section__grid__product-content">
              <img className="advertList-container__advert-section__grid__product-content__img" src={productIMG3}/>
              <button className="advertList-container__advert-section__grid__product-content__favourite"></button>
              <h3 className="advertList-container__advert-section__grid__product-content__description">{lan === 'en' ? 'RIDE 12 (Chili Red Carbon Grey) 2023' : 'RIDE 12 (Chili Red Carbon Grey) 2023'}</h3>
              <img className="advertList-container__advert-section__grid__product-content__brand-logo" src={brandLogo3}/>
              <h2 className="advertList-container__advert-section__grid__product-content__price">1200 <span className="currency-symbol">{lan === 'en' ? 'S.P' : 'ل.س'}</span></h2>
              <div className="advertList-container__advert-section__grid__product-content__cart-utils">
                <button className="advertList-container__advert-section__grid__product-content__cart-utils__add-to-cart">{lan === 'en' ? 'Add to cart' : 'اضف الى السله'}</button>  
                <button className="advertList-container__advert-section__grid__product-content__cart-utils__increment"></button>  
                <div className="advertList-container__advert-section__grid__product-content__cart-utils__total">1</div>  
                <button className="advertList-container__advert-section__grid__product-content__cart-utils__decrement"></button>  
              </div>
            </li>
            <li className="advertList-container__advert-section__grid__product-content">
              <img className="advertList-container__advert-section__grid__product-content__img" src={productIMG4}/>
              <button className="advertList-container__advert-section__grid__product-content__favourite"></button>
              <h3 className="advertList-container__advert-section__grid__product-content__description">{lan === 'en' ? 'Seymour Oceanweave 1.3 H2O' : 'Seymour Oceanweave 1.3 H2O'}</h3>
              <img className="advertList-container__advert-section__grid__product-content__brand-logo" src={brandLogo3}/>
              <h2 className="advertList-container__advert-section__grid__product-content__price">5000 <span className="currency-symbol">{lan === 'en' ? 'S.P' : 'ل.س'}</span></h2>
              <div className="advertList-container__advert-section__grid__product-content__cart-utils">
                <button className="advertList-container__advert-section__grid__product-content__cart-utils__add-to-cart">{lan === 'en' ? 'Add to cart' : 'اضف الى السله'}</button>  
                <button className="advertList-container__advert-section__grid__product-content__cart-utils__increment"></button>  
                <div className="advertList-container__advert-section__grid__product-content__cart-utils__total">1</div>  
                <button className="advertList-container__advert-section__grid__product-content__cart-utils__decrement"></button>  
              </div>
            </li>
          </ul>
        </section>
        <section className="advertList-container__button-section">
          <button className="advertList-container__button-section__load-more">Load More</button>
        </section>
      </div>
    </>
  )
}

export default AdvertList;