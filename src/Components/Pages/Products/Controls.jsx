import React, {useState, useRef, useEffect} from 'react';
import '/src/Styles/Components/Pages/Products/Controls.scss';

import arrowDropDown from '/src/assets/Img/Icons/arrow_drop_down.svg';
import arrowDropDownDarkMode from '/src/assets/Img/Icons/arrow_drop_down_darkMode.svg';
import keyboardArrowDropDown from '/src/assets/Img/Icons/keyboard_arrow_down.svg';
import keyboardArrowDropDownDarkMode from '/src/assets/Img/Icons/keyboard_arrow_down_darkMode.svg';
import filter from '/src/assets/Img/Icons/filter_list.svg';
import filterDarkMode from '/src/assets/Img/Icons/filter_list_darkMode.svg';

function Controls ({darkMode, language}) {

  const [sortBy, setSortBy] = useState(false);
  const [sortType, setSortType] = useState('Sort by');

  useEffect(() => {
    sortType === 'Sort by' && setSortType('تصنيف حسب')
    sortType === 'Price: Low to Hight' && setSortType('السعر: منخفض الى مرتفع')
    sortType === 'Price: Hight to Low' && setSortType('السعر: مرتفع الى منخفض')
    sortType === 'Newest' && setSortType('الاجدد')
    sortType === 'Popularity' && setSortType('الاكثر شهره')
    
    sortType === 'تصنيف حسب' && setSortType('Sort by')
    sortType === 'السعر: منخفض الى مرتفع' && setSortType('Price: Low to Hight' )
    sortType === 'السعر: مرتفع الى منخفض' && setSortType('Price: Hight to Low' )
    sortType === 'الاجدد' && setSortType('Newest')
    sortType === 'الاكثر شهره' && setSortType('Popularity')
  }, [language]);

  return (
    <>
      <div className="controls-container">
        <button className={"controls-container__sort-by-button" + (sortBy ? ' clicked' : '')} onClick={() => setSortBy(oldVal => !oldVal)}>
          <h3 className="controls-container__sort-by-button__h3">{sortType}</h3>
          <img className="controls-container__sort-by-button__down-arrow-icon" src={darkMode ? keyboardArrowDropDownDarkMode : keyboardArrowDropDown}/>
          <ul className="controls-container__sort-by-button__expanded-list">
            <li className="controls-container__sort-by-button__expanded-list__item" onClick={e => setSortType(language === 'english' ? 'Sort by' : 'تصنيف حسب')}>{language === 'english' ? 'Default' : 'افتراضي'}</li>
            <li className="controls-container__sort-by-button__expanded-list__item" onClick={e => setSortType(e.currentTarget.textContent)}>{language === 'english' ? 'Price: Low to Hight' : 'السعر: منخفض الى مرتفع'}</li>
            <li className="controls-container__sort-by-button__expanded-list__item" onClick={e => setSortType(e.currentTarget.textContent)}>{language === 'english' ? 'Price: Hight to Low' : 'السعر: مرتفع الى منخفض'}</li>
            <li className="controls-container__sort-by-button__expanded-list__item" onClick={e => setSortType(e.currentTarget.textContent)}>{language === 'english' ? 'Newest' : 'الاجدد'}</li>
            <li className="controls-container__sort-by-button__expanded-list__item" onClick={e => setSortType(e.currentTarget.textContent)}>{language === 'english' ? 'Popularity' : 'الاكثر شهره'}</li>
          </ul>
        </button>
        <button className="controls-container__filter-button">
          <h3 className="controls-container__sort-by-button__h3">{language === 'english' ? 'Filter' : 'تصفيه'}</h3>
          <img src={darkMode ? filterDarkMode : filter}/>
        </button>
      </div>
    </>
  )
}

export default Controls;