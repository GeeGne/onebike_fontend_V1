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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// STORE
import { useDataStore } from '/src/store/store';

// NANOID
import { nanoid } from 'nanoid';

function AddProductWindow ({toggle, toggleData, darkMode, lan}) {

  const { user, userData, products, setRefreshProducts } = useDataStore();
  const [ productSrc, setProductSrc ] = useState("");
  const [ typeItmKey, setTypeItmKey ] = useState("");
  const [ newAlert, setNewAlert ] = useState(0);
  const [ alertText, setAlertText ] = useState(null);
  const [ activity, setActivity ] = useState(false);
  const imgFile = useRef(null);

  const itemEL = useRef(null);
  const itemInfoEL = useRef(null);
  const itemEditEL = useRef(null);
  const productImgEL = useRef(null);

  const titleEnInptEL = useRef(null);
  const titleArInptEL = useRef(null);
  const priceInptEL = useRef(null);
  const discountInptEL = useRef(null);
  const imgUploadInptEL = useRef(null);

  const itemStateContEL = useRef(null);
  const itemStateInptEL = useRef(null);

  const categoryContEL = useRef(null);
  const categoryInptEL = useRef(null);
  
  const typeContEL = useRef(null);
  const typeLstEL = useRef(null);
  const typeInptEL = useRef(null);

  const en = lan === 'en';
  const addTypeItmtHTML = () => {

    if (typeItmKey) {
      let array = [];
      const getTheCategory = menu.find(list => list.key === typeItmKey);
      const getTypes = getTheCategory.secondaryList.forEach(list => list.thirdList.forEach(list => array = [...array, list]));
      
      return array.map((item, index) => 
        <li className="productWindow__edit-cont__type-cont__lst__itm" key={index} data-action="type_option_is_clicked" data-key={item.key} onClick={handleClick}>{item[lan]}</li>
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

  const clearInputs = () => {
    titleEnInptEL.current.value = '';
    titleArInptEL.current.value = '';
    priceInptEL.current.value = '';
    discountInptEL.current.value = '';
    categoryInptEL.current.value = '';
    typeInptEL.current.value = '';
    itemStateInptEL.current.value = '';
    imgUploadInptEL.current.value = '';
    setProductSrc("");
    imgFile.current = null;
  }

  const addNewProductData = async (productId, productData) => {
    setActivity(true);

    try {
      const productRef = doc(db, "products", productData.id);
      await setDoc(productRef, productData);

      const storageRef = ref(storage, getProductImgURL(productData));
      await uploadBytes(storageRef, imgFile.current);
  
      clearInputs();
      toggleData(' hide');
      setRefreshProducts(Math.random());
      setAlertText(en ? 'Success! new Product is added to the could' : 'تم اضافه منتج جديد  بنجاج!')
    } catch(err) {
      console.error('Error updating product: ', err);
      setAlertText(en ? 'Error adding updaing product' : 'حصل خطأ في اضافه المنتج')
    }  

    setNewAlert(Math.random());
    setActivity(false);
  }
  
  const handleClick = e => {
    const { action, key, productId } = e.currentTarget.dataset;
    const getTextContent = el => el.textContent;

    switch(action) {
      case 'close_window':
        toggleData(' hide')
        break;
      case 'itemState_option_is_clicked':
        itemStateInptEL.current.value = getTextContent(e.currentTarget);
        itemStateInptEL.current.dataset.key = key;
        break;
      case 'category_option_is_clicked':
        categoryInptEL.current.value = getTextContent(e.currentTarget);
        categoryInptEL.current.dataset.key = key;
        setTypeItmKey(key);
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
      case 'add_button_is_clicked':
        const productData = {
          id: nanoid(12),
          title: {
            en: titleEnInptEL.current.value || 'No Title exist for this product',
            ar: titleArInptEL.current.value || 'لايوجد اسم لهذا المنتج',
          },
          category: categoryInptEL.current.dataset.key || 'accessories',
          type: typeInptEL.current.dataset.key || 'lights',
          color: 'black',
          state: itemStateInptEL.current.dataset.key || 'hidden',
          brand: '',
          price: Number(priceInptEL.current.value) || '1000',
          discount: discountInptEL.current.value.includes('%') 
            ? discountInptEL.current.value
            : Number(discountInptEL.current.value) || 0,
        }
        // console.log(productData);
        addNewProductData(productId, productData);
        break;
      default:
        console.error('Error: unknown action: ', action);
    }
  }

  const handleFocus = e => {
    const { type } = e.currentTarget.dataset;

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

  const handleChange = e => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'imgUpload_input':
        const previewImage = () => {
          const file = e.currentTarget.files[0];
          const reader = new FileReader();
          reader.onloadend = function () {
            setProductSrc(reader.result);
          }
  
          file ? reader.readAsDataURL(file) : setProductSrc('');
          imgFile.current = file;
        }

        previewImage();
        break;
      default:
        console.error('Error: unknown type: ', type);
    }
  }

  // console.log('user', user);
  // console.log('userData', userData);
  // console.log('itemEL', itemEL.current);
  // console.log('products', products);
  // console.log('typeItmKey', typeItmKey);

  return (
    <div className={`productWindow${toggle}`} data-action="close_window" onClick={handleClick}>
      <Alert alertText={alertText} newAlert={newAlert} />
      <div className="productWindow__edit-cont" ref={itemEditEL} onClick={e => e.stopPropagation()}>
        <div className="productWindow__edit-cont__img-cont">
          <div className="productWindow__edit-cont__img-cont__img-wrapper">
            <input className="productWindow__edit-cont__img-cont__img-wrapper__imgUpload-inpt" type="file" id="file-input" accept="image/*" data-type="imgUpload_input" onChange={handleChange} ref={imgUploadInptEL} />
            <img className={`productWindow__edit-cont__img-cont__img-wrapper__img${productSrc ? '' : ' hide'}`} src={productSrc} ref={productImgEL} />
          </div>
        </div>
        <div className="productWindow__edit-cont__priceTitle-cont">
          <span className="productWindow__edit-cont__priceTitle-cont__price-spn">{en ? 'Price' : 'السعر'}</span>
        </div>
        <div className="productWindow__edit-cont__categoryTitle-cont">
          <span className="productWindow__edit-cont__categoryTitle-cont__category-spn">{en ? 'Category' : 'التصنيف'}</span>
        </div>
        <div className="productWindow__edit-cont__nameTitle-cont">
          <span className="productWindow__edit-cont__nameTitle-cont__name-spn">{en ? 'Name' : 'الاسم'}</span>
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
        <button className="productWindow__edit-cont__save-btn" data-action="add_button_is_clicked" onClick={handleClick}>{renderLoadingState(en ? 'Add' : 'اضافه')}</button>
      </div>
    </div>
  )
}

export default AddProductWindow;