//  STYLES
// import '../Styles/Globals/Theme.scss';
// import '../Styles/Globals/Fonts.scss';
import './Styles/App.scss';

//  COMPONENTS
import Header from './Components/Header/Header';
import Footer from './Components/Footer';
import Home from './Components/Pages/Home';

// HOOKS
import React, {useEffect, useRef} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

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
