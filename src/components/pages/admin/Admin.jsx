// HOOKS
import React, {useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// SCSS
import '/src/styles/components/pages/admin/Admin.scss';

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

function Admin ({darkMode, lan}) {
  const array = [1, 2, 3, 4];
  const {user, userData, products} = useDataStore();
  const [typeItmArray, setTypeItmArray] = useState([]);

  const itemELRefs = useRef([]);
  const itemInfoELRefs = useRef([]);
  const itemEditELRefs = useRef([]);

  const itemStateContELRefs = useRef([]);
  const itemStateInptELRefs = useRef([]);

  const categoryContELRefs = useRef([]);
  const categoryInptELRefs = useRef([]);
  
  const typeContELRefs = useRef([]);
  const typeLstELRefs = useRef([]);
  const typeInptELRefs = useRef([]);

  const overflowTimerId = useRef(null);

  const en = lan === 'en';
  const navigate = useNavigate();
  const redirector = new Redirector(navigate);
  const addTypeItmtHTML = i => {
    const isTypeItmSelected = typeItmArray.some(item => Number(item.index) === i);

    if (isTypeItmSelected) {
      let array = [];

      const getTheCategory = menu.filter(list => list.key === typeItmArray[i].key)[0];
      const getTypes = getTheCategory.secondaryList.forEach(list => list.thirdList.forEach(list => array = [...array, list]));

      return array.map((item, index) => 
        <li className="admin__cntnt-sec__lst__itm__edit-cont__type-cont__lst__itm" key={index} data-index={i} data-action="type_option_is_clicked" data-key={item.key} onClick={handleClick}>{item[lan]}</li>
      ) 

    } else {
      return <li className="admin__cntnt-sec__lst__itm__edit-cont__type-cont__lst__itm">{en ? 'Please Select a Category' : 'الرجاء اختيار صنف'}</li> 
    }

  }
  const getColorForState = state => {
    switch (state) {
      case 'available':
        return ' green';
      case 'out-of-stock':
        return ' yellow';
      case 'hidden':
        return  ' red';
      default:
        console.error('Error: unknown state: ', state);
        return '';
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
  console.log('typeItmArray', typeItmArray);

  useEffect(() => {
    const setItemHeights = () => {
      itemELRefs.current.forEach(el => 
        el.style.maxHeight = String(itemEditELRefs.current[0].scrollHeight) + 'px'
      );  
    }

    setItemHeights();
  }, []);

  // useEffect(() => {
  //   products.map(item => {
  //     return
  //   })
  //   settypeItmArray(products.map)
  // }, [products])

  const handleClick = e => {
    const {action, index, key} = e.currentTarget.dataset;
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
        setTypeItmArray(prevArr => [...prevArr.filter(item => item.index !== Number(index)), {index: Number(index), key}]);
        getEL(typeInptELRefs.current).value = '';
        break;
      case 'type_option_is_clicked':
        getEL(typeInptELRefs.current).value = getTextContent(e.currentTarget);
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
    <div className="admin">
      <section className="admin__breadCrumb-sec">
        <BreadCrumb type={{en: 'admin', ar: 'ادمن'}} category={{en: 'account', ar: 'الحساب'}} lan={lan} />
      </section>
      <section className="admin__title-sec">
        <h1 className="admin__title-sec__h1">{en ? 'Content Management' : 'اداره المحتوى'}</h1>
      </section>
      <section className="admin__cntnt-sec">
        <div className="admin__cntnt-sec__header-row">
          <span className="admin__cntnt-sec__header-row__spn">{en ? 'Name' : 'الاسم'}</span>
          <span className="admin__cntnt-sec__header-row__spn">{en ? 'ID' : 'رمز'}</span>
          <span className="admin__cntnt-sec__header-row__spn">{en ? 'price' : 'السعر'}</span>
        </div>
        <ul className="admin__cntnt-sec__lst">
          {products.map((item, i) => 
          <li className="admin__cntnt-sec__lst__itm" key={i} data-index={i} ref={el => itemELRefs.current[i] = el}>
            <div className="admin__cntnt-sec__lst__itm__info-cont" data-index={i} ref={el => itemEditELRefs.current[i] = el}>
              <div className="admin__cntnt-sec__lst__itm__info-cont__name-cont">
                <div className={`admin__cntnt-sec__lst__itm__info-cont__name-cont__state${getColorForState(item.state)}`} />
                <DisplayImage className="admin__cntnt-sec__lst__itm__info-cont__name-cont__img" src={getProductImgURL(item)} alt={item.title[lan]} loading="lazy" />
                <span className="admin__cntnt-sec__lst__itm__info-cont__name-cont__title">{item.title[lan]}</span>
              </div>
              <div className="admin__cntnt-sec__lst__itm__info-cont__id-cont">
                <span className="admin__cntnt-sec__lst__itm__info-cont__id-cont__id">{item.id}</span>
              </div>
              <div className="admin__cntnt-sec__lst__itm__info-cont__price-cont">
                <span className="admin__cntnt-sec__lst__itm__info-cont__price-cont__price">{item.price}</span>{' - '}
                <span className="admin__cntnt-sec__lst__itm__info-cont__price-cont__discount">4%</span>
              </div>
              <div className="admin__cntnt-sec__lst__itm__info-cont__toggles-cont">
                <button className="admin__cntnt-sec__lst__itm__info-cont__toggles-cont__delete-btn" aria-label="Delete Item" data-action="delete_button_is_clicked" data-index={i} onClick={handleClick} />
                <button className="admin__cntnt-sec__lst__itm__info-cont__toggles-cont__edit-btn" aria-label="Edit Item" data-action="edit_button_is_clicked" data-index={i} onClick={handleClick} />
              </div> 
            </div>
            <div className="admin__cntnt-sec__lst__itm__edit-cont" data-index={i} ref={el => itemInfoELRefs.current[i] = el}>
              <div className="admin__cntnt-sec__lst__itm__edit-cont__priceTitle-cont">
                <span className="admin__cntnt-sec__lst__itm__edit-cont__priceTitle-cont__price-spn">{en ? 'Price' : 'السعر'}</span>
                <span className="admin__cntnt-sec__lst__itm__edit-cont__priceTitle-cont__priceVal-spn">{item.price}</span>{' / '}
                <span className="admin__cntnt-sec__lst__itm__edit-cont__priceTitle-cont__discountVal-spn">{"5%"}</span>
              </div>
              <div className="admin__cntnt-sec__lst__itm__edit-cont__categoryTitle-cont">
                <span className="admin__cntnt-sec__lst__itm__edit-cont__categoryTitle-cont__category-spn">{en ? 'Category' : 'التصنيف'}</span>
                <span className="admin__cntnt-sec__lst__itm__edit-cont__categoryTitle-cont__categoryVal-spn">{item.category}</span>{' / '}
                <span className="admin__cntnt-sec__lst__itm__edit-cont__categoryTitle-cont__typeVal-spn">{item.type}</span>
              </div>
              <div className="admin__cntnt-sec__lst__itm__edit-cont__nameTitle-cont">
                <span className="admin__cntnt-sec__lst__itm__edit-cont__nameTitle-cont__name-spn">{en ? 'Name' : 'الاسم'}</span>
                <span className="admin__cntnt-sec__lst__itm__edit-cont__nameTitle-cont__enVal-spn">{item.title.en}</span>{' / '}
                <span className="admin__cntnt-sec__lst__itm__edit-cont__nameTitle-cont__arVal-spn">{item.title.ar}</span>
              </div>
              <input className="admin__cntnt-sec__lst__itm__edit-cont__nameEn-inpt" name="titleEn" placeholder={en ? "name in english" : "الاسم بلانجليزي"} />
              <input className="admin__cntnt-sec__lst__itm__edit-cont__nameAr-inpt" name="titleAr" placeholder={en ? "name in arabic" : "الاسم بلعربي"} />
              <input className="admin__cntnt-sec__lst__itm__edit-cont__price-inpt" name="price" placeholder={en ? "price" : "السعر"} />
              <input className="admin__cntnt-sec__lst__itm__edit-cont__discount-inpt" name="discount" placeholder={en ? "discount" : "التخفيض"} />
              <div className="admin__cntnt-sec__lst__itm__edit-cont__itemState-cont" ref={el => itemStateContELRefs.current[i] = el} data-index={i}>
                <input className="admin__cntnt-sec__lst__itm__edit-cont__itemState-cont__inpt" name="state" placeholder={en ? "Item State" : "حاله المنتج"} data-type="item_state_input" data-index={i} readOnly onFocus={handleFocus} onBlur={handleBlur} ref={el => itemStateInptELRefs.current[i] = el} />
                <ul className="admin__cntnt-sec__lst__itm__edit-cont__itemState-cont__lst">
                  <li className="admin__cntnt-sec__lst__itm__edit-cont__itemState-cont__lst__itm" data-index={i} data-action="itemState_option_is_clicked" data-key="available" onClick={handleClick}>{en ? 'Availabe' : 'متاح'}</li>
                  <li className="admin__cntnt-sec__lst__itm__edit-cont__itemState-cont__lst__itm" data-index={i} data-action="itemState_option_is_clicked" data-key="out-of-stock" onClick={handleClick}>{en ? 'Out of stock' : 'غير متوفر'}</li>
                  <li className="admin__cntnt-sec__lst__itm__edit-cont__itemState-cont__lst__itm" data-index={i} data-action="itemState_option_is_clicked" data-key="hidden" onClick={handleClick}>{en ? 'Hidden' : 'مخفي'}</li>
                </ul>
              </div>
              <div className="admin__cntnt-sec__lst__itm__edit-cont__category-cont" ref={el => categoryContELRefs.current[i] = el} data-index={i}>
                <input className="admin__cntnt-sec__lst__itm__edit-cont__category-cont__inpt" name="category" placeholder={en ? "Gategory" : "صنف"} data-type="category_input" data-index={i} readOnly onFocus={handleFocus} onBlur={handleBlur} ref={el => categoryInptELRefs.current[i] = el} />
                <ul className="admin__cntnt-sec__lst__itm__edit-cont__category-cont__lst">
                {menu.map(item => 
                  <li className="admin__cntnt-sec__lst__itm__edit-cont__category-cont__lst__itm" key={item.id} data-index={i} data-action="category_option_is_clicked" data-key={item.key} onClick={handleClick}>{item[lan]}</li>
                )}
                </ul>
              </div>
              <div className="admin__cntnt-sec__lst__itm__edit-cont__type-cont" ref={el => typeContELRefs.current[i] = el} data-index={i}>
                <input className="admin__cntnt-sec__lst__itm__edit-cont__type-cont__inpt" name="type" placeholder={en ? "Type" : "نوع"} data-type="type_input" data-index={i} readOnly onFocus={handleFocus} onBlur={handleBlur} ref={el => typeInptELRefs.current[i] = el} />
                <ul className="admin__cntnt-sec__lst__itm__edit-cont__type-cont__lst" data-index={i} ref={el => typeLstELRefs.current[i] = el}>
                  {addTypeItmtHTML(i)}
                </ul>
              </div>
              <button className="admin__cntnt-sec__lst__itm__edit-cont__save-btn" data-index={i} data-action="save_button_is_clicked" onClick={handleClick}>Save</button>
            </div>
          </li>
          )}
        </ul>
      </section>
    </div>
  )
}

export default Admin;