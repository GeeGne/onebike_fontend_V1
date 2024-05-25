// HOOKS
import React, {useState, useRef, useEffect} from 'react';

// SCSS
import '/src/styles/components/pages/products/Controls.scss';

// ICONS
import filter from '/src/assets/img/icons/filter_list.svg';
import arrowDropDown from '/src/assets/img/icons/arrow_drop_down.svg';
import keyboardArrowDropDown from '/src/assets/img/icons/keyboard_arrow_down.svg';

// ICONS - DARK MODE
import filterDarkMode from '/src/assets/img/icons/filter_list_darkMode.svg';
import arrowDropDownDarkMode from '/src/assets/img/icons/arrow_drop_down_darkMode.svg';
import keyboardArrowDropDownDarkMode from '/src/assets/img/icons/keyboard_arrow_down_darkMode.svg';

function Controls ({darkMode, lan}) {

  const [sortBy, setSortBy] = useState(false);
  const [sortType, setSortType] = useState('Sort by');

  useEffect(() => {
    if (lan ==='ar') {
      sortType === 'Sort by' && setSortType('تصنيف حسب');
      sortType === 'Price: Low to Hight' && setSortType('السعر: منخفض الى مرتفع');
      sortType === 'Price: Hight to Low' && setSortType('السعر: مرتفع الى منخفض');
      sortType === 'Newest' && setSortType('الاجدد');
      sortType === 'Popularity' && setSortType('الاكثر شهره');
    } else if (lan === 'en') {
      sortType === 'تصنيف حسب' && setSortType('Sort by');
      sortType === 'السعر: منخفض الى مرتفع' && setSortType('Price: Low to Hight' );
      sortType === 'السعر: مرتفع الى منخفض' && setSortType('Price: Hight to Low' );
      sortType === 'الاجدد' && setSortType('Newest');
      sortType === 'الاكثر شهره' && setSortType('Popularity');
    }
  }, [lan]);

  return (
    <div className="controls-container">
      <button className={"controls-container__sort-by-button" + (sortBy ? ' clicked' : '')} onClick={() => setSortBy(oldVal => !oldVal)}>
        <h3 className="controls-container__sort-by-button__h3">{sortType}</h3>
        <img className="controls-container__sort-by-button__down-arrow-icon" src={darkMode ? keyboardArrowDropDownDarkMode : keyboardArrowDropDown}/>
        <ul className="controls-container__sort-by-button__expanded-list">
          <li className="controls-container__sort-by-button__expanded-list__item" onClick={e => setSortType(lan === 'en' ? 'Sort by' : 'تصنيف حسب')}>{lan === 'en' ? 'Default' : 'افتراضي'}</li>
          <li className="controls-container__sort-by-button__expanded-list__item" onClick={e => setSortType(e.currentTarget.textContent)}>{lan === 'en' ? 'Price: Low to Hight' : 'السعر: منخفض الى مرتفع'}</li>
          <li className="controls-container__sort-by-button__expanded-list__item" onClick={e => setSortType(e.currentTarget.textContent)}>{lan === 'en' ? 'Price: Hight to Low' : 'السعر: مرتفع الى منخفض'}</li>
          <li className="controls-container__sort-by-button__expanded-list__item" onClick={e => setSortType(e.currentTarget.textContent)}>{lan === 'en' ? 'Newest' : 'الاجدد'}</li>
          <li className="controls-container__sort-by-button__expanded-list__item" onClick={e => setSortType(e.currentTarget.textContent)}>{lan === 'en' ? 'Popularity' : 'الاكثر شهره'}</li>
        </ul>
      </button>
      <button className="controls-container__filter-button">
        <h3 className="controls-container__sort-by-button__h3">{lan === 'en' ? 'Filter' : 'تصفيه'}</h3>
        <img src={darkMode ? filterDarkMode : filter}/>
      </button>
    </div>
  )
}

export default Controls;