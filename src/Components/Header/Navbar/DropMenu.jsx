import React, {useEffect, useState, useRef} from 'react';

import '../../../Styles/Components/Header/Navbar/DropMenu.scss';

function DropMenu ({darkMode, language, mainListData, menu}) {

  const [dropMenu, setDropMenu] = useState(false);

  const dropMenuElement = useRef(null);
  const itemsElement = useRef(null);
  const subItemsElement = useRef(null);
  const itemElement = useRef(null);

  const mainListsArray = language === 'English' ? mainListData.english : mainListData.arabic;

  useEffect(() => {
    const itemsElementSH= itemsElement.current.scrollHeight;
    const subItemsElementSH= subItemsElement.current.scrollHeight;
    const dropHeight = itemsElementSH - subItemsElementSH

    dropMenuElement.current.style.height = `${menu ? String(dropHeight) : '0'}px`;
  }, [menu])

  const handleHover = type => {
    setDropMenu(type);
  }

  return (
    <>
      <section className="drop-menu" ref={dropMenuElement}>
        <ul className="drop-menu__items" ref={itemsElement}>
          <li className={`drop-menu__items__item${dropMenu ? ' hover' : ''}`} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} ref={itemElement}>
            <h2 className="drop-menu__items__item__title">Parts</h2>
            <ul className={`drop-menu__items__item__sub-items${dropMenu ? ' hover' : ''}`} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)} ref={subItemsElement}>
              <li className="drop-menu__items__item__sub-items__sub-item">
                <h2 className="drop-menu__items__item__sub-items__sub-item__title">Wheels</h2>
                <ul className="drop-menu__items__item__sub-items__sub-item__sub-sub-items">
                  <li className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item">
                    <h3 className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item__title">Mountains</h3>
                    <h3 className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item__title">Mountains</h3>
                    <h3 className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item__title">Mountains</h3>
                    <h3 className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item__title">Mountains</h3>
                  </li>
                </ul>
              </li>
              <li className="drop-menu__items__item__sub-items__sub-item">
                <h2 className="drop-menu__items__item__sub-items__sub-item__title">Wheels</h2>
                <ul className="drop-menu__items__item__sub-items__sub-item__sub-sub-items">
                  <li className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item">
                    <h3 className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item__title">Mountains</h3>
                    <h3 className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item__title">Mountains</h3>
                    <h3 className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item__title">Mountains</h3>
                    <h3 className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item__title">Mountains</h3>
                  </li>
                </ul>
              </li>
              <li className="drop-menu__items__item__sub-items__sub-item">
                <h2 className="drop-menu__items__item__sub-items__sub-item__title">Wheels</h2>
                <ul className="drop-menu__items__item__sub-items__sub-item__sub-sub-items">
                  <li className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item">
                    <h3 className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item__title">Mountains</h3>
                    <h3 className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item__title">Mountains</h3>
                    <h3 className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item__title">Mountains</h3>
                    <h3 className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item__title">Mountains</h3>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          {/* <li className="drop-menu__items__item">
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
          </li> */}
        </ul>
      </section>
    </>
  )
}

export default DropMenu;