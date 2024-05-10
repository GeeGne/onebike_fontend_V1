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
import products from '/src/Data/Products.json';

// HOOKS
import React, {useEffect, useRef} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  useEffect(() => {
    console.log(products)
  })

  return (
    <>
      <Router>
        <div className="app-layout">

          <header className="app-layout__header">
            <Header/>
          </header>

          <main className="app-layout__main">
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/accesories/lights" element={<Products type={'lights'}/>}/>
              <Route path="/accesories" element={<Products gategory={'accesories'}/>}/>
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
