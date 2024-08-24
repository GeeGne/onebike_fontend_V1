// HOOKS
import React, { useEffect, useState } from 'react';

// STORE
import { useDataStore } from '/src/store/store';

// FIREBASE
import {db} from '/src/firebase/fireStore';
import {getDoc, doc, collection, getDocs} from 'firebase/firestore';


function useFetchProductsData () {
  const { setProducts, refreshProducts } = useDataStore();

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);

        if (!productsSnapshot.empty) {
          const productsData = productsSnapshot.docs.map(doc => (
            {...doc.data()}
          ))
          // console.log(productsData);
          setProducts(productsData);
        } else {
          setProducts([]);
          throw new Error("No Products to be found");
        }   
      } catch (err) {
        console.error(err);
      }
    }

    fetchProductsData();
  }, [refreshProducts]);
}

export default useFetchProductsData;