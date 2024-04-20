//  STYLES
// import '../Styles/Globals/Theme.scss';
// import '../Styles/Globals/Fonts.scss';
import './Styles/App.scss';

//  COMPONENTS
import Header from './Components/Header/Header';
import Footer from './Components/Footer';

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
              <Route path="/" element={<h3>Home</h3>}/>
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
