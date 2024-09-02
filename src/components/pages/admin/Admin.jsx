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

function Admin ({darkMode, lan}) {

  const { user, userData, products, setRefreshProducts } = useDataStore();
  const [ newAlert, setNewAlert ] = useState(0);
  const [ alertText, setAlertText ] = useState(null);
  const [ tab, setTab ] = useState('content-management');

  const en = lan === 'en';
  const navigate = useNavigate();
  const redirector = new Redirector(navigate);
  const tabTitle = () => {
    switch (tab) {
      case 'content-management':
      return en ? 'Content Management' : 'اداره المحتوى';
      case 'general-settings':
      return en ? 'General Settings' : 'الاعدادات العامه';
      case 'order-management':
      return en ? 'Order Management' : 'اداره الطلبات';
    }
  }
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
        <h1 className="admin__title-sec__h1">{tabTitle()}</h1>
        <button className="admin__title-sec__btn"></button>
        <button className="admin__title-sec__btn"></button>
        <button className="admin__title-sec__btn"></button>
      </section>
      <ContentManagementTable darkMode={darkMode} lan={lan} />
    </div>
  )
}

export default Admin;