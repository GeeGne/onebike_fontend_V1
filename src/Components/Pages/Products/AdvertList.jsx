// HOOKS
import React, {useState, useEffect, useRef} from 'react';

// SCSS
import '/src/Styles/Components/Pages/Products/AdvertList.scss';

// product img test
import productIMG from '/src/assets/Img/Products/GIYO Small Bike tire Pump Schrader.jpg';
import brandLogo from '/src/assets/Img/Logo/TREK.avif';

function AdvertList ({darkMode, language}) {

  return (
    <>
      <div className="advertList-container">
        <ul className="advertList-container__grid">
          <li className="advertList-container__grid__product-content">
            <img className="advertList-container__grid__product-content__img" src={productIMG}/>
            <h3 className="advertList-container__grid__product-content__description">{language === 'english' ? 'Hand size air pump' : 'منفاخ هوائي بحجم اليد'}</h3>
            <img className="advertList-container__grid__product-content__brandLogo" src={brandLogo}/>
            <h3 className="advertList-container__grid__product-content__price">500<span className="currency-symbol">{language === 'english' ? 'S.P' : 'ل.س'}</span></h3>
            <div className="advertList-container__grid__product-content__cart-utils">
              <button className="advertList-container__grid__product-content__cart-utils__add-to-cart">Add to cart</button>  
              <button className="advertList-container__grid__product-content__cart-utils__increment"></button>  
              <div className="advertList-container__grid__product-content__cart-utils__total">1</div>  
              <button className="advertList-container__grid__product-content__cart-utils__decrement"></button>  
            </div>
          </li>
          <li className="advertList-container__grid__product-content">
          <img className="advertList-container__grid__product-content__img" src={productIMG}/>
            <h3 className="advertList-container__grid__product-content__description">Hand size air pump</h3>
            <img className="advertList-container__grid__product-content__brandLogo" src={brandLogo}/>
            <h3 className="advertList-container__grid__product-content__price">500 S.P</h3>
          </li>
          <li className="advertList-container__grid__product-content">
          <img className="advertList-container__grid__product-content__img" src={productIMG}/>
            <h3 className="advertList-container__grid__product-content__description">Hand size air pump</h3>
            <img className="advertList-container__grid__product-content__brandLogo" src={brandLogo}/>
            <h3 className="advertList-container__grid__product-content__price">500 S.P</h3>
          </li>
          <li className="advertList-container__grid__product-content">
          <img className="advertList-container__grid__product-content__img" src={productIMG}/>
            <h3 className="advertList-container__grid__product-content__description">Hand size air pump</h3>
            <img className="advertList-container__grid__product-content__brandLogo" src={brandLogo}/>
            <h3 className="advertList-container__grid__product-content__price">500 <span>S.P</span></h3>
          </li>
          <li className="advertList-container__grid__product-content">
          <img className="advertList-container__grid__product-content__img" src={productIMG}/>
            <h3 className="advertList-container__grid__product-content__description">Hand size air pump</h3>
            <img className="advertList-container__grid__product-content__brandLogo" src={brandLogo}/>
            <h3 className="advertList-container__grid__product-content__price">500 S.P</h3>
          </li>
          <li className="advertList-container__grid__product-content">
          <img className="advertList-container__grid__product-content__img" src={productIMG}/>
            <h3 className="advertList-container__grid__product-content__description">Hand size air pump</h3>
            <img className="advertList-container__grid__product-content__brandLogo" src={brandLogo}/>
            <h3 className="advertList-container__grid__product-content__price">500 S.P</h3>
          </li>
          <li className="advertList-container__grid__product-content">
          <img className="advertList-container__grid__product-content__img" src={productIMG}/>
            <h3 className="advertList-container__grid__product-content__description">Hand size air pump</h3>
            <img className="advertList-container__grid__product-content__brandLogo" src={brandLogo}/>
            <h3 className="advertList-container__grid__product-content__price">500 S.P</h3>
          </li>
          <li className="advertList-container__grid__product-content">
          <img className="advertList-container__grid__product-content__img" src={productIMG}/>
            <h3 className="advertList-container__grid__product-content__description">Hand size air pump</h3>
            <img className="advertList-container__grid__product-content__brandLogo" src={brandLogo}/>
            <h3 className="advertList-container__grid__product-content__price">500 S.P</h3>
          </li>
          <li className="advertList-container__grid__product-content">
          <img className="advertList-container__grid__product-content__img" src={productIMG}/>
            <h3 className="advertList-container__grid__product-content__description">Hand size air pump</h3>
            <img className="advertList-container__grid__product-content__brandLogo" src={brandLogo}/>
            <h3 className="advertList-container__grid__product-content__price">500 S.P</h3>
          </li>
        </ul>
      </div>
    </>
  )
}

export default AdvertList;