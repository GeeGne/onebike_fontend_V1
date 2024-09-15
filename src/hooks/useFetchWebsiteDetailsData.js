// HOOKS
import React, { useEffect, useState } from 'react';

// STORE
import { useDataStore } from '/src/store/store';

// FIREBASE
import {db} from '/src/firebase/fireStore';
import {getDoc, doc, collection, getDocs} from 'firebase/firestore';

function useFetchWebsiteDetailsData () {
  const {user, setWebsiteDetailsData, refreshWebsiteDetailsData, resetWebsiteDetailsDataToNull } = useDataStore();

  useEffect(() => {
    const fetchWebsiteDetailsData = async () => {
      try {
        const docRef = await getDoc(doc(db, 'websiteDetails', 'onebike'));
        if (docRef.exists) {
          setWebsiteDetailsData(docRef.data());
        } else {
          throw new Error("No such document!");
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (user) fetchWebsiteDetailsData();
    if (!user) resetWebsiteDetailsDataToNull();
  }, [user, refreshWebsiteDetailsData]);
}

export default useFetchWebsiteDetailsData;