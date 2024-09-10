// HOOKS
import React, {useState, useEffect, useRef, useReducer} from 'react';

// SCSS
import '/src/styles/components/pages/admin/GeneralSettingsTable.scss';

// COMPONENTS
import DisplayWebImg from '/src/components/DisplayWebImg';
import Alert from '/src/components/Alert';
import ProgressActivity from '/src/components/ProgressActivity';
import ProgressWindowActivity from '/src/components/ProgressWindowActivity';

// STORES
import { useDataStore } from '/src/store/store'; 

// REDUCERS
import editAltWindowReducer from '/src/reducers/editAltWindowReducer';

// FIREBASE
import { db} from '/src/firebase/fireStore';
import { getDoc, deleteDoc, setDoc, doc, collection, updateDoc, getDocs, writeBatch } from 'firebase/firestore';
import { storage } from '/src/firebase/storage';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// NANOID
import { nanoid } from 'nanoid';

// ASSETS
import infoIcon from '/assets/img/icons/info.svg';
import infoDarkModeIcon from '/assets/img/icons/info_darkMode.svg';
import emptyImgURL from '/assets/img/empty/empty.webp';


function GeneralSettingsTable ({darkMode, lan}) {

  const { homePageBannersData, setHomePageBannersData, setRefreshHomePageBannersData } = useDataStore();
  const [ newAlert, setNewAlert ] = useState(0);
  const [ alertText, setAlertText ] = useState(null);
  const [ editAltWindow, dispatch ] = useReducer(editAltWindowReducer, {
    toggle: '',
    alt: '',
    id: '',
  });
  const [ activity, setActivity ] = useState(false);
  const [ windowActivity, setwindowActivity ] = useState('');

  const imgBannerFile = useRef(null);
  const altInputEL = useRef(null);

  const en = lan === 'en';
  const getBannerImgURL = item => `/assets/img/banners/homepage/${item.id}.webp`;
  const clearAltInputValue = () => altInputEL.current.value = "";

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
        dispatch({type: action});
        break;
      case 'save_window_button_is_clicked':
        updateBannerAltData(bannerId, alt);
        break;
      case 'edit_alt_button_is_clicked':
        dispatch({type: action, id: bannerId});
        break;
      case 'delete_banner_img':
        deleteBannerData(bannerId);
        break;
      default:
        console.error('Error: unknown action: ', action);
    }
  }

  const handleChange = e => {
    const { name , value } = e.currentTarget;

    switch (name) {
      case 'alt':
        dispatch({type: 'add_alt_data', [name]: value.trim()});
        break;
      case 'imgUpload':
        const file = e.currentTarget.files[0];
        imgBannerFile.current = file || fetchEmptyImgAsBlob(emptyImgURL);

        const bannerData = {id: nanoid(12), alt: '', order: homePageBannersData.length + 1};
        addNewBannerData(bannerData.id, bannerData);
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
      <section className="gs__contentDisplay-sec">
        <h2 className="gs__contentDisplay-sec__title">{en ? 'Banners (Home Page)' : 'اللافتات (الصفحة الرئيسية)'}</h2>
        <ul className="gs__contentDisplay-sec__lst">
        {homePageBannersData?.map((itm, i) => 
          <li className="gs__contentDisplay-sec__lst__itm" key={i}>
            <span className="gs__contentDisplay-sec__lst__itm__count">{i + 1}</span>
            <button className="gs__contentDisplay-sec__lst__itm__up-arrow-btn" aria-label="move image to previous" data-index={i} data-action="move_img_to_previous" onClick={handleClick} />
            <button className="gs__contentDisplay-sec__lst__itm__down-arrow-btn" aria-label="move image to next" data-index={i} data-action="move_img_to_next" onClick={handleClick} />
            <div className="gs__contentDisplay-sec__lst__itm__alt-wrapper">
              <span className="gs__contentDisplay-sec__lst__itm__alt-wrapper__title">Alt</span>
              <button className="gs__contentDisplay-sec__lst__itm__alt-wrapper__btn" data-banner-id={itm.id} data-action="edit_alt_button_is_clicked" onClick={handleClick} />     
              <img className="gs__contentDisplay-sec__lst__itm__alt-wrapper__img" src={darkMode ? infoDarkModeIcon : infoIcon} /> 
              <span className="gs__contentDisplay-sec__lst__itm__alt-wrapper__description">{itm.alt}</span>
            </div>
            <button className="gs__contentDisplay-sec__lst__itm__delete-btn" aria-label="delte image" data-banner-id={itm.id} data-action="delete_banner_img" onClick={handleClick} >
              <DisplayWebImg className="gs__contentDisplay-sec__lst__itm__delete-btn__img" src={getBannerImgURL(itm)} loading="lazy" role="button" />
            </button>
          </li>        
        )}
        </ul>
        <div className="gs__contentDisplay-sec__wrapper">
          <input className="gs__contentDisplay-sec__wrapper__add-inpt" type="file" accept="image/*" name="imgUpload" onChange={handleChange} />
        </div>
      </section>
    </div>
  )
}

export default GeneralSettingsTable;