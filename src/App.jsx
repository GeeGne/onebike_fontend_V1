//  STYLES
// import '../Styles/Globals/Theme.scss';
// import '../Styles/Globals/Fonts.scss';
import './Styles/App.scss';

//  COMPONENTS
import Header from './Components/Header/Header';
import Footer from './Components/Footer';
import Home from './Components/Pages/Home';
import Products from './Components/Pages/Products';
import NotFound from './Components/Pages/NotFound';

// DATA
// import products from '/src/Data/Products.json';

// HOOKS
import React, {useEffect, useState, useRef} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);

  const products = [{
    id: 0,
    category: {english: "accessories", arabic:"اكسسوارات"},
    type: {english: "lights", arabic: "اناره"},
    title: "NiteRider Lumina 1200 Boost USB Rechargeable Bike Light Powerful Lumens Bicycle Headlight LED Front Light Easy to Install for Men Women Road Mountain City Commuting Adventure Cycling Safety Flashlight",
    img: "src/assets/Img/Products/NiteRider Lumina 1200.jpg",
    color: {english: "black", arabic:"اسود"},
    brand: "NiteRider"
  },{
    id: 1,
    category: {english: "accessories", arabic:"اكسسوارات"},
    type: {english: "bike Pumps", arabic:"منافخ"},
    title: "GIYO Small Bike tire Pump Schrader & Presta Valve for MTB 80 PSI Telescopic Barrel All Metal CNC Portable Mini Bike Pump Secure Valve Lock for Easy Pumping | Taiwan Made GM043",
    img: "src/assets/Img/Products/GIYO Small Bike tire Pump Schrader.jpg",
    color: {english: "Grey", arabic:"رمادي"},
    brand: "GIYO"
  },{
    id: 2,
    category: {english: "accessories", arabic:"اكسسوارات"},
    type: {english: "lights", arabic: "اناره"},
    title: "NiteRider Lumina 1200 Boost USB Rechargeable Bike Light Powerful Lumens Bicycle Headlight LED Front Light Easy to Install for Men Women Road Mountain City Commuting Adventure Cycling Safety Flashlight",
    img: "src/assets/Img/Products/NiteRider Lumina 1200.jpg",
    color: {english: "black", arabic:"اسود"},
    brand: "NiteRider"
  },{
    id: 3,
    category: {english: "parts", arabic:""},
    type: {english: "locks", arabic: "قفل للدراجه"},
    title: "GIYO Small Bike tire Pump Schrader & Presta Valve for MTB 80 PSI Telescopic Barrel All Metal CNC Portable Mini Bike Pump Secure Valve Lock for Easy Pumping | Taiwan Made GM043",
    img: "src/assets/Img/Products/GIYO Small Bike tire Pump Schrader.jpg",
    color: {english: "Grey", arabic:"رمادي"},
    brand: "GIYO"
  },{
    id: 4,
    category: {english: "parts", arabic:"قطع الدراجه"},
    type: {english: "cages", arabic: "حماله مطره"},
    title: "NiteRider Lumina 1200 Boost USB Rechargeable Bike Light Powerful Lumens Bicycle Headlight LED Front Light Easy to Install for Men Women Road Mountain City Commuting Adventure Cycling Safety Flashlight",
    img: "src/assets/Img/Products/NiteRider Lumina 1200.jpg",
    color: {english: "black", arabic:"اسود"},
    brand: "NiteRider"
  },{
    id: 5,
    category: {english: "accessories", arabic:"اكسسوارات"},
    type: {english: "lights", arabic: "اضاءاناره"},
    title: "GIYO Small Bike tire Pump Schrader & Presta Valve for MTB 80 PSI Telescopic Barrel All Metal CNC Portable Mini Bike Pump Secure Valve Lock for Easy Pumping | Taiwan Made GM043",
    img: "src/assets/Img/Products/GIYO Small Bike tire Pump Schrader.jpg",
    color: {english: "Grey", arabic:"رمادي"},
    brand: "GIYO"
  },{
    id: 6,
    category: {english: "clothing", arabic:"ملابس"},
    type: {english: "locks", arabic: "قفل للدراجه"},
    title: "NiteRider Lumina 1200 Boost USB Rechargeable Bike Light Powerful Lumens Bicycle Headlight LED Front Light Easy to Install for Men Women Road Mountain City Commuting Adventure Cycling Safety Flashlight",
    img: "src/assets/Img/Products/NiteRider Lumina 1200.jpg",
    color: {english: "black", arabic:"اسود"},
    brand: "NiteRider"
  },{
    id: 7,
    category: {english: "parts", arabic:"قطع الدراجه"},
    type: {english: "cages", arabic: "حماله مطره"},
    title: "GIYO Small Bike tire Pump Schrader & Presta Valve for MTB 80 PSI Telescopic Barrel All Metal CNC Portable Mini Bike Pump Secure Valve Lock for Easy Pumping | Taiwan Made GM043",
    img: "src/assets/Img/Products/GIYO Small Bike tire Pump Schrader.jpg",
    color: {english: "Grey", arabic:"رمادي"},
    brand: "GIYO"
  },{
    id: 8,
    category: {english: "clothing", arabic:"ملابس"},
    type: {english: "bike pumps", arabic:"منافخ"},
    title: "NiteRider Lumina 1200 Boost USB Rechargeable Bike Light Powerful Lumens Bicycle Headlight LED Front Light Easy to Install for Men Women Road Mountain City Commuting Adventure Cycling Safety Flashlight",
    img: "src/assets/Img/Products/NiteRider Lumina 1200.jpg",
    color: {english: "black", arabic:"اسود"},
    brand: "NiteRider"
  },{
    id: 9,
    category: {english: "accessories", arabic:"اكسسوارات"},
    type: {english: "bike pumps", arabic:"منافخ"},
    title: "GIYO Small Bike tire Pump Schrader & Presta Valve for MTB 80 PSI Telescopic Barrel All Metal CNC Portable Mini Bike Pump Secure Valve Lock for Easy Pumping | Taiwan Made GM043",
    img: "src/assets/Img/Products/GIYO Small Bike tire Pump Schrader.jpg",
    color: {english: "Grey", arabic:"رمادي"},
    brand: "GIYO"
  }]
  useEffect(() => {
    let categoriesArray = [];
    const categoriesCollecterArray = products.map(product => language === 'English' ? product.category.english : product.category.arabic);
    categoriesCollecterArray.forEach(category => {
      let matchedItem;
      categoriesArray.forEach(item => item === category && (matchedItem = true));
      matchedItem || (categoriesArray = [...categoriesArray, category]);
    })
    
    let typesArray = [];
    const typesCollecterArray = products.map(product => language === 'English' ? product.type.english : product.type.arabic);
    typesCollecterArray.forEach(product => {
      let matchedItem;
      typesArray.forEach(item => item === product && (matchedItem = true));
      matchedItem || (typesArray = [...typesArray, product]);
    })
    const typeswithCatArray = typesArray.map(type => {
      let matchedItem;
      products.forEach(product => type === (language === 'English' ? product.type.english : product.type.arabic) && (matchedItem = product));
      // console.log({matchedItem})
      return language === 'English' ? {type: matchedItem.type.english, category: matchedItem.category.english} : {type: matchedItem.type.arabic, category: matchedItem.category.arabic}
    })
    console.log({categoriesArray, typesArray, typeswithCatArray})
    setTypes(typeswithCatArray);
    setCategories(categoriesArray);

  }, [language]);

  const themeData = data => {
    setDarkMode(data);
  }
  
  const languageData = data => {
    setLanguage(data);
    console.log('lang changed', data)
  }

  return (
    <>
      <Router>
        <div className="app-layout">

          <header className="app-layout__header">
            <Header onThemeChange={themeData} onLanguageChange={languageData}/>
          </header>

          <main className="app-layout__main">
            <Routes>
              <Route path="/" element={<Home/>}/>
              {categories.map(category => 
              <Route path={`/${category}`} element={<Products category={category}/>} key ={category}/>
              )}
              {types.map(typeVal => 
              <Route path={`/${typeVal.category}/${typeVal.type}`} element={<Products category={typeVal.category} type={typeVal.type}/>} key ={typeVal.type}/>
              )}
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </main>
          
          <footer className="app-layout__footer">
            <Footer/>
          </footer>

        </div>
      </Router>
    </>
  )
}

export default App
