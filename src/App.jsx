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

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const [lan, setLanguage] = useState('en');

  const themeData = data => {
    setDarkMode(data);
  }
  
  const languageData = data => {
    setLanguage(data);
  }

  return (
    <Router>
      <div className="app-layout">

        <header className="app-layout__header">
          <Header onThemeChange={themeData} onLanguageChange={languageData}/>
        </header>

        <main className="app-layout__main">
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} lan={lan}/>}/>
            {mainListData.map(category =>
            <>
            <Route path={`/${cleanseString(category.en)}`} element={<Products category={category} darkMode={darkMode} lan={lan}/>} key={category.id}/>
            {category.secondaryList.map(secondData => secondData.thirdList.map(thirdData => 
            <Route path={`/${cleanseString(category.en)}/${cleanseString(thirdData.en)}`} element={<Products category={category} type={thirdData} darkMode={darkMode} lan={lan}/>} key={thirdData.id}/>
            ))}
            </> 
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

