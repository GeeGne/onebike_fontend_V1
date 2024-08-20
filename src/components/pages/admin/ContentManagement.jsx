// HOOKS
import React, {useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// SCSS
import '/src/styles/components/pages/admin/ContentManagement.scss';

// COMPONENTS
import Alert from '/src/components/Alert';
import BreadCrumb from '/src/components/BreadCrumb';
import DisplayImage from '/src/components/DisplayImage';

// STORE
import { useDataStore } from '/src/store/store';

// FIREBASE
import { auth } from "/src/firebase/authSignUp";
import { signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { db } from '/src/firebase/fireStore';
import { getDoc, doc, collection, getDocs } from 'firebase/firestore';
import { storage } from '/src/firebase/storage';
import { ref, getDownloadURL } from "firebase/storage";

// JSON
import menu from '/src/data/menu.json';

// UTILS
import Redirector from '/src/utils/Redirector';

// ASSETS
import img from '/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg';
import doubleArrowPrimary from '/assets/img/icons/keyboard_double_arrow_right_primary.svg';
import heart from '/assets/img/icons/heart.svg';
import heartFill from '/assets/img/icons/heart_fill.svg';

// ASSETS - DARKMODE
import doubleArrowSecondary from '/assets/img/icons/keyboard_double_arrow_right_secondary.svg';
import heartDarkMode from '/assets/img/icons/heart_darkMode.svg';

function ContentManagement ({darkMode, lan}) {
  const array = [1, 2, 3, 4];
  const {user, userData, products} = useDataStore();

  const itemELRefs = useRef([]);
  const itemInfoELRefs = useRef([]);
  const itemEditELRefs = useRef([]);

  const itemStateContELRefs = useRef([]);
  const itemStateInptELRefs = useRef([]);

  const categoryContELRefs = useRef([]);
  const categoryInptELRefs = useRef([]);
  
  const typeContELRefs = useRef([]);
  const typeInptELRefs = useRef([]);

  const overflowTimerId = useRef(null);

  const en = lan === 'en';
  const navigate = useNavigate();
  const redirector = new Redirector(navigate);
  const isProductsLoaded = () => {
    if (products) {
      return products
    } else {
      return []
    }
  }

  const getProductImgURL = product => `/assets/img/products/${product.category}/${product.type}/${product.id + '-' + product.color.en}-front.webp`;
  // const getProductPrice = product => formatNumberWithCommas(calculatePrice(product.price, product.discount));
  // const isProductInWishlist = product => wishlist.some(item => item.id === product.id);

  useEffect(() => {
    if (userData) redirector.admin(user, userData);
  }, [userData]);

  // console.log('user', user);
  // console.log('userData', userData);
  // console.log('itemELRefs', itemELRefs.current);
  // console.log('products', products);

  useEffect(() => {
    const setItemHeights = () => {
      itemELRefs.current.forEach(el => 
        el.style.maxHeight = String(itemEditELRefs.current[0].scrollHeight) + 'px'
      );  
    }

    setItemHeights();
  }, []);

  const handleClick = e => {
    const {action, index} = e.currentTarget.dataset;
    const getEL = el => el.filter(el => Number(el.dataset.index) === Number(index))[0];
    const isELClicked = el => el.classList.contains('clicked');
    const totalHeight = el => el.scrollHeight;
    const getTextContent = el => el.textContent;

    switch(action) {
      case 'edit_button_is_clicked':
        getEL(itemELRefs.current).classList.toggle('clicked');

        if (isELClicked(getEL(itemELRefs.current))) {
          getEL(itemELRefs.current).style.maxHeight = String( totalHeight(getEL(itemELRefs.current)) ) + 'px';
          console.log(overflowTimerId.current)
          clearTimeout(overflowTimerId.current);
          overflowTimerId.current = setTimeout(() => getEL(itemELRefs.current).style.overflow = 'visible', 250);
        } else {
          clearTimeout(overflowTimerId.current);
          getEL(itemELRefs.current).style.maxHeight = String( totalHeight(getEL(itemEditELRefs.current)) ) + 'px';
          getEL(itemELRefs.current).style.overflow = 'hidden';
        }
        break;
      case 'delete_button_is_clicked':
        console.log(index);
        break;
      case 'itemState_option_is_clicked':
        getEL(itemStateInptELRefs.current).value = getTextContent(e.currentTarget);
        break;
      case 'category_option_is_clicked':
        getEL(categoryInptELRefs.current).value = getTextContent(e.currentTarget);
        break;
      // case 'itemState_option_is_clicked':
        // getEL(itemStateInptELRefs.current).value = getTextContent(e.currentTarget);
        // break;
      default:
        console.error('Error: unknown action: ', action);
    }
  }

  const handleFocus = e => {
    const {type, index} = e.currentTarget.dataset;
    const getEL = el => el.filter(el => Number(el.dataset.index) === Number(index))[0];
    const isELClicked = el => el.classList.contains('clicked');
    const totalHeight = el => el.scrollHeight

    switch (type) {
      case 'item_state_input':
        getEL(itemStateContELRefs.current).classList.add('focus');
        break;
      case 'category_input':
        getEL(categoryContELRefs.current).classList.add('focus');
        break;
      case 'type_input':
        getEL(typeContELRefs.current).classList.add('focus');
        break;
      default:
        console.error('Error: unknown type: ', type)
    }
  }

  const handleBlur = e => {
    const {type, index} = e.currentTarget.dataset;
    const getEL = el => el.filter(el => Number(el.dataset.index) === Number(index))[0];
    const isELClicked = el => el.classList.contains('clicked');
    const totalHeight = el => el.scrollHeight

    switch (type) {
      case 'item_state_input':
        setTimeout(() => getEL(itemStateContELRefs.current).classList.remove('focus'), 100);
        break;
      case 'category_input':
        setTimeout(() => getEL(categoryContELRefs.current).classList.remove('focus'), 100);
        break;
      case 'type_input':
        setTimeout(() => getEL(typeContELRefs.current).classList.remove('focus'), 100);
        break;
      default:
        console.error('Error: unknown type: ', type)
    }    
  }

  return (
    <section className="cm">
      <ul className="cm__cntnt-sec__lst">
        {isProductsLoaded().map((item, i) => 
        <li className="cm__cntnt-sec__lst__itm" key={i} data-index={i} ref={el => itemELRefs.current[i] = el}>
          <div className="cm__cntnt-sec__lst__itm__info-cont" data-index={i} ref={el => itemEditELRefs.current[i] = el}>
            <div className="cm__cntnt-sec__lst__itm__info-cont__name-cont">
              <div className="cm__cntnt-sec__lst__itm__info-cont__name-cont__state" />
              <DisplayImage className="cm__cntnt-sec__lst__itm__info-cont__name-cont__img" src={getProductImgURL(item)} alt={item.title[lan]} loading="lazy" />
              <span className="cm__cntnt-sec__lst__itm__info-cont__name-cont__title">{item.title[lan]}</span>
            </div>
              <div className="cm__cntnt-sec__lst__itm__info-cont__id-cont">
              <span className="cm__cntnt-sec__lst__itm__info-cont__id-cont__id">{item.id}</span>
            </div>
            <div className="cm__cntnt-sec__lst__itm__info-cont__price-cont">
              <span className="cm__cntnt-sec__lst__itm__info-cont__price-cont__price">{item.price}</span>{' - '}
              <span className="cm__cntnt-sec__lst__itm__info-cont__price-cont__discount">4%</span>
            </div>
            <div className="cm__cntnt-sec__lst__itm__info-cont__toggles-cont">
              <button className="cm__cntnt-sec__lst__itm__info-cont__toggles-cont__delete-btn" aria-label="Delete Item" data-action="delete_button_is_clicked" data-index={i} onClick={handleClick} />
              <button className="cm__cntnt-sec__lst__itm__info-cont__toggles-cont__edit-btn" aria-label="Edit Item" data-action="edit_button_is_clicked" data-index={i} onClick={handleClick} />
            </div> 
          </div>
          <div className="cm__cntnt-sec__lst__itm__edit-cont" data-index={i} ref={el => itemInfoELRefs.current[i] = el}>
            <span className="cm__cntnt-sec__lst__itm__edit-cont__price-spn">{en ? 'Price' : 'السعر'}</span>
            <span className="cm__cntnt-sec__lst__itm__edit-cont__category-spn">{en ? 'Category' : 'التصنيف'}</span>
            <span className="cm__cntnt-sec__lst__itm__edit-cont__name-spn">{en ? 'Name' : 'الاسم'}</span>
            <input className="cm__cntnt-sec__lst__itm__edit-cont__nameEn-inpt" placeholder={en ? "name in english" : "الاسم بلانجليزي"} />
            <input className="cm__cntnt-sec__lst__itm__edit-cont__nameAr-inpt" placeholder={en ? "name in arabic" : "الاسم بلعربي"} />
            <input className="cm__cntnt-sec__lst__itm__edit-cont__price-inpt" placeholder={en ? "price" : "السعر"} />
            <input className="cm__cntnt-sec__lst__itm__edit-cont__discount-inpt" placeholder={en ? "discount" : "التخفيض"} />
            <div className="cm__cntnt-sec__lst__itm__edit-cont__itemState-cont" ref={el => itemStateContELRefs.current[i] = el} data-index={i}>
              <input className="cm__cntnt-sec__lst__itm__edit-cont__itemState-cont__inpt" placeholder="Item State" data-type="item_state_input" data-index={i} readOnly onFocus={handleFocus} onBlur={handleBlur} ref={el => itemStateInptELRefs.current[i] = el} />
              <ul className="cm__cntnt-sec__lst__itm__edit-cont__itemState-cont__lst">
                <li className="cm__cntnt-sec__lst__itm__edit-cont__itemState-cont__lst__itm" data-index={i} data-action="itemState_option_is_clicked" onClick={handleClick}>{en ? 'Availabe' : 'متاح'}</li>
                <li className="cm__cntnt-sec__lst__itm__edit-cont__itemState-cont__lst__itm" data-index={i} data-action="itemState_option_is_clicked" onClick={handleClick}>{en ? 'Out of stock' : 'غير متوفر'}</li>
                <li className="cm__cntnt-sec__lst__itm__edit-cont__itemState-cont__lst__itm" data-index={i} data-action="itemState_option_is_clicked" onClick={handleClick}>{en ? 'Hidden' : 'مخفي'}</li>
              </ul>
            </div>
            <div className="cm__cntnt-sec__lst__itm__edit-cont__category-cont" ref={el => categoryContELRefs.current[i] = el} data-index={i}>
              <input className="cm__cntnt-sec__lst__itm__edit-cont__category-cont__inpt" placeholder="Gategory" data-type="category_input" data-index={i} readOnly onFocus={handleFocus} onBlur={handleBlur} ref={el => categoryInptELRefs.current[i] = el} />
              <ul className="cm__cntnt-sec__lst__itm__edit-cont__category-cont__lst">
              {menu.map(item => 
                <li className="cm__cntnt-sec__lst__itm__edit-cont__category-cont__lst__itm" key={item.id} data-index={i} data-action="category_option_is_clicked" onClick={handleClick}>{item[lan]}</li>
              )}
              </ul>
            </div>
            <div className="cm__cntnt-sec__lst__itm__edit-cont__type-cont" ref={el => typeContELRefs.current[i] = el} data-index={i}>
              <input className="cm__cntnt-sec__lst__itm__edit-cont__type-cont__inpt" placeholder="type" data-type="type_input" data-index={i} readOnly onFocus={handleFocus} onBlur={handleBlur} ref={el => typeInptELRefs.current[i] = el} />
              <ul className="cm__cntnt-sec__lst__itm__edit-cont__type-cont__lst">
              {menu.map(item => 
                <li className="cm__cntnt-sec__lst__itm__edit-cont__category-cont__lst__itm" key={item.id}>{item[lan]}</li>
              )}
              </ul>
            </div>
            <button className="cm__cntnt-sec__lst__itm__edit-cont__save-btn">Save</button>
          </div>
        </li>
        )}
      </ul>
    </section>
  )
}

export default ContentManagement;