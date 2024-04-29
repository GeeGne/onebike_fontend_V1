import React, {useState, useRef, useEffect} from 'react';

import HamMenu from './HamMenu';

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
      console.log(window.innerWidth);
      setSearch(webWidth >= largeWidth ? true : false)
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const inputElement = searchInputElement.current;
    inputElement.style.visibility = `${search ? 'visible' : 'hidden'}`;
    inputElement.style.opacity = `${search ? '1' : '0'}`;
    inputElement.style.transform = `translateY(${search ? '0' : '-2em'})`;
  }, [search])

  const handleClick = (type) => {
    const largeWidth = 1000;
    const webWidth = window.innerWidth;

    if (type === 'ham') {
      setMenu(oldMenu => !oldMenu)
    }

    if (type === 'search cursor hover') {
      setSearch(true)
    }

    if (type === 'search cursor leave') {
      setSearch(webWidth >= largeWidth ? true : false); 
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
        <div className="nav-container__search-input"
          onMouseEnter={() => handleClick('search cursor hover')} 
          onMouseLeave={() => handleClick('search cursor leave')}
          ref={searchInputElement}
        >
          <input placeholder={language === 'English' ? 'Type something' : 'هل تبحث عن شيء؟'}/>
          <img src={darkMode ? searchIconDarkMode : searchIcon}/>
        </div>
        <button className="nav-container__search" 
          onMouseEnter={() => handleClick('search cursor hover')} 
          onMouseLeave={() => handleClick('search cursor leave')}
        />
        <button className="nav-container__user"/>
        <button className="nav-container__favourite"/>
        <button className="nav-container__shoppingCart"/>
      </nav>

      <HamMenu menu={menu} onChange={handleMenuChange} darkMode={darkMode} language={language}/>
      {/* <NavBottom/> */}
    </>
    
  )
}

export default Navbar;