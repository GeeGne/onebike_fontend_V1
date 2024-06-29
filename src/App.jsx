//  STYLES
import './styles/App.scss';

//  COMPONENTS
import Header from './components/header/Header';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import Products from './components/pages/products/Products';
import Checkout from './components/pages/checkout/Checkout';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Account from './components/pages/Account';
import NotFound from './components/pages/NotFound';
import NavBottom from './components/header/navbar/NavBottom';

// DATA
import mainListData from '/src/data/menu.json';

// HOOKS
import React, {useEffect, useState, useRef} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// UTILS
import cleanseString from '/src/utils/cleanseString.js';
import CartProductsContext from '/src/utils/myContext.js';

function App () {

  const [darkMode, setDarkMode] = useState(false);
  const [lan, setLanguage] = useState('en');
  const [cartDispatchData, setCartDispatchData] = useState([]);
  const [cart, setCart] = useState([]);

  const themeData = setDarkMode;
  const languageData = setLanguage;
  const cartProductsData = setCartDispatchData;
  const cartData = setCart;
  console.log('cart: ', cart);

  return (
    <Router>
      <div className="app-layout">

        <header className="app-layout__header">
          <CartProductsContext.Provider value={cartDispatchData}>
            <Header onThemeChange={themeData} onLanguageChange={languageData} onCartChange={cartData}/>
          </CartProductsContext.Provider>
        </header>

        <main className="app-layout__main">
          <Routes>
            <Route exact path="/" element={<Home darkMode={darkMode} lan={lan} />} />
            {mainListData.map(category =>
            <React.Fragment key={category.id}>
              <Route exact path={`/${cleanseString(category.en)}`} element={<Products category={category} darkMode={darkMode} lan={lan} onCartProductsChange={cartProductsData} />} />
              {category.secondaryList.map(secondData => secondData.thirdList.map(thirdData => 
              <Route path={`/${cleanseString(category.en)}/${cleanseString(thirdData.en)}`} element={<Products category={category} type={thirdData} darkMode={darkMode} lan={lan} onCartProductsChange={cartProductsData} />} key={thirdData.id} />
              ))}
            </React.Fragment>
            )}
            <Route path="/checkouts" element={<Checkout darkMode={darkMode} lan={lan} />} />
            <Route path="/account/register" element={<SignUp darkMode={darkMode} lan={lan} />} />
            <Route path="/checkouts/login" element={<SignIn darkMode={darkMode} lan={lan} />} />
            <Route path="/account/login" element={<SignIn darkMode={darkMode} lan={lan} />} />
            <Route path="/account" element={<Account darkMode={darkMode} lan={lan} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <footer className="app-layout__footer">
          <Footer darkMode={darkMode} lan={lan} />
        </footer>

        <section className="app-layout__navBottom">
          <NavBottom />
        </section>
        
      </div>
    </Router>
  )
}

export default App;

