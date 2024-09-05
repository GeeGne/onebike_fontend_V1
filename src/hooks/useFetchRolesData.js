// HOOKS
import React, { useEffect, useState } from 'react';

// STORE
import { useDataStore } from '/src/store/store';

// FIREBASE
import {db} from '/src/firebase/fireStore';
import {getDoc, doc, collection, getDocs} from 'firebase/firestore';


function useFetchRolesData () {
  const {user, setRolesData, resetRolesDataToNull } = useDataStore();

  useEffect(() => {
    const fetchRolesData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'roles', user.uid));
        if (userDoc.exists) {
          setRolesData(userDoc.data());
        } else {
          throw new Error("No such document!");
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (user) fetchRolesData();
    if (!user) resetRolesDataToNull();
  }, [user]);
}

export default useFetchRolesData;