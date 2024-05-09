import React, {useState, useRef, useEffect} from 'react';

import HamMenu from './HamMenu';
import DropMenu from './DropMenu';

import '../../../Styles/Components/Header/Navbar/Navbar.scss';

import logo from '../../../assets/Img/Logo/ONEBIKE.png';
import searchIcon from '../../../assets/Img/Icons/search.svg';
import searchIconDarkMode from '../../../assets/Img/Icons/search_darkMode.svg';

function Navbar ({darkMode, language}) {

  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const searchInputElement = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const largeWidth = 1000;
      const webWidth = window.innerWidth;
      setSearch(webWidth >= largeWidth ? true : false)
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    setMenu(oldMenu => !oldMenu)
  }

  const handleHover = type => {
    const largeWidth = 1000;
    const webWidth = window.innerWidth;
    setSearch(webWidth >= largeWidth ? true : type);
  }

  const handleMenuChange = (data) => {
    setMenu(data)
  }

  return (
    <>
      <nav className="nav-container">
        <button className={`nav-container__hamburger ${menu ? 'clicked' : ''}`} onClick={handleClick}/>
        <img className="nav-container__logo" src={logo}/>
        <div className={`nav-container__search-input${search ? ' hover' : ''}`}
          onMouseEnter={() => handleHover(true)} 
          onMouseLeave={() => handleHover(false)}
          ref={searchInputElement}
        >
          <input placeholder={language === 'English' ? 'Type something' : 'هل تبحث عن شيء؟'}/>
          <img src={darkMode ? searchIconDarkMode : searchIcon}/>
        </div>
        <button className="nav-container__search" 
          onMouseEnter={() => handleHover(true)} 
          onMouseLeave={() => handleHover(false)}
        />
        <button className="nav-container__user"/>
        <button className="nav-container__favourite"/>
        <button className="nav-container__shoppingCart"/>
      </nav>
      <DropMenu menu={menu} darkMode={darkMode} language={language}/>
      <HamMenu menu={menu} onChange={handleMenuChange} darkMode={darkMode} language={language}/>
      {/* <NavBottom/> */}
    </>
    
  )
}

export default Navbar;