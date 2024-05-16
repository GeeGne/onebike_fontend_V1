//  STYLES
import './Styles/App.scss';

//  COMPONENTS
import Header from './Components/Header/Header';
import Footer from './Components/Footer';
import Home from './Components/Pages/Home';
import Products from './Components/Pages/Products/Products';
import NotFound from './Components/Pages/NotFound';

// DATA
// import products from '/src/Data/Products.json';
import mainListData from '/src/Data/Menu.json';

// HOOKS
import React, {useEffect, useState, useRef} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// UTILS
import removeDuplicates from '/src/Utils/removeDuplicates.js';
import cleanseString from '/src/Utils/cleanseString.js';

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('english');

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
            <Route path="/" element={<Home/>}/>
            {mainListData.map(category =>
            <>
            <Route path={`/${cleanseString(category.english)}`} element={<Products category={category} darkMode={darkMode} language={language}/>} key={category.id}/>
            {category.secondaryList.map(secondData => secondData.thirdList.map(thirdData => 
            <Route path={`/${cleanseString(category.english)}/${cleanseString(thirdData.english)}`} element={<Products category={category} type={thirdData} darkMode={darkMode} language={language}/>} key={thirdData.id}/>
            ))}
            </> 
            )}
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </main>
        
        <footer className="app-layout__footer">
          <Footer/>
        </footer>

      </div>
    </Router>
  )
}

export default App;

