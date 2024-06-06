//  STYLES
import './styles/App.scss';

//  COMPONENTS
import Header from './components/header/Header';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import Products from './components/pages/products/Products';
import NotFound from './components/pages/NotFound';

// DATA
// import products from '/src/Data/Products.json';
import mainListData from '/src/data/menu.json';

// HOOKS
import React, {useEffect, useState, useRef} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// UTILS
import removeDuplicates from '/src/utils/removeDuplicates.js';
import cleanseString from '/src/utils/cleanseString.js';
import CartProductsContext from '/src/utils/myContext.js';

function App () {

  const [darkMode, setDarkMode] = useState(false);
  const [lan, setLanguage] = useState('en');
  const [cartProducts, setCartProducts] = useState([]);

  const themeData = setDarkMode;
  const languageData = setLanguage;
  const cartProductsData = setCartProducts;

  return (
    <Router>
      <div className="app-layout">

        <header className="app-layout__header">
          <CartProductsContext.Provider value={cartProducts}>
            <Header onThemeChange={themeData} onLanguageChange={languageData}/>
          </CartProductsContext.Provider>
        </header>

        <main className="app-layout__main">
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} lan={lan}/>}/>
            {mainListData.map(category =>
            <React.Fragment key={category.id}>
            <Route path={`/${cleanseString(category.en)}`} element={<Products category={category} darkMode={darkMode} lan={lan} onCartProductsChange={cartProductsData}/>}/>
            {category.secondaryList.map(secondData => secondData.thirdList.map(thirdData => 
            <Route path={`/${cleanseString(category.en)}/${cleanseString(thirdData.en)}`} element={<Products category={category} type={thirdData} darkMode={darkMode} lan={lan} onCartProductsChange={cartProductsData}/>} key={thirdData.id}/>
            ))}
            </React.Fragment>
            )}
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </main>
        
        <footer className="app-layout__footer">
          <Footer darkMode={darkMode} lan={lan}/>
        </footer>

      </div>
    </Router>
  )
}

export default App;

