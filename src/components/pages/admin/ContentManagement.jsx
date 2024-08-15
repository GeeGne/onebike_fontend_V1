// HOOKS
import React, {useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// SCSS
import '/src/styles/components/pages/admin/ContentManagement.scss';

// FIREBASE
import {auth} from "/src/firebase/authSignUp";
import {signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail} from "firebase/auth";
import {db} from '/src/firebase/fireStore';
import {getDoc, doc, collection, getDocs} from 'firebase/firestore';

// UTILS
import Redirector from '/src/utils/Redirector';

function ContentManagement ({darkMode, lan}) {
  
  const [ user, setUser ] = useState(true);
  const [ userData, setUserData ] = useState({admin: true});
  const [ headToAdmin, setHeadToAdmin ] = useState(false);

  const en = lan === 'en';
  const { pathname } = window.location;
  const navigate = useNavigate();
  const redirector = new Redirector(navigate);

  useEffect(() => {
    redirector.admin(pathname, user, userData);
  }, [userData])

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists) {
            setUserData(userDoc.data());
          } else {
            throw new Error("No such document!");
          }
        }    
      } catch (err) {
        console.error(err);
      }
    }

    const fetchData = async () => {
      await fetchUserData();
      // redirector.admin(pathname, user, userData);
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => setUser(user));
    return () => unsubscribe();
  }, []);
  console.log('user', user);
  console.log('userData', userData);

  return (
    <div className="contentManagement">
      hi
    </div>
  )
}

export default ContentManagement;