// HOOKS
import React, { useEffect, useState } from 'react';

// STORE
import { useDataStore } from '/src/store/store';

// FIREBASE
import { db } from '/src/firebase/fireStore';
import { getDoc, doc, collection, getDocs, writeBatch } from 'firebase/firestore';

function useFetchHomePageBannersData () {
  const { setHomePageBannersData, refreshHomePageBannersData } = useDataStore();

  useEffect(() => {
    const fetchHomePageBannersData = async () => {
      try {
        const bannersCollection = collection(db, 'homePageBanners')
        const bannersSnapshot = await getDocs(bannersCollection);

        if (!bannersSnapshot.empty) {
          const bannersData = bannersSnapshot.docs.map(doc => (
            doc.data()
          ))
          setHomePageBannersData(bannersData)
        } else {
          setHomePageBannersData([]);
          throw new Error("No Banners Data to be found");
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchHomePageBannersData();
  }, [refreshHomePageBannersData]);
}

export default useFetchHomePageBannersData;