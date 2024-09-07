// HOOKS
import React, {useState, useEffect, useRef} from 'react';

// SCSS
import '/src/styles/components/pages/admin/GeneralSettingsTable.scss';

// COMPONENTS
import DisplayWebImg from '/src/components/DisplayWebImg';

// store
import { useDataStore } from '/src/store/store'; 

// FIREBASE
import { db} from '/src/firebase/fireStore';
import { getDoc, doc, collection, getDocs, addDoc, writeBatch } from 'firebase/firestore';

// ASSETS
import img1 from '/assets/img/content/bicycle and syria flag poster.webp'
import img2 from '/assets/img/content/bicycle and lake.webp'
import img3 from '/assets/img/content/Giant and Snow.webp'
import img4 from '/assets/img/content/Special bicycle and forest.webp'

function GeneralSettingsTable ({darkMode, lan}) {

  const { homePageBannersData, setHomePageBannersData, setRefreshHomePageBannersData } = useDataStore();
  console.log('homePageBannersData', homePageBannersData)

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

  const updateBannersData = async newBanners => {
    try {
      await deleteBannersData();
      const bannersCollection = collection(db, 'homePageBanners');

      const addBannerPromises = newBanners.map((banner) => {
        return addDoc(bannersCollection, banner)
      });

      await Promise.all(addBannerPromises);
      setHomePageBannersData([]);
      setRefreshHomePageBannersData(Math.random());
    } catch (error) {
      console.error('Error: couldn\'t update Bannsers Data: ', error);
    }
  }

  const handleClick = e => {
    const {action, index} = e.currentTarget.dataset;
    const newArray = [...homePageBannersData];

    switch (action) {
      case 'move_img_to_previous':
        if (Number(index) > 0) {
          [newArray[Number(index)], newArray[Number(index) - 1]] = [newArray[Number(index) - 1], newArray[Number(index)]];
          updateBannersData(newArray);
        }
        break;
      case 'move_img_to_next':
        if (Number(index) < newArray.length - 1) {
          [newArray[Number(index)], newArray[Number(index) + 1]] = [newArray[Number(index) + 1], newArray[Number(index)]];
          updateBannersData(newArray);
        }
        break;
      default:
        console.error('Error: unknown action: ', action);
    }

  }

  return (
    <div className="gs">
      <section className="gs__contentDisplay-sec">
        <h2 className="gs__contentDisplay-sec__title">{en ? 'Banners (Home Page)' : 'اللافتات (الصفحة الرئيسية)'}</h2>
        <ul className="gs__contentDisplay-sec__lst">
        {homePageBannersData?.map((itm, i) => 
          <li className="gs__contentDisplay-sec__lst__itm" key={i}>
            <span className="gs__contentDisplay-sec__lst__itm__count">{i + 1}</span>
            <button className="gs__contentDisplay-sec__lst__itm__up-arrow-btn" aria-label="move image to previous" data-index={i} data-action="move_img_to_previous" onClick={handleClick} />
            <button className="gs__contentDisplay-sec__lst__itm__down-arrow-btn" aria-label="move image to next" data-index={i} data-action="move_img_to_next" onClick={handleClick} />
            <button className="gs__contentDisplay-sec__lst__itm__delete-btn" aria-label="move image to next" >
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