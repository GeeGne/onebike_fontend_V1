// HOOKS
import React, { useEffect } from 'react';

// STORE
import { useDataStore } from '/src/store/store';

// FIREBASE
import { auth } from '/src/firebase/authSignUp';
import { onAuthStateChanged } from "firebase/auth";

function useFetchAuth () {
  const setUser = useDataStore(state => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => setUser(user));
    return () => unsubscribe();
  }, []);
}

export default useFetchAuth;