import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import HamMenu from './HamMenu';
import DropMenu from './DropMenu';

import '/src/Styles/Components/Header/Navbar/Navbar.scss';

import logo from '/src/assets/Img/Logo/ONEBIKE.png';
import searchIcon from '/src/assets/Img/Icons/search.svg';
import searchIconDarkMode from '/src/assets/Img/Icons/search_darkMode.svg';

function Navbar ({darkMode, lan}) {
  
  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const searchInputElement = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const largeWidth = 1000;
      const webWidth = window.innerWidth;
      setSearch(webWidth >= largeWidth ? true : false)
    }

    handleResize();
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

  const menuData = (data) => {
    setMenu(data)
  }

  return (
    <>
      <nav className="nav-container">
        <button className={`nav-container__hamburger${menu ? ' clicked' : ''}`} onClick={handleClick}/>
          <img className="nav-container__logo" onClick={() => navigate('/') } src={logo}/>
        <div className={`nav-container__search-input${search ? ' hover' : ''}`} onMouseEnter={() => handleHover(true)}  onMouseLeave={() => handleHover(false)} ref={searchInputElement}>
          <input placeholder={lan === 'en' ? 'Type something' : 'هل تبحث عن شيء؟'}/>
          <img src={darkMode ? searchIconDarkMode : searchIcon}/>
        </div>
        <button className="nav-container__search" onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} />
        <button className="nav-container__user"/>
        <button className="nav-container__favourite"/>
        <button className="nav-container__shoppingCart"/>
      </nav>
      <DropMenu menu={menu} darkMode={darkMode} lan={lan}/>
      <HamMenu menu={menu} onMenuChange={menuData} darkMode={darkMode} lan={lan}/>
      {/* <NavBottom/> */}
      {/* <Outlet/> */}
    </>
    
  )
}

export default Navbar;