import React, {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

import mainListData from '/src/Data/Menu.json';

import '../../../Styles/Components/Header/Navbar/DropMenu.scss';

function DropMenu ({darkMode, language, menu}) {

  const [dropMenu, setDropMenu] = useState(false);

  const dropMenuElement = useRef(null);
  const itemsElement = useRef(null);
  const subItemsElement = useRef(null);
  const itemElement = useRef(null);

  const navigate = useNavigate();

  const mainListsArray = language === 'English' ? mainListData.english : mainListData.arabic;

  useEffect(() => {
    const itemsElementSH= itemsElement.current.scrollHeight;
    const subItemsElementSH= subItemsElement.current.scrollHeight;
    const dropHeight = itemsElementSH - subItemsElementSH 

    // dropMenuElement.current.style.height = `${menu ? String(dropHeight) : '0'}px`;
    dropMenuElement.current.style.height = `${menu ? '48' : '0'}px`;
  }, [menu])

  const handleHover = (type, e) => {
    const element = e.currentTarget;
    type ? element.classList.add('hover') : element.classList.remove('hover');
    // setDropMenu(type);
  }
                                                         
  return (
    <>
      <section className="drop-menu" ref={dropMenuElement}>
        <ul className="drop-menu__items" ref={itemsElement}>
          {mainListsArray.map(mainData =>
          <li className={`drop-menu__items__item${dropMenu ? ' hover' : ''}`} onMouseEnter={(e) => handleHover(true, e)} onMouseLeave={(e) => handleHover(false, e)} ref={itemElement} key={mainData.id}>
            <h2 className="drop-menu__items__item__title">{mainData.mainList}</h2>
            <ul className={`drop-menu__items__item__sub-items`} onMouseEnter={(e) => handleHover(true, e)} onMouseLeave={(e) => handleHover(false, e)} ref={subItemsElement}>
              {mainData.secondaryList.map(secondData => 
              <li className="drop-menu__items__item__sub-items__sub-item" key={secondData.id}>
                <h2 className="drop-menu__items__item__sub-items__sub-item__title">{secondData.name}</h2>
                <ul className="drop-menu__items__item__sub-items__sub-item__sub-sub-items">
                  {secondData.thirdList.map(thirdData =>
                  <li className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item" onClick={() => navigate(`/${mainData.mainList.toLowerCase()}/${thirdData.toLowerCase()}`)} key={thirdData}>
                    <h3 className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item__title">{thirdData}</h3>
                  </li>
                  )}
                </ul>
              </li>
              )}
            </ul>
          </li>
           )}
        </ul>
      </section>
    </>
  )
}

export default DropMenu;