//  STYLES
import './styles/App.scss';

//  COMPONENTS
import Header from '/src/components/header/Header';
import Footer from '/src/components/Footer';
import Home from '/src/components/pages/Home';
import Products from '/src/components/pages/products/Products';
import Checkout from '/src/components/pages/checkout/Checkout';
import Cart from '/src/components/pages/Cart';
import SignIn from '/src/components/pages/SignIn';
import SignUp from '/src/components/pages/SignUp';
import Account from '/src/components/pages/Account';
import NotFound from '/src/components/pages/NotFound';
import NavBottom from '/src/components/header/navbar/NavBottom';
import SearchResultsPanel from '/src/components/SearchResultsPanel';

// DATA
import mainListData from '/src/data/menu.json';

// HOOKS
import React, {useEffect, useState, useRef} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';


// UTILS
import cleanseString from '/src/utils/cleanseString.js';
import {CartProductsContext, CartContext} from '/src/utils/myContext.js';

function App () {

  const [darkMode, setDarkMode] = useState(false);
  const [lan, setLanguage] = useState('en');

  const themeData = setDarkMode;
  const languageData = setLanguage;

  return (
    <Router>
      <div className="app-layout">

        <header className="app-layout__header">
          <Header onThemeChange={themeData} onLanguageChange={languageData} />
        </header>

        <main className="app-layout__main">
          <SearchResultsPanel darkMode={darkMode} lan={lan} />
          <HelmetProvider>
            <Routes>
              <Route exact path="/" element={<Home darkMode={darkMode} lan={lan} />} />
              {mainListData.map(category =>
              <React.Fragment key={category.id}>
                <Route exact path={`/${cleanseString(category.en)}`} element={<Products category={category} darkMode={darkMode} lan={lan} />} />
                {category.secondaryList.map(secondData => secondData.thirdList.map(thirdData => 
                <Route path={`/${cleanseString(category.en)}/${cleanseString(thirdData.en)}`} element={<Products category={category} type={thirdData} darkMode={darkMode} lan={lan} />} key={thirdData.id} />
                ))}
              </React.Fragment>
              )}
              <Route path="/checkouts" element={<Checkout darkMode={darkMode} lan={lan} />} />
              <Route path="/cart" element={<Cart darkMode={darkMode} lan={lan} />} />
              <Route path="/account/register" element={<SignUp darkMode={darkMode} lan={lan} />} />
              <Route path="/account/login" element={<SignIn darkMode={darkMode} lan={lan} />} />
              <Route path="/account" element={<Account darkMode={darkMode} lan={lan} />} />
              <Route path="*" element={<NotFound darkMode={darkMode} lan={lan} />} />
            </Routes>
          </HelmetProvider>
        </main>
        
        <footer className="app-layout__footer">
          <Footer darkMode={darkMode} lan={lan} />
        </footer>

        <section className="app-layout__navBottom">
          <NavBottom darkMode={darkMode} lan={lan} />
        </section>
        
      </div>
    </Router>
  )
}

export default App;

