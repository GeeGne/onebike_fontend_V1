import React, {useState} from 'react';

import HamMenu from './HamMenu';

import '../../../Styles/Components/Header/Navbar/Navbar.scss';

import logo from '../../../assets/Img/Logo/ONEBIKE.png';

function Navbar ({darkMode, language}) {

  const [menu, setMenu] = useState(false);

  const handleClick = (type) => {
    if (type) {
      setMenu(oldMenu => !oldMenu)
    }
  }

  const handleMenuChange = (data) => {
    setMenu(data)
  }

  return (
    <>
      <nav className="nav-container">
        <button className="nav-container__hamburger" onClick={() => handleClick('ham')}/>
        <img className="nav-container__logo" src={logo}/>
        <button className="nav-container__search"/>
        <button className="nav-container__favourite"/>
        <button className="nav-container__shoppingCart"/>
        <div className="nav-container__search-input">
          <input placeholder="type something"/>
        </div>
      </nav>
      <HamMenu menu={menu} onChange={handleMenuChange} darkMode={darkMode} language={language}/>
      {/* <NavBottom/> */}
    </>
    
  )
}

export default Navbar;