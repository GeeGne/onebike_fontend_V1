// HOOKS
import React, {useEffect, useRef, useState} from 'react';

// SCSS
import '/src/styles/components/pages/admin/AddProductWindow.scss';

// COMPONENTS
import DisplayWebImg from '/src/components/DisplayWebImg';
import Alert from '/src/components/Alert';
import ProgressActivity from '/src/components/ProgressActivity';

// JSON
import menu from '/src/data/menu.json';

// FIREBASE
import { db } from '/src/firebase/fireStore';
import { getDoc, doc, collection, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { storage } from '/src/firebase/storage';

// STORE
import { useDataStore } from '/src/store/store';

function AddProductWindow ({toggle, toggleData, darkMode, lan}) {

  const { user, userData, products, setRefreshProducts } = useDataStore();
  const [ typeItmKey, setTypeItmArray ] = useState("");
  const [ newAlert, setNewAlert ] = useState(0);
  const [ alertText, setAlertText ] = useState(null);
  const [ activity, setActivity ] = useState(false);

  const itemEL = useRef([]);
  const itemInfoEL = useRef([]);
  const itemEditEL = useRef([]);

  const titleEnInptEL = useRef([]);
  const titleArInptEL = useRef([]);
  const priceInptEL = useRef([]);
  const discountInptEL = useRef([]);

  const itemStateContEL = useRef([]);
  const itemStateInptEL = useRef([]);

  const categoryContEL = useRef([]);
  const categoryInptEL = useRef([]);
  
  const typeContEL = useRef([]);
  const typeLstEL = useRef([]);
  const typeInptEL = useRef([]);

  const overflowTimerId = useRef(null);

  const en = lan === 'en';
  const addTypeItmtHTML = () => {

    if (typeItmKey) {

      console.log(typeItmKey[i])
      const getTheCategory = menu.find(list => list.key === typeItmKey);
      const getTypes = getTheCategory.secondaryList.forEach(list => list.thirdList.forEach(list => array = [...array, list]));

      return array.map((item, index) => 
        <li className="productWindow__edit-cont__type-cont__lst__itm" key={index} data-index={i} data-action="type_option_is_clicked" data-key={item.key} onClick={handleClick}>{item[lan]}</li>
      ) 

    } else {
      return <li className="productWindow__edit-cont__type-cont__lst__itm">{en ? 'Please Select a Category' : 'الرجاء اختيار صنف'}</li> 
    }
  }

  const renderLoadingState = textContent => {
    if (activity) {
      return <ProgressActivity darkMode={darkMode} invert={true} />
    } else {
      return textContent;
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
  const getProductImgURL = product => `/assets/img/products/${product.category}/${product.type}/${product.id + '-' + product.color}-front.webp`;
  // const getProductPrice = product => formatNumberWithCommas(calculatePrice(product.price, product.discount));
  // const isProductInWishlist = product => wishlist.some(item => item.id === product.id);

  const saveProductChanges = async (productId, productData) => {
    setActivity(true);

    try {
      const productRef = doc(db, "products", String(productId));
      await updateDoc(productRef, productData);
      setRefreshProducts(Math.random());
      setAlertText(en ? 'Success! changes has been saved to the product' : 'تم حفظ التغييرات على المنتج بنجاح!')
    } catch(err) {
      console.error('Error updating product: ', err);
      setAlertText(en ? 'Error updaing product' : 'حصل خطأ في تعديل المنتج')
    }

    setNewAlert(Math.random());
    setActivity(false);
  }
  
  // console.log('user', user);
  // console.log('userData', userData);
  // console.log('itemEL', itemEL.current);
  // console.log('products', products);
  // console.log('typeItmKey', typeItmKey);

  const handleClick = e => {
    const { action, index, key, productId } = e.currentTarget.dataset;

    const findElement = ref => ref.filter(el => Number(el.dataset.index) === Number(index))[0];
    const isELClicked = el => el.classList.contains('clicked');
    const totalHeight = el => el.scrollHeight;
    const getProduct = () => products.filter(item => item.id === Number(productId))[0];
    const getTextContent = el => el.textContent;

    switch(action) {
      case 'itemState_option_is_clicked':
        itemStateInptEL.current.value = getTextContent(e.currentTarget);
        itemStateInptEL.current.dataset.key = key;
        break;
      case 'category_option_is_clicked':
        categoryInptEL.current.value = getTextContent(e.currentTarget);
        categoryInptEL.current.dataset.key = key;
        setTypeItmArray(prevArr => [...prevArr.filter(item => item.index !== Number(index)), {index: Number(index), key}]);
        typeInptEL.current.value = '';
        break;
      case 'type_option_is_clicked':
        typeInptEL.current.value = getTextContent(e.currentTarget);
        typeInptEL.current.dataset.key = key;
        break;
      case 'add_product_button_is_clicked':
        typeInptEL.current.value = getTextContent(e.currentTarget);
        typeInptEL.current.dataset.key = key;
        break;
      case 'save_button_is_clicked':

        const productData = {
          title: {
            en: titleEnInptEL.current.value || getProduct().title.en,
            ar: titleArInptEL.current.value || getProduct().title.ar,
          },
          category: categoryInptEL.current.value || getProduct().category,
          type: categoryInptEL.current.value || getProduct().type,
          color: 'black',
          state: findElement(itemStateInptEL.current).dataset.key || getProduct().state,
          brand: '',
          price: Number(priceInptEL.current.value) || getProduct().price,
          discount: discountInptEL.current.value.includes('%') 
            ? discountInptEL.current.value
            : Number(discountInptEL.current.value) || getProduct().discount,
        }

        saveProductChanges(Number(productId), productData);
        break;
      default:
        console.error('Error: unknown action: ', action);
    }
  }

  const handleFocus = e => {
    const {type, index} = e.currentTarget.dataset;

    switch (type) {
      case 'item_state_input':
        itemStateContEL.current.classList.add('focus');
        break;
      case 'category_input':
        categoryContEL.current.classList.add('focus');
        break;
      case 'type_input':
        typeContEL.current.classList.add('focus');
        break;
      default:
        console.error('Error: unknown type: ', type)
    }
  }

  const handleBlur = e => {
    const {type, index} = e.currentTarget.dataset;
    const isELClicked = el => el.classList.contains('clicked');
    const totalHeight = el => el.scrollHeight

    switch (type) {
      case 'item_state_input':
        setTimeout(() => itemStateContEL.current.classList.remove('focus'), 100);
        break;
      case 'category_input':
        setTimeout(() => categoryContEL.current.classList.remove('focus'), 100);
        break;
      case 'type_input':
        setTimeout(() => typeContEL.current.classList.remove('focus'), 100);
        break;
      default:
        console.error('Error: unknown type: ', type)
    }    
  }

  return (
    <div className={`productWindow${toggle ? ' show' : ' hide'}`} onClick={() => toggleData(!toggle)}>
      <div className="productWindow__edit-cont" ref={itemEditEL}>
        <div className="productWindow__edit-cont__priceTitle-cont">
          <span className="productWindow__edit-cont__priceTitle-cont__price-spn">{en ? 'Price' : 'السعر'}</span>
          <span className="productWindow__edit-cont__priceTitle-cont__priceVal-spn">200</span>{' / '}
          <span className="productWindow__edit-cont__priceTitle-cont__discountVal-spn">{"5%"}</span>
        </div>
        <div className="productWindow__edit-cont__categoryTitle-cont">
          <span className="productWindow__edit-cont__categoryTitle-cont__category-spn">{en ? 'Category' : 'التصنيف'}</span>
          <span className="productWindow__edit-cont__categoryTitle-cont__categoryVal-spn">resr</span>{' / '}
          <span className="productWindow__edit-cont__categoryTitle-cont__typeVal-spn">ser</span>
        </div>
        <div className="productWindow__edit-cont__nameTitle-cont">
          <span className="productWindow__edit-cont__nameTitle-cont__name-spn">{en ? 'Name' : 'الاسم'}</span>
          <span className="productWindow__edit-cont__nameTitle-cont__enVal-spn">ser</span>{' / '}
          <span className="productWindow__edit-cont__nameTitle-cont__arVal-spn">ser</span>
        </div>
        <input className="productWindow__edit-cont__nameEn-inpt" name="titleEn" placeholder={en ? "name in english" : "الاسم بلانجليزي"} ref={titleEnInptEL} />
        <input className="productWindow__edit-cont__nameAr-inpt" name="titleAr" placeholder={en ? "name in arabic" : "الاسم بلعربي"} ref={titleArInptEL} />
        <input className="productWindow__edit-cont__price-inpt" name="price" placeholder={en ? "price" : "السعر"} ref={priceInptEL} />
        <input className="productWindow__edit-cont__discount-inpt" name="discount" placeholder={en ? "discount" : "التخفيض"} ref={discountInptEL} />
        <div className="productWindow__edit-cont__itemState-cont" ref={itemStateContEL}>
          <input className="productWindow__edit-cont__itemState-cont__inpt" name="state" placeholder={en ? "Item State" : "حاله المنتج"} data-type="item_state_input" readOnly onFocus={handleFocus} onBlur={handleBlur} ref={itemStateInptEL} />
          <ul className="productWindow__edit-cont__itemState-cont__lst">
            <li className="productWindow__edit-cont__itemState-cont__lst__itm" data-action="itemState_option_is_clicked" data-key="available" onClick={handleClick}>{en ? 'Availabe' : 'متاح'}</li>
            <li className="productWindow__edit-cont__itemState-cont__lst__itm" data-action="itemState_option_is_clicked" data-key="out-of-stock" onClick={handleClick}>{en ? 'Out of stock' : 'غير متوفر'}</li>
            <li className="productWindow__edit-cont__itemState-cont__lst__itm" data-action="itemState_option_is_clicked" data-key="hidden" onClick={handleClick}>{en ? 'Hidden' : 'مخفي'}</li>
          </ul>
        </div>
        <div className="productWindow__edit-cont__category-cont" ref={categoryContEL}>
          <input className="productWindow__edit-cont__category-cont__inpt" name="category" placeholder={en ? "Gategory" : "صنف"} data-type="category_input" readOnly onFocus={handleFocus} onBlur={handleBlur} ref={categoryInptEL} />
          <ul className="productWindow__edit-cont__category-cont__lst">
          {menu.map(item => 
            <li className="productWindow__edit-cont__category-cont__lst__itm" key={item.id} data-action="category_option_is_clicked" data-key={item.key} onClick={handleClick}>{item[lan]}</li>
          )}
          </ul>
        </div>
        <div className="productWindow__edit-cont__type-cont" ref={typeContEL}>
          <input className="productWindow__edit-cont__type-cont__inpt" name="type" placeholder={en ? "Type" : "نوع"} data-type="type_input" readOnly onFocus={handleFocus} onBlur={handleBlur} ref={typeInptEL} />
          <ul className="productWindow__edit-cont__type-cont__lst" ref={typeLstEL}>
            {addTypeItmtHTML()}
          </ul>
        </div>
        <button className="productWindow__edit-cont__save-btn" data-action="save_button_is_clicked" onClick={handleClick}>{renderLoadingState(en ? 'Save' : 'حفظ')}</button>
      </div>
    </div>
  )
}

export default AddProductWindow;