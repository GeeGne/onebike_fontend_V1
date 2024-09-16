// HOOKS
import React, {useState, useEffect, useRef, useReducer} from 'react';

// SCSS
import '/src/styles/components/pages/admin/GeneralSettingsTable.scss';

// COMPONENTS
import DisplayWebImg from '/src/components/DisplayWebImg';
import DisplayImg from '/src/components/DisplayImg';
import Alert from '/src/components/Alert';
import ProgressActivity from '/src/components/ProgressActivity';
import ProgressWindowActivity from '/src/components/ProgressWindowActivity';

// STORES
import { useDataStore } from '/src/store/store'; 

// REDUCERS
import editAltWindowReducer from '/src/reducers/editAltWindowReducer';
import editSiteDetailsWindowReducer from '/src/reducers/editSiteDetailsWindowReducer';

// FIREBASE
import { db} from '/src/firebase/fireStore';
import { getDoc, deleteDoc, setDoc, doc, collection, updateDoc, getDocs, writeBatch } from 'firebase/firestore';
import { storage } from '/src/firebase/storage';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// NANOID
import { nanoid } from 'nanoid';

// UTILS
import formatPhoneNumber from '/src/utils/formatPhoneNumber.js';

// ASSETS
import infoIcon from '/assets/img/icons/info.svg';
import infoDarkModeIcon from '/assets/img/icons/info_darkMode.svg';
import emptyImgURL from '/assets/img/empty/empty.webp';
import mailIcon from '/assets/img/icons/mail.svg';
import mailDarkModeIcon from '/assets/img/icons/mail_darkMode.svg';
import callIcon from '/assets/img/icons/call.svg';
import callDarkModeIcon from '/assets/img/icons/call_darkMode.svg';
import whatsappIcon from '/assets/img/icons/whatsapp.svg';
import whatsappDarkModeIcon from '/assets/img/icons/whatsapp_darkMode.svg';
import facebookIcon from '/assets/img/icons/facebook.svg';
import facebookDarkModeIcon from '/assets/img/icons/facebook_darkMode.svg';
import instagramIcon from '/assets/img/icons/instagram.svg';
import instagramDarkModeIcon from '/assets/img/icons/instagram_darkMode.svg';
import linkIcon from '/assets/img/icons/link.svg';
import linkDarkModeIcon from '/assets/img/icons/link_darkMode.svg';


