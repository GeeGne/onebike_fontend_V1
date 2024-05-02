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

  // const mainListData = {
  //   english: [{
  //     mainList: 'Bikes',
  //     secondaryList: ['Road Bikes', 'Mountain Bikes', 'Hybird Bikes']
  //   },{
  //     mainList: 'Accessories',
  //     secondaryList: ['Flash lights', 'Horns', 'Wear', 'Stickers']
  //   },{
  //     mainList: 'Components',
  //     secondaryList: ['Handle Bar', 'Chain', 'Wheels', 'Frames', 'Forks']
  //   },{
  //     mainList: 'Clothing',
  //     secondaryList: ['Upper Body', 'Lower Body', 'Essentials', 'Helmets', 'Shoes']
  //   },{
  //     mainList: 'Helmets & Shoes',
  //     secondaryList: ['Handle Bar', 'Chain', 'Wheels', 'Frames', 'Forks']
  //   }],
  //   arabic: [{
  //     mainList: 'دراجات',
  //     secondaryList: ['سباقي', 'جبلي', 'هجين']
  //   },{
  //     mainList: 'اكسسوارات',
  //     secondaryList: ['سباقي', 'جبلي', 'هجين']
  //   },{
  //     mainList: 'قطع الدراجه',
  //     secondaryList: ['سباقي', 'جبلي', 'هجين']
  //   }]
  // }

  const mainListData = {
    english: [{
      mainList: 'Bikes',
      secondaryList: [{
        name:  'Road Bikes',
        thirdList: ['one', 'two', 'three']
      },{
        name:  'Mountain Bikes',
        thirdList: ['one', 'two', 'three']
      },{
        name:  'Hybird Bikes',
        thirdList: ['one', 'two', 'three']
      }]
    },{
      mainList: 'Accessories',
      secondaryList: [{
        name:  'Road Bikes',
        thirdList: ['one', 'two', 'three']
      },{
        name:  'Mountain Bikes',
        thirdList: ['one', 'two', 'three']
      },{
        name:  'Hybird Bikes',
        thirdList: ['one', 'two', 'three']
      }]
    },{
      mainList: 'Components',
      secondaryList: [{
        name:  'Road Bikes',
        thirdList: ['one', 'two', 'three']
      },{
        name:  'Mountain Bikes',
        thirdList: ['one', 'two', 'three']
      },{
        name:  'Hybird Bikes',
        thirdList: ['one', 'two', 'three']
      }]
    },{
      mainList: 'Clothing',
      secondaryList: [{
        name:  'Road Bikes',
        thirdList: ['one', 'two', 'three']
      },{
        name:  'Mountain Bikes',
        thirdList: ['one', 'two', 'three']
      },{
        name:  'Hybird Bikes',
        thirdList: ['one', 'two', 'three']
      }]
    },{
      mainList: 'Helmets & Shoes',
      secondaryList: [{
        name:  'Road Bikes',
        thirdList: ['one', 'two', 'three']
      },{
        name:  'Mountain Bikes',
        thirdList: ['one', 'two', 'three']
      },{
        name:  'Hybird Bikes',
        thirdList: ['one', 'two', 'three']
      }]
    }],
    arabic: [{
      mainList: 'دراجات',
      secondaryList: [{
        name:  'Road Bikes',
        thirdList: ['one', 'two', 'three']
      },{
        name:  'Mountain Bikes',
        thirdList: ['one', 'two', 'three']
      },{
        name:  'Hybird Bikes',
        thirdList: ['one', 'two', 'three']
      }]
    },{
      mainList: 'اكسسوارات',
      secondaryList: [{
        name:  'Road Bikes',
        thirdList: ['one', 'two', 'three']
      },{
        name:  'Mountain Bikes',
        thirdList: ['one', 'two', 'three']
      },{
        name:  'Hybird Bikes',
        thirdList: ['one', 'two', 'three']
      }]
    },{
      mainList: 'قطع الدراجه',
      secondaryList: [{
        name:  'Road Bikes',
        thirdList: ['one', 'two', 'three']
      },{
        name:  'Mountain Bikes',
        thirdList: ['one', 'two', 'three']
      },{
        name:  'Hybird Bikes',
        thirdList: ['one', 'two', 'three']
      }]
    }]
  }

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
        <button className="nav-container__hamburger" onClick={handleClick}/>
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
      <DropMenu menu={menu} darkMode={darkMode} language={language} mainListData={mainListData}/>
      {/* <HamMenu menu={menu} onChange={handleMenuChange} darkMode={darkMode} language={language} mainListData={mainListData}/> */}
      {/* <NavBottom/> */}
    </>
    
  )
}

export default Navbar;