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
  const categoryContELRefs = useRef([]);
  const typeContELRefs = useRef([]);
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
    redirector.admin(user, userData);
  }, [userData]);

  console.log('user', user);
  console.log('userData', userData);
  console.log('itemELRefs', itemELRefs.current);
  console.log('products', products);

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
    const totalHeight = el => el.scrollHeight

    switch(action) {
      case 'edit_button_is_clicked':
        getEL(itemELRefs.current).classList.toggle('clicked');

        if (isELClicked(getEL(itemELRefs.current))) {
          getEL(itemELRefs.current).style.maxHeight = String( totalHeight(getEL(itemELRefs.current)) ) + 'px';
          console.log(overflowTimerId.current)
          clearTimeout(overflowTimerId.current);
          overflowTimerId.current = setTimeout(() => getEL(itemELRefs.current).style.overflow = 'visible', 250);
          // getEL(itemELRefs.current).style.overflow = 'visible';
        } else {
          clearTimeout(overflowTimerId.current);
          getEL(itemELRefs.current).style.maxHeight = String( totalHeight(getEL(itemEditELRefs.current)) ) + 'px';
          getEL(itemELRefs.current).style.overflow = 'hidden';
        }
        break;
      case 'delete_button_is_clicked':
        console.log(index);
        break;
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
        setTimeout(() => getEL(itemStateContELRefs.current).classList.remove('focus'), 50);
        break;
      case 'category_input':
        setTimeout(() => getEL(categoryContELRefs.current).classList.remove('focus'), 50);
        break;
      case 'type_input':
        setTimeout(() => getEL(typeContELRefs.current).classList.remove('focus'), 50);
        break;
      default:
        console.error('Error: unknown type: ', type)
    }    
  }

  return (
    <div className="cm">
      <section className="cm__breadCrumb-sec">
        <BreadCrumb type={{en: 'admin', ar: 'ادمن'}} category={{en: 'account', ar: 'الحساب'}} lan={lan} />
      </section>
      <section className="cm__title-sec">
        <h1 className="cm__title-sec__h1">{en ? 'Content Management' : 'اداره المحتوى'}</h1>
      </section>
      <section className="cm__cntnt-sec">
        <div className="cm__cntnt-sec__header-row">
          <span className="cm__cntnt-sec__header-row__spn">{en ? 'Name' : 'الاسم'}</span>
          <span className="cm__cntnt-sec__header-row__spn">{en ? 'ID' : 'رمز'}</span>
          <span className="cm__cntnt-sec__header-row__spn">{en ? 'price' : 'السعر'}</span>
          {/* <span className="cm__cntnt-sec__header-row__spn">{en ? 'discount' : 'تخفيض'}</span> */}
        </div>
        <ul className="cm__cntnt-sec__lst">
          {isProductsLoaded().map((item, i) => 
          <li className="cm__cntnt-sec__lst__itm" key={i} data-index={i} ref={el => itemELRefs.current[i] = el}>
            <div className="cm__cntnt-sec__lst__itm__info-cont" data-index={i} ref={el => itemEditELRefs.current[i] = el}>
              <div className="cm__cntnt-sec__lst__itm__info-cont__cont">
                <DisplayImage className="cm__cntnt-sec__lst__itm__info-cont__cont__img" src={getProductImgURL(item)} />
                <span className="cm__cntnt-sec__lst__itm__info-cont__cont__title">{item.title[lan]}</span>
              </div>
                <div className="cm__cntnt-sec__lst__itm__info-cont__cont">
                <span className="cm__cntnt-sec__lst__itm__info-cont__cont__id">{item.id}</span>
              </div>
              <div className="cm__cntnt-sec__lst__itm__info-cont__cont">
                <span className="cm__cntnt-sec__lst__itm__info-cont__cont__price">200</span>{' - '}
                <span className="cm__cntnt-sec__lst__itm__info-cont__cont__discount">4%</span>
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
              <input className="cm__cntnt-sec__lst__itm__edit-cont__nameEn-inpt" placeholder="name in english" />
              <input className="cm__cntnt-sec__lst__itm__edit-cont__nameAr-inpt" placeholder="name in arabic" />
              <input className="cm__cntnt-sec__lst__itm__edit-cont__price-inpt" placeholder="price" />
              <input className="cm__cntnt-sec__lst__itm__edit-cont__discount-inpt" placeholder="discount" />
              <div className="cm__cntnt-sec__lst__itm__edit-cont__itemState-cont" ref={el => itemStateContELRefs.current[i] = el} data-index={i}>
                <input className="cm__cntnt-sec__lst__itm__edit-cont__itemState-cont__inpt" placeholder="Item State" data-type="item_state_input" data-index={i} readOnly onFocus={handleFocus} onBlur={handleBlur} />
                <ul className="cm__cntnt-sec__lst__itm__edit-cont__itemState-cont__lst">
                  <li className="cm__cntnt-sec__lst__itm__edit-cont__itemState-cont__lst__itm">{en ? 'Availabe' : 'متاح'}</li>
                  <li className="cm__cntnt-sec__lst__itm__edit-cont__itemState-cont__lst__itm">{en ? 'Out of stock' : 'غير متوفر'}</li>
                  <li className="cm__cntnt-sec__lst__itm__edit-cont__itemState-cont__lst__itm">{en ? 'Hidden' : 'مخفي'}</li>
                </ul>
              </div>
              <div className="cm__cntnt-sec__lst__itm__edit-cont__category-cont" ref={el => categoryContELRefs.current[i] = el} data-index={i}>
                <input className="cm__cntnt-sec__lst__itm__edit-cont__category-cont__inpt" placeholder="Gategory" data-type="category_input" data-index={i} readOnly onFocus={handleFocus} onBlur={handleBlur} />
                <ul className="cm__cntnt-sec__lst__itm__edit-cont__category-cont__lst">
                  <li className="cm__cntnt-sec__lst__itm__edit-cont__category-cont__lst__itm">{en ? 'Availabe' : 'متاح'}</li>
                  <li className="cm__cntnt-sec__lst__itm__edit-cont__category-cont__lst__itm">{en ? 'Out of stock' : 'غير متوفر'}</li>
                  <li className="cm__cntnt-sec__lst__itm__edit-cont__category-cont__lst__itm">{en ? 'Hidden' : 'مخفي'}</li>
                </ul>
              </div>
              <div className="cm__cntnt-sec__lst__itm__edit-cont__type-cont" ref={el => typeContELRefs.current[i] = el} data-index={i}>
                <input className="cm__cntnt-sec__lst__itm__edit-cont__type-cont__inpt" placeholder="type" data-type="type_input" data-index={i} readOnly onFocus={handleFocus} onBlur={handleBlur} />
                <ul className="cm__cntnt-sec__lst__itm__edit-cont__type-cont__lst">
                  <li className="cm__cntnt-sec__lst__itm__edit-cont__type-cont__lst__itm">{en ? 'Availabe' : 'متاح'}</li>
                  <li className="cm__cntnt-sec__lst__itm__edit-cont__type-cont__lst__itm">{en ? 'Out of stock' : 'غير متوفر'}</li>
                  <li className="cm__cntnt-sec__lst__itm__edit-cont__type-cont__lst__itm">{en ? 'Hidden' : 'مخفي'}</li>
                </ul>
              </div>

              <button className="cm__cntnt-sec__lst__itm__edit-cont__save-btn">Save</button>
            </div>
          </li>
          )}
        </ul>
      </section>
    </div>
  )
}

export default ContentManagement;