function GeneralSettingsTable ({darkMode, lan}) {

  const { 
    homePageBannersData, 
    setHomePageBannersData, 
    setRefreshHomePageBannersData, 
    websiteDetailsData,
    setRefreshWebsiteDetailsData
  } = useDataStore();
  const [ newAlert, setNewAlert ] = useState(0);
  const [ alertText, setAlertText ] = useState(null);
  const [ editAltWindow, dispatch ] = useReducer(editAltWindowReducer, {
    toggle: '',
    alt: '',
    id: '',
  });
  const [ editSiteDetails, dispatchSiteDetails ] = useReducer(editSiteDetailsWindowReducer, { toggle: '' });
  const [ activity, setActivity ] = useState(false);
  const [ windowActivity, setwindowActivity ] = useState('');

  const imgBannerFile = useRef(null);
  const altInputEL = useRef(null);

  const emailInputEL = useRef(null);
  const phoneInputEL = useRef(null);
  const whatsAppInputEL = useRef(null);
  const facebookInputEL = useRef(null);
  const instagramInputEL = useRef(null);

  const en = lan === 'en';
  const getBannerImgURL = item => `/assets/img/banners/homepage/${item.id}.webp`;
  const clearAltInputValue = () => altInputEL.current.value = "";
  const clearSiteDetailsInputValues = () => {
    emailInputEL.current.value = "";
    phoneInputEL.current.value = "";
    whatsAppInputEL.current.value = "";
    facebookInputEL.current.value = "";
    instagramInputEL.current.value = "";
  }


  const deleteBannersData = async () => {
    try {
      const bannersCollection = collection(db, 'homePageBanners');
      const snapshot = await getDocs(bannersCollection);

      const batch = writeBatch(db);

      snapshot.forEach(async banner => {
        const bannersRef = doc(db, 'homePageBanners', banner.id);
        batch.delete(bannersRef)
      });

      await batch.commit();

    } catch (error) {
      console.error('Error: couldn\'t delete Bannsers Data: ', error);
    }
  }
  const updateBannersOrderData = async newBanners => {

    setwindowActivity(' show');

    try {
      // await deleteBannersData();

      const addBannerPromises = newBanners.map(banner => {
        const docRef = doc(db, 'homePageBanners', banner.id);
        return setDoc(docRef, banner);
      });

      await Promise.all(addBannerPromises);

      // setHomePageBannersData([]);
      setRefreshHomePageBannersData(Math.random());
      setAlertText(en ? 'Banners order has been changed successfully!' : 'تم تغيير ترتيب اللافتات بنجاح!');
    } catch (error) {
      console.error('Error: couldn\'t update Bannsers Data: ', error);
      setAlertText(en ? 'Error has been occured while changing the the order of the Banners' : 'حدث خطأ أثناء تغيير ترتيب اللافتات')
    } finally {
      setNewAlert(Math.random());
      setwindowActivity(' hide');
    }
  }

  const updateBannerAltData = async (documentID, alt) => {
    
    setActivity(true);

    try {
      const docRef = doc(db, 'homePageBanners', documentID);
      await updateDoc(docRef, { alt });

      dispatch({type: 'alt_data_is_updated'})
      setRefreshHomePageBannersData(Math.random());
      clearAltInputValue();

      setAlertText(en ? 'Banner alt has been updated successfully!' : 'تم تحديث النص البديل للافتة بنجاح!');
    } catch (error) {
      console.error('Error: couldn\'t update alt data: ', error);
      setAlertText(en ? 'An error has occurred while updating the banner\'s alt' : 'حدث خطأ أثناء تحديث النص البديل للافتة');
    } finally {
      setNewAlert(Math.random());
      setActivity(false);
    }
  };

  const addNewBannerData = async (refID, bannerData) => {
    
    setwindowActivity(' show');

    try {
      const docRef = doc(db, 'homePageBanners', refID);
      await setDoc(docRef, bannerData);

      if (!imgBannerFile.current) imgBannerFile.current = await fetchEmptyImgAsBlob(emptyImgURL);
      const storageRef = ref(storage, getBannerImgURL(bannerData));
      await uploadBytes(storageRef, imgBannerFile.current);

      setRefreshHomePageBannersData(Math.random());
      setAlertText(en ? 'Success! new Banner is added to the cloud' : 'تم اضافه لافته جديده بنجاج!')
    } catch (error) {
      console.error('Error: couldn\'t add Banner Data: ', error);
      setAlertText(en ? 'Error adding new Banner' : 'حصل خطأ في اضافه لافته');
    } finally {
      setNewAlert(Math.random());
      setwindowActivity(' hide');
    }
  };

  const deleteBannerData = async (bannerID) => {
    
    setwindowActivity(' show');
    
    try {
      const docRef = doc(db, 'homePageBanners', bannerID);
      await deleteDoc(docRef);
      
      setRefreshHomePageBannersData(Math.random());
      setAlertText(en ? 'Success! Banner is deleted successfully' : 'تم حذف الافته بنجاج!');
    } catch (error) {
      console.error('Error: couldn\' delete Banner: ', error);
      setAlertText(en ? 'An error has occured while deleting the Banner' : 'حدث خطأ أثناء حذف اللافته');
    } finally {
      setNewAlert(Math.random());
      setwindowActivity(' hide');
    }
  }

  const updateSiteDetailsData = async newData => {
    
    setActivity(true);

    try {
      const docRef = doc(db, 'websiteDetails', 'onebike');
      await updateDoc(docRef, newData);

      dispatchSiteDetails({type: 'websiteDetails_data_is_updated'});
      clearSiteDetailsInputValues();
      setRefreshWebsiteDetailsData(Math.random());
      setAlertText(en ? 'Success! Website Details are updated successfully' : 'نجاح! تم تحديث تفاصيل الموقع بنجاح')
    } catch (error) {
      console.error('Error: couldn\'t add Banner Data: ', error);
      setAlertText(en ? 'Error updating Website Details' : 'خطأ في تحديث تفاصيل الموقع');
    } finally {
      setNewAlert(Math.random());
      setActivity(false);
    }
  };

  const renderLoadingState = textContent => {

    if (activity) {
      return <ProgressActivity darkMode={darkMode} invert={false} />
    } else {
      return textContent;
    } 
  };

  const fetchEmptyImgAsBlob = async imgUrl => {
    try {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      return blob;
    } catch(error) {
      console.error('Error: fetching image: ', error);
    }
  }

  const handleClick = e => {
    const {action, index, bannerId, alt} = e.currentTarget.dataset;
    const newArray = [...homePageBannersData];
    const addOrders = array => array.map((item, i) => ({...item, order: i + 1}));

    switch (action) {
      case 'move_img_to_previous':
        if (Number(index) > 0) {
          [newArray[Number(index)], newArray[Number(index) - 1]] = [newArray[Number(index) - 1], newArray[Number(index)]];
          updateBannersOrderData(addOrders(newArray));
        }
        break;
      case 'move_img_to_next':
        if (Number(index) < newArray.length - 1) {
          [newArray[Number(index)], newArray[Number(index) + 1]] = [newArray[Number(index) + 1], newArray[Number(index)]];
          updateBannersOrderData(addOrders(newArray));
        }
        break;
      case 'window_background_is_clicked':
      case 'cancel_window_button_is_clicked':
        clearAltInputValue();
        dispatch({ type: action });
        break;
      case 'siteDetails_window_background_is_clicked':
      case 'cancel_siteDetails_window_button_is_clicked':
        dispatchSiteDetails({ type: action });
        break;
      case 'save_window_button_is_clicked':
        updateBannerAltData(bannerId, alt);
        break;
      case 'save_siteDetails_window_button_is_clicked':
        const { toggle, ...inputsValues } = editSiteDetails;
        updateSiteDetailsData(inputsValues);
        break;
      case 'edit_alt_button_is_clicked':
        dispatch({ type: action, id: bannerId });
        break;
      case 'delete_banner_img':
        deleteBannerData(bannerId);
        break;
      case 'edit_siteDetails_button_is_clicked':
        dispatchSiteDetails({ type: action });
        break;
      default:
        console.error('Error: unknown action: ', action);
    }
  }

  const handleChange = e => {
    const { name , value } = e.currentTarget;

    switch (name) {
      case 'alt':
        dispatch({type: 'add_alt_data', name: name, value: value.trim()});
        break;
      case 'imgUpload':
        const file = e.currentTarget.files[0];
        imgBannerFile.current = file || fetchEmptyImgAsBlob(emptyImgURL);

        const bannerData = {id: nanoid(12), alt: '', order: homePageBannersData.length + 1};
        addNewBannerData(bannerData.id, bannerData);
        break;
      case'email':
      case'phone':
      case'whatsApp':
      case'facebook':
      case'instagram':
        dispatchSiteDetails({ type: 'add_inputs_values', name, value: value.trim() });
        break;
      default:
        console.error('Error: unknown name: ', name);
    }
  }

  return (
    <div className="gs">
      <Alert alertText={alertText} newAlert={newAlert} />
      <ProgressWindowActivity darkMode={darkMode} windowActivity={windowActivity} invert={false} />
      <div className={`gs__editAlt-window${editAltWindow.toggle}`} data-action="window_background_is_clicked" onClick={handleClick}>
        <div className="gs__editAlt-window__wrapper" data-action="window_wrapper_is_clicked" onClick={e => e.stopPropagation()}>
          <h2 className="gs__editAlt-window__wrapper__title">{en ? 'Set alt' : 'ادخل alt'}</h2>
          <input className="gs__editAlt-window__wrapper__inpt" name="alt" placeholder="example: bicycle on a hilly snow" onChange={handleChange} ref={altInputEL} />
          <button className="gs__editAlt-window__wrapper__cancel-btn" data-action="cancel_window_button_is_clicked" onClick={handleClick}>{en ? 'Cancel' : 'الغاء'}</button>
          <button className="gs__editAlt-window__wrapper__save-btn" data-banner-id={editAltWindow.id} data-alt={editAltWindow.alt} data-action="save_window_button_is_clicked" onClick={handleClick}>{renderLoadingState(en ? 'Save' : 'حفظ')}</button>          
        </div>
      </div>
      <div className={`gs__editSiteDetails-window${editSiteDetails.toggle}`} data-action="siteDetails_window_background_is_clicked" onClick={handleClick}>
        <div className="gs__editSiteDetails-window__wrapper" data-action="siteDetails_window_wrapper_is_clicked" onClick={e => e.stopPropagation()}>
          <h2 className="gs__editSiteDetails-window__wrapper__title">{en ? 'Edit Website Details' : 'تعديل معلومات الصفحه'}</h2>
          <label className="gs__editSiteDetails-window__wrapper__email-lbl" htmlFor="email">
            <DisplayImg src={darkMode ? mailDarkModeIcon : mailIcon }/>
            <span>{en ? 'Email' : 'البريد الاكتروني'}</span>
          </label>
          <input className="gs__editSiteDetails-window__wrapper__email-inpt" id="email" name="email" placeholder={websiteDetailsData.email} onChange={handleChange} ref={emailInputEL} />
          <label className="gs__editSiteDetails-window__wrapper__phone-lbl" htmlFor="phone">
            <DisplayImg src={darkMode ? callDarkModeIcon : callIcon }/>
            <span>{en ? 'Phone': 'رقم الهاتف'}</span>
          </label>
          <input className="gs__editSiteDetails-window__wrapper__phone-inpt" id="phone" name="phone" placeholder={websiteDetailsData.phone} onChange={handleChange} ref={phoneInputEL} />
          <label className="gs__editSiteDetails-window__wrapper__whatsApp-lbl" htmlFor="whatsApp">
            <DisplayImg src={darkMode ? whatsappDarkModeIcon : whatsappIcon }/>
            <span>{en ? 'Whatsapp Link' : 'رابط الواتساب'}</span>
          </label>
          <input className="gs__editSiteDetails-window__wrapper__whatsApp-inpt" id="whatsApp" name="whatsApp" placeholder={websiteDetailsData.whatsApp} onChange={handleChange} ref={whatsAppInputEL} />
          <label className="gs__editSiteDetails-window__wrapper__facebook-lbl" htmlFor="facebook">
            <DisplayImg src={darkMode ? facebookDarkModeIcon : facebookIcon }/>
            <span>{en ? 'Facebook Link' : 'رابط الفيسبوك'}</span>
          </label>
          <input className="gs__editSiteDetails-window__wrapper__facebook-inpt" id="facebook" name="facebook" placeholder={websiteDetailsData.facebook} onChange={handleChange} ref={facebookInputEL} />
          <label className="gs__editSiteDetails-window__wrapper__instagram-lbl" htmlFor="instagram">
            <DisplayImg src={darkMode ? instagramDarkModeIcon : instagramIcon }/>
            <span>{en ? 'Instagram Link' : 'رابط الانستغرام'}</span>
          </label>
          <input className="gs__editSiteDetails-window__wrapper__instagram-inpt" id="instagram" name="instagram" placeholder={websiteDetailsData.instagram} onChange={handleChange} ref={instagramInputEL} />
          <button className="gs__editSiteDetails-window__wrapper__cancel-btn" data-action="cancel_siteDetails_window_button_is_clicked" onClick={handleClick}>{en ? 'Cancel' : 'الغاء'}</button>
          <button className="gs__editSiteDetails-window__wrapper__save-btn" data-action="save_siteDetails_window_button_is_clicked" onClick={handleClick}>{renderLoadingState(en ? 'Save' : 'حفظ')}</button>          
        </div>
      </div>
      <section className="gs__banners-sec">
        <h2 className="gs__banners-sec__title">{en ? 'Banners (Home Page)' : 'اللافتات (الصفحة الرئيسية)'}</h2>
        <ul className="gs__banners-sec__lst">
        {homePageBannersData?.map((itm, i) => 
          <li className="gs__banners-sec__lst__itm" key={i}>
            <span className="gs__banners-sec__lst__itm__count">{i + 1}</span>
            <button className="gs__banners-sec__lst__itm__up-arrow-btn" aria-label="move image to previous" data-index={i} data-action="move_img_to_previous" onClick={handleClick} />
            <button className="gs__banners-sec__lst__itm__down-arrow-btn" aria-label="move image to next" data-index={i} data-action="move_img_to_next" onClick={handleClick} />
            <div className="gs__banners-sec__lst__itm__alt-wrapper">
              <span className="gs__banners-sec__lst__itm__alt-wrapper__title">Alt</span>
              <button className="gs__banners-sec__lst__itm__alt-wrapper__btn" data-banner-id={itm.id} data-action="edit_alt_button_is_clicked" onClick={handleClick} />     
              <img className="gs__banners-sec__lst__itm__alt-wrapper__img" src={darkMode ? infoDarkModeIcon : infoIcon} /> 
              <span className="gs__banners-sec__lst__itm__alt-wrapper__description">{itm.alt}</span>
            </div>
            <button className="gs__banners-sec__lst__itm__delete-btn" aria-label="delte image" data-banner-id={itm.id} data-action="delete_banner_img" onClick={handleClick} >
              <DisplayWebImg className="gs__banners-sec__lst__itm__delete-btn__img" src={getBannerImgURL(itm)} loading="lazy" role="button" />
            </button>
          </li>        
        )}
        </ul>
        <div className="gs__banners-sec__wrapper">
          <input className="gs__banners-sec__wrapper__add-inpt" type="file" accept="image/*" name="imgUpload" onChange={handleChange} />
        </div>
      </section>
      <section className="gs__siteDetails-sec">
        <h2 className="gs__siteDetails-sec__title">{en ? 'Website Details' : 'معلومات الموقع'}</h2>
        <button className="gs__siteDetails-sec__edit-btn" data-action="edit_siteDetails_button_is_clicked" onClick={handleClick} />
        <ul className="gs__siteDetails-sec__lst">
          <li className="gs__siteDetails-sec__lst__itm">
            <div className="gs__siteDetails-sec__lst__itm__wrapper">
              <DisplayImg className="gs__siteDetails-sec__lst__itm__wrapper__img" src={darkMode ? mailIcon : mailDarkModeIcon} />
              <span className="gs__siteDetails-sec__lst__itm__wrapper__spn">{en ? 'Email' : 'البريد الاكتروني'}</span>
            </div>
            <span className="gs__siteDetails-sec__lst__itm__spn">{websiteDetailsData.email}</span>
          </li>
          <li className="gs__siteDetails-sec__lst__itm">
            <div className="gs__siteDetails-sec__lst__itm__wrapper">
              <DisplayImg className="gs__siteDetails-sec__lst__itm__wrapper__img" src={darkMode ? callIcon : callDarkModeIcon} />
              <span className="gs__siteDetails-sec__lst__itm__wrapper__spn">{en ? 'Phone' : 'رقم الهاتف'}</span>
            </div>
            <span className="gs__siteDetails-sec__lst__itm__spn">{formatPhoneNumber(websiteDetailsData.phone)}</span>
          </li>
          <li className="gs__siteDetails-sec__lst__itm">
            <div className="gs__siteDetails-sec__lst__itm__wrapper">
              <DisplayImg className="gs__siteDetails-sec__lst__itm__wrapper__img" src={darkMode ? whatsappIcon : whatsappDarkModeIcon} />
              <span className="gs__siteDetails-sec__lst__itm__wrapper__spn">{en ? 'Whatsapp' : 'واتس اب'}</span>
            </div>
            <a className="gs__siteDetails-sec__lst__itm__a" href={websiteDetailsData.whatsApp} target="_blank">
              <DisplayImg src={darkMode ? linkDarkModeIcon : linkIcon} />
              {en ? 'view' : 'عرض'}
            </a>
          </li>
          <li className="gs__siteDetails-sec__lst__itm">
            <div className="gs__siteDetails-sec__lst__itm__wrapper">
              <DisplayImg className="gs__siteDetails-sec__lst__itm__wrapper__img" src={darkMode ? facebookIcon : facebookDarkModeIcon} />
              <span className="gs__siteDetails-sec__lst__itm__wrapper__spn">{en ? 'Facebook' : 'فيسبوك'}</span>
            </div>
            <a className="gs__siteDetails-sec__lst__itm__a" href={websiteDetailsData.facebook} target="_blank">
              <DisplayImg src={darkMode ? linkDarkModeIcon : linkIcon} />
              {en ? 'view' : 'عرض'}
            </a>
          </li>
          <li className="gs__siteDetails-sec__lst__itm">
            <div className="gs__siteDetails-sec__lst__itm__wrapper">
              <DisplayImg className="gs__siteDetails-sec__lst__itm__wrapper__img" src={darkMode ? instagramIcon : instagramDarkModeIcon} />
              <span className="gs__siteDetails-sec__lst__itm__wrapper__spn">{en ? 'Instagram' : 'انستغرام'}</span>
            </div>
            <a className="gs__siteDetails-sec__lst__itm__a" href={websiteDetailsData.instagram} target="_blank">
              <DisplayImg src={darkMode ? linkDarkModeIcon : linkIcon} />
              {en ? 'view' : 'عرض'}
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default GeneralSettingsTable;