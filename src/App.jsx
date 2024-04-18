//  STYLES
// import '../Styles/Globals/Theme.scss';
// import '../Styles/Globals/Fonts.scss';
import './Styles/App.scss';

//  COMPONENTS
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';

// HOOKS
import React, {useEffect, useRef} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  const handleClick = () => {
    document.body.classList.toggle('dark-theme');
  }

  return (
    <>
      <Router>
        <div className="app-layout">

          <header>
            <Header/>
          </header>

          <Routes>
            <Route path="/" element={<h3>Home</h3>}/>
          </Routes>
          
          <footer>
            <Footer/>
          </footer>

        </div>
      </Router>
    </>
  )
}

export default App
