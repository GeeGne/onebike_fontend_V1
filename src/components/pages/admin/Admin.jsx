// HOOKS
import React, {useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// SCSS
import '/src/styles/components/pages/admin/Admin.scss';

// COMPONENTS
import ContentManagementTable from '/src/components/pages/admin/ContentManagementTable';
import BreadCrumb from '/src/components/BreadCrumb';
import DisplayWebImg from '/src/components/DisplayWebImg';
import Alert from '/src/components/Alert';
import ProgressActivity from '/src/components/ProgressActivity';

// STORE
import { useDataStore } from '/src/store/store';

// FIREBASE
import { db } from '/src/firebase/fireStore';
import { getDoc, doc, collection, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { storage } from '/src/firebase/storage';

// JSON
import menu from '/src/data/menu.json';

// UTILS
import Redirector from '/src/utils/Redirector';

// NANOID
import { nanoid } from 'nanoid';

// ASSETS
import img from '/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg';
import doubleArrowPrimary from '/assets/img/icons/keyboard_double_arrow_right_primary.svg';
import heart from '/assets/img/icons/heart.svg';
import heartFill from '/assets/img/icons/heart_fill.svg';

// ASSETS - DARKMODE
import doubleArrowSecondary from '/assets/img/icons/keyboard_double_arrow_right_secondary.svg';
import heartDarkMode from '/assets/img/icons/heart_darkMode.svg';

function Admin ({darkMode, lan}) {

  const { user, userData, products, setRefreshProducts } = useDataStore();
  const [ newAlert, setNewAlert ] = useState(0);
  const [ alertText, setAlertText ] = useState(null);

  const en = lan === 'en';
  const navigate = useNavigate();
  const redirector = new Redirector(navigate);

  useEffect(() => {
    if (userData) redirector.admin(user, userData);
  }, [userData]);

  return (
    <div className="admin">
      <Alert alertText={alertText} newAlert={newAlert} />
      <section className="admin__breadCrumb-sec">
        <BreadCrumb type={{en: 'admin', ar: 'ادمن'}} category={{en: 'account', ar: 'الحساب'}} lan={lan} />
      </section>
      <section className="admin__title-sec">
        <h1 className="admin__title-sec__h1">{en ? 'Content Management' : 'اداره المحتوى'}</h1>
      </section>
      <ContentManagementTable darkMode={darkMode} lan={lan} />
    </div>
  )
}

export default Admin;