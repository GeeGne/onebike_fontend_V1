// HOOKS
import React, {useEffect, useState, useRef, Suspense} from 'react';
import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';

//  STYLES
// import './styles/App.scss';

//  COMPONENTS
import PageIsLoading from '/src/components/PageIsLoading';
import Header from '/src/components/header/Header';
import Footer from '/src/components/Footer';
import SearchResultsPanel from '/src/components/SearchResultsPanel';
import Home from '/src/components/pages/Home';
// import Products from '/src/components/pages/products/Products';
// import Checkout from '/src/components/pages/checkout/Checkout';
// import Account from '/src/components/pages/Account';
// import NotFound from '/src/components/pages/NotFound';
// import SignIn from '/src/components/pages/SignIn';
// import SignUp from '/src/components/pages/SignUp';
// import Cart from '/src/components/pages/Cart';
import NavBottom from '/src/components/header/navbar/NavBottom';

// COMPONENTS - Lazy
// const Header = React.lazy(() => import('/src/components/header/Header'));
// const Footer = React.lazy(() => import('/src/components/Footer'));
// const NavBottom = React.lazy(() => import('/src/components/header/navbar/NavBottom'));
// const Home = React.lazy(() => import('/src/components/pages/Home'));
const Products = React.lazy(() => import('/src/components/pages/products/Products'));
const Checkout = React.lazy(() => import('/src/components/pages/checkout/Checkout'));
const Account = React.lazy(() => import('/src/components/pages/Account'));
const NotFound = React.lazy(() => import('/src/components/pages/NotFound'));
const SignIn = React.lazy(() => import('/src/components/pages/SignIn'));
const SignUp = React.lazy(() => import('/src/components/pages/SignUp'));
// const SearchResultsPanel = React.lazy(() => import('/src/components/SearchResultsPanel'));
const Cart = React.lazy(() => import('/src/components/pages/Cart'));

// DATA
import mainListData from '/src/data/menu.json';

// UTILS
import cleanseString from '/src/utils/cleanseString.js';
import {CartProductsContext, CartContext} from '/src/utils/myContext.js';

function App () {

  const [darkMode, setDarkMode] = useState(false);
  const [lan, setLanguage] = useState('en');

  const themeData = setDarkMode;
  const languageData = setLanguage;

  // Redirect IF the domain isn't onebikesyria.com
  useEffect(() => {
    const redirect = () => window.location.href = 'https://onebikesyria.com';
    const isThisMyMainDomain = window.location.host.includes('onebikesyria.com');

    // if (!isThisMyMainDomain) redirect();
  }, []);

  return (
    <Router>
      <div className="app-layout">

        <header className="app-layout__header">
          <Header onThemeChange={themeData} onLanguageChange={languageData} />
        </header>

        <main className="app-layout__main">
          <SearchResultsPanel darkMode={darkMode} lan={lan} />
          <HelmetProvider>
            <Suspense fallback={<PageIsLoading type="b" darkMode={darkMode} lan={lan} />}>
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
            </Suspense>
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

