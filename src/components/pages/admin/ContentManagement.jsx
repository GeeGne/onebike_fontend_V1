// HOOKS
import React, {useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// SCSS
import '/src/styles/components/pages/admin/ContentManagement.scss';

// COMPONENTS
import Alert from '/src/components/Alert';
import BreadCrumb from '/src/components/BreadCrumb';

// STORE
import { useDataStore } from '/src/store/store';

// FIREBASE
import { auth } from "/src/firebase/authSignUp";
import { signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { db} from '/src/firebase/fireStore';
import { getDoc, doc, collection, getDocs} from 'firebase/firestore';

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
  const optionsContELRefs = useRef([]);

  const en = lan === 'en';
  const navigate = useNavigate();
  const redirector = new Redirector(navigate);

  useEffect(() => {
    redirector.admin(user, userData);
  }, [userData]);

  console.log('user', user);
  console.log('userData', userData);
  console.log('itemELRefs', itemELRefs.current);

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
        } else {
          getEL(itemELRefs.current).style.maxHeight = String( totalHeight(getEL(itemEditELRefs.current)) ) + 'px';
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
        getEL(optionsContELRefs.current).classList.add('focus');
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
        setTimeout(() => getEL(optionsContELRefs.current).classList.remove('focus'), 50);
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
          {array.map((item, i) => 
          <li className="cm__cntnt-sec__lst__itm" key={i} data-index={i} ref={el => itemELRefs.current[i] = el}>
            <div className="cm__cntnt-sec__lst__itm__info-cont" data-index={i} ref={el => itemEditELRefs.current[i] = el}>
              <div className="cm__cntnt-sec__lst__itm__info-cont__cont">
                <img className="cm__cntnt-sec__lst__itm__info-cont__cont__img" src={img} />
                <span className="cm__cntnt-sec__lst__itm__info-cont__cont__title">{en ? "GIYO Small Bike tire Pump Schrader" : 'منفاخ هوائي متنقل'}</span>
              </div>
                <div className="cm__cntnt-sec__lst__itm__info-cont__cont">
                <span className="cm__cntnt-sec__lst__itm__info-cont__cont__id">FJjo3$%jfa#@</span>
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
              <span className="cm__cntnt-sec__lst__itm__edit-cont__name-spn">{en ? 'Name' : 'الاسم'}</span>
              <input className="cm__cntnt-sec__lst__itm__edit-cont__nameEn-inpt" placeholder="name in english" />
              <input className="cm__cntnt-sec__lst__itm__edit-cont__nameAr-inpt" placeholder="name in arabic" />
              <span className="cm__cntnt-sec__lst__itm__edit-cont__price-spn">{en ? 'Price' : 'السعر'}</span>
              <input className="cm__cntnt-sec__lst__itm__edit-cont__price-inpt" placeholder="price" />
              <input className="cm__cntnt-sec__lst__itm__edit-cont__discount-inpt" placeholder="discount" />
              <div className="cm__cntnt-sec__lst__itm__edit-cont__options-cont" ref={el => optionsContELRefs.current[i] = el} data-index={i}>
                <input className="cm__cntnt-sec__lst__itm__edit-cont__options-cont__inpt" placeholder="Item State" data-type="item_state_input" data-index={i} readOnly onFocus={handleFocus} onBlur={handleBlur} />
                <ul className="cm__cntnt-sec__lst__itm__edit-cont__options-cont__lst">
                  <li className="cm__cntnt-sec__lst__itm__edit-cont__options-cont__lst__itm">{en ? 'Availabe' : 'متاح'}</li>
                  <li className="cm__cntnt-sec__lst__itm__edit-cont__options-cont__lst__itm">{en ? 'Out of stock' : 'غير متوفر'}</li>
                  <li className="cm__cntnt-sec__lst__itm__edit-cont__options-cont__lst__itm">{en ? 'Hidden' : 'مخفي'}</li>
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