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

  const handleHover = (type, e) => {
    const element = e.currentTarget;
    type ? element.classList.add('hover') : element.classList.remove('hover');
    // setDropMenu(type);
  }
                                                         
  return (
    <>
      <section className="drop-menu" ref={dropMenuElement}>
        <ul className="drop-menu__items" ref={itemsElement}>
          {/* <li className={`drop-menu__items__item${dropMenu ? ' hover' : ''}`} onMouseEnter={(e) => handleHover(true, e)} onMouseLeave={(e) => handleHover(false, e)} ref={itemElement}>
            <h2 className="drop-menu__items__item__title">Parts</h2>
            <ul className={`drop-menu__items__item__sub-items${dropMenu ? ' hover' : ''}`} onMouseEnter={(e) => handleHover(true, e)} onMouseLeave={(e) => handleHover(false, e)} ref={subItemsElement}>
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
          <li className={`drop-menu__items__item${dropMenu ? ' hover' : ''}`} onMouseEnter={(e) => handleHover(true, e)} onMouseLeave={(e) => handleHover(false, e)} ref={itemElement}>
            <h2 className="drop-menu__items__item__title">Parts</h2>
            <ul className={`drop-menu__items__item__sub-items${dropMenu ? ' hover' : ''}`} onMouseEnter={(e) => handleHover(true, e)} onMouseLeave={(e) => handleHover(false, e)} ref={subItemsElement}>
              <li className="drop-menu__items__item__sub-items__sub-item">
                <h2 className="drop-menu__items__item__sub-items__sub-item__title">merorrs</h2>
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
                <h2 className="drop-menu__items__item__sub-items__sub-item__title">merors</h2>
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
          <li className={`drop-menu__items__item${dropMenu ? ' hover' : ''}`} onMouseEnter={(e) => handleHover(true, e)} onMouseLeave={(e) => handleHover(false, e)} ref={itemElement}>
            <h2 className="drop-menu__items__item__title">Parts</h2>
            <ul className={`drop-menu__items__item__sub-items${dropMenu ? ' hover' : ''}`} onMouseEnter={(e) => handleHover(true, e)} onMouseLeave={(e) => handleHover(false, e)} ref={subItemsElement}>
              <li className="drop-menu__items__item__sub-items__sub-item">
                <h2 className="drop-menu__items__item__sub-items__sub-item__title">flash</h2>
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
                <h2 className="drop-menu__items__item__sub-items__sub-item__title">flash</h2>
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
                <h2 className="drop-menu__items__item__sub-items__sub-item__title">flash</h2>
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
          </li> */}
          {mainListsArray.map(data =>
            <li className={`drop-menu__items__item${dropMenu ? ' hover' : ''}`} onMouseEnter={(e) => handleHover(true, e)} onMouseLeave={(e) => handleHover(false, e)} ref={itemElement}>
              <h2 key={data.mainList} className="drop-menu__items__item__title">{data.mainList}</h2>
              <ul className={`drop-menu__items__item__sub-items`} onMouseEnter={(e) => handleHover(true, e)} onMouseLeave={(e) => handleHover(false, e)} ref={subItemsElement}>
                {data.secondaryList.map(data => 
                  <li className="drop-menu__items__item__sub-items__sub-item">
                    <h2 key={data.name} className="drop-menu__items__item__sub-items__sub-item__title">{data.name}</h2>
                    <ul className="drop-menu__items__item__sub-items__sub-item__sub-sub-items">
                      <li className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item">
                      {data.thirdList.map(data =>
                          <h3 key={data} className="drop-menu__items__item__sub-items__sub-item__sub-sub-items__sub-sub-item__title">{data}</h3>
                      )}
                      </li>
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