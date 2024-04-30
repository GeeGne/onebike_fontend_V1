import React, {useEffect, useState, useRef} from 'react';

import '../../../Styles/Components/Header/Navbar/DropMenu.scss';

function DropMenu ({darkMode, language, mainListData}) {

  const [dropMenu, setDropMenu] = useState(false);

  const dropMenuElement = useRef(null);
  const dropMenuContentElement = useRef(null);

  const mainListsArray = language === 'English' ? mainListData.english : mainListData.arabic;

  useEffect(() => {
    const {scrollHeight} = dropMenuContentElement.current;
    dropMenuElement.current.style.height = '0';
    setTimeout(() => dropMenuElement.current.style.height = `${scrollHeight}px`, 1000);
  }, [dropMenu])

  return (
    <>
      <section className="drop-menu" ref={dropMenuElement}>
        <ul className="drop-menu__items" ref={dropMenuContentElement}>
          <li className="drop-menu__items__item">
            <h2 className="drop-menu__items__item__title">Parts</h2>
            <ul className="drop-menu__items__item__sub-items">
              <li className="drop-menu__items__item__sub-items__sub-item">
                <h2 className="drop-menu__items__item__sub-items__sub-item__title">Wheels</h2>
                <ul className="drop-menu__items__item__sub-items__sub-item__sub-sub-items">
                  <li className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item">
                    <h2 className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item__title"></h2>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="drop-menu__items__item">
            <h2 className="drop-menu__items__item__title">Parts</h2>
            <ul className="drop-menu__items__item__sub-items">
              <li className="drop-menu__items__item__sub-items__sub-item">
                <h2 className="drop-menu__items__item__sub-items__sub-item__title">Wheels</h2>
                <ul className="drop-menu__items__item__sub-items__sub-item__sub-sub-items">
                  <li className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item">
                    <h2 className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item__title"></h2>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="drop-menu__items__item">
            <h2 className="drop-menu__items__item__title">Parts</h2>
            <ul className="drop-menu__items__item__sub-items">
              <li className="drop-menu__items__item__sub-items__sub-item">
                <h2 className="drop-menu__items__item__sub-items__sub-item__title">Wheels</h2>
                <ul className="drop-menu__items__item__sub-items__sub-item__sub-sub-items">
                  <li className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item">
                    <h2 className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item__title"></h2>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <button></button>
      </section>
    </>
  )
}

export default DropMenu;