// HOOKS
import React, { useEffect, useState } from 'react';

// STORE
import { useDataStore } from '/src/store/store';

// FIREBASE
import {db} from '/src/firebase/fireStore';
import {getDoc, doc, collection, getDocs} from 'firebase/firestore';


function useFetchUserData () {
  const {user, setUserData, refreshUserData, resetUserDataToNull } = useDataStore();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists) {
          setUserData(userDoc.data());
        } else {
          throw new Error("No such document!");
        }
      } catch (err) {
        console.error(err);
      }
    }

    const fetchOrdersData = async () => {
      try {
        const ordersCollectionRef = collection(db, 'users', user.uid, 'orders');
        const ordersSnapshot = await getDocs(ordersCollectionRef);

        if (!ordersSnapshot.empty) {
          const ordersData = ordersSnapshot.docs.map(doc => (
            {...doc.data()}
          ));
          setUserData({ordersData})
        } else {
          console.log("No orders found for this user");
          setUserData({ordersData: []})
        }
      } catch (err) {
        console.error("Error fetching orders data:", err);
      }
    }

    const fetchData = async () => {
      await fetchUserData();
      await fetchOrdersData();
    };

    if (user) fetchData();
    if (!user) resetUserDataToNull();
  }, [user, refreshUserData]);
}

export default useFetchUserData;