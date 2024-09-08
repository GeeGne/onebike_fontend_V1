// HOOKS
import React, {useState, useEffect, useRef, useReducer} from 'react';

// SCSS
import '/src/styles/components/pages/admin/GeneralSettingsTable.scss';

// COMPONENTS
import DisplayWebImg from '/src/components/DisplayWebImg';
import Alert from '/src/components/Alert';
import ProgressActivity from '/src/components/ProgressActivity';

// STORES
import { useDataStore } from '/src/store/store'; 

// REDUCERS
import editAltWindowReducer from '/src/reducers/editAltWindowReducer';

// FIREBASE
import { db} from '/src/firebase/fireStore';
import { getDoc, doc, collection, updateDoc, getDocs, addDoc, writeBatch } from 'firebase/firestore';

// ASSETS
import img1 from '/assets/img/content/bicycle and syria flag poster.webp'
import img2 from '/assets/img/content/bicycle and lake.webp'
import img3 from '/assets/img/content/Giant and Snow.webp'
import img4 from '/assets/img/content/Special bicycle and forest.webp'

function GeneralSettingsTable ({darkMode, lan}) {

  const { homePageBannersData, setHomePageBannersData, setRefreshHomePageBannersData } = useDataStore();
  console.log('homePageBannersData', homePageBannersData);
  const [ newAlert, setNewAlert ] = useState(0);
  const [ alertText, setAlertText ] = useState(null);
  const [ editAltWindow, dispatch ] = useReducer(editAltWindowReducer, {
    toggle: '',
    alt: '',
    id: '',
  });
  const [ activity, setActivity ] = useState(false);

console.log(editAltWindow);
  const altInputEL = useRef(null);
  const en = lan === 'en';
  const getBannerImgURL = item => `/assets/img/banners/homepage/${item.id}.webp`;

  const deleteBannersData = async () => {
    try {
      const bannersCollection = collection(db, 'homePageBanners');
      const snapshot = await getDocs(bannersCollection);

      const batch = writeBatch(db);

      snapshot.forEach(banner => {
        const bannersRef = doc(db, 'homePageBanners', banner.id);
        batch.delete(bannersRef)
      });

      await batch.commit();

    } catch (error) {
      console.error('Error: couldn\'t delete Bannsers Data: ', error);
    }
  }

  const updateBannersOrderData = async newBanners => {
    try {
      await deleteBannersData();
      const bannersCollection = collection(db, 'homePageBanners');

      const addBannerPromises = newBanners.map((banner) => {
        return addDoc(bannersCollection, banner)
      });

      await Promise.all(addBannerPromises);
      setHomePageBannersData([]);
      setRefreshHomePageBannersData(Math.random());
      setAlertText('success')
    } catch (error) {
      console.error('Error: couldn\'t update Bannsers Data: ', error);
      setAlertText('fail')
    } finally {
      setNewAlert(Math.random());
    }
  }

  const updateBannerAltData = async (documentID, alt) => {
    
    setActivity(true);

    try {
      console.log('documentID', documentID);
      const docRef = doc(db, 'homePageBanners', documentID)
      await updateDoc(docRef, { alt });

      dispatch({type: 'alt_data_is_updated'})
      setRefreshHomePageBannersData(Math.random());
      setAlertText('success')
    } catch (error) {
      console.error('Error: couldn\'t update alt data: ', error);
      setAlertText('fail')
    } finally {
      setNewAlert(Math.random());
      setActivity(false);
    }
  }

  const renderLoadingState = textContent => {
    if (activity) {
      return <ProgressActivity darkMode={darkMode} invert={false} />
    } else {
      return textContent;
    }
  }

  const handleClick = e => {
    const {action, index, bannerId, alt} = e.currentTarget.dataset;
    const newArray = [...homePageBannersData];

    switch (action) {
      case 'move_img_to_previous':
        if (Number(index) > 0) {
          [newArray[Number(index)], newArray[Number(index) - 1]] = [newArray[Number(index) - 1], newArray[Number(index)]];
          updateBannersOrderData(newArray);
        }
        break;
      case 'move_img_to_next':
        if (Number(index) < newArray.length - 1) {
          [newArray[Number(index)], newArray[Number(index) + 1]] = [newArray[Number(index) + 1], newArray[Number(index)]];
          updateBannersOrderData(newArray);
        }
        break;
      case 'window_background_is_clicked':
      case 'cancel_window_button_is_clicked':
        altInputEL.current.value = '';
        dispatch({type: action})
        break;
      case 'save_window_button_is_clicked':
        console.log('clcik')
        updateBannerAltData(bannerId, alt);
        break;
      case 'edit_alt_button_is_clicked':
        dispatch({type: action, id: bannerId})
        break;
      default:
        console.error('Error: unknown action: ', action);
    }
  }

  const handleChange = e => {
    const { name , value } = e.currentTarget;

    switch (name) {
      case 'alt':
        dispatch({type: 'add_alt_data', [name]: value.trim()})
        break;
      default:
        console.error('Error: unknown name: ', name);
    }
  }

  return (
    <div className="gs">
      <Alert alertText={alertText} newAlert={newAlert} />
      <div className={`gs__editAlt-window${editAltWindow.toggle}`} data-action="window_background_is_clicked" onClick={handleClick}>
        <div className="gs__editAlt-window__wrapper" data-action="window_wrapper_is_clicked" onClick={e => e.stopPropagation()}>
          <h2 className="gs__editAlt-window__wrapper__title">{en ? 'Set alt' : 'مطلوب تأكيد المستخدم'}</h2>
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
            <div className="gs__contentDisplay-sec__lst__itm__alt-popUp" data-banner-id={itm.id} data-action="move_img_to_next"> 
              <span className="gs__contentDisplay-sec__lst__itm__alt-popUp__alt-description">{itm.alt}</span>
            </div>
            <button className="gs__contentDisplay-sec__lst__itm__alt-btn" data-banner-id={itm.id} data-action="edit_alt_button_is_clicked" onClick={handleClick} />     
            <button className="gs__contentDisplay-sec__lst__itm__delete-btn" aria-label="delte image" data-index={i} data-action="delete_img" >
              <DisplayWebImg className="gs__contentDisplay-sec__lst__itm__delete-btn__img" src={getBannerImgURL(itm)} loading="lazy" role="button" />
            </button>
          </li>        
        )}
        </ul>
        <div className="gs__contentDisplay-sec__wrapper">
          <input className="gs__contentDisplay-sec__wrapper__add-inpt" type="file" accept="image/*" name="imgUpload" />
        </div>
      </section>
    </div>
  )
}

export default GeneralSettingsTable;