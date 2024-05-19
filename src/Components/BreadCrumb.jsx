import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

// SCSS
import '/src/Styles/Components/BreadCrumb.scss';

// Utils
import strSlashSplit from '/src/Utils/strSlashSplit.js';
import cleanseString from '/src/Utils/cleanseString.js';

function BreadCrumb ({category, type, lan}) {

  return (
    <> 
      <ul className="breadCrumb-list">
        <li className="breadCrumb-list__item-container">
          <Link className="breadCrumb-list__item-container__link" to="/">{lan === 'en' ? 'Home' : 'الرئيسيه'} </Link>
          <span className="breadCrumb-list__item-container__quotation-mark-ornament">&#10095;</span>
        </li>
        {type ? 
        <li className ="breadCrumb-list__item-container">
          <Link className="breadCrumb-list__item-container__link" to={'/' + cleanseString(category.en)}>{category[lan]}</Link> 
          <span className="breadCrumb-list__item-container__quotation-mark-ornament">&#10095;</span>
          <Link className="breadCrumb-list__item-container__link" to={'/' + cleanseString(category.en) + '/' + cleanseString(type.en) }>{type[lan]}</Link> 
        </li>
        :  
        <li className ="breadCrumb-list__item-container">
          <Link className="breadCrumb-list__item-container__link" to={'/' + cleanseString(category.en)}>{category[lan]}</Link> 
        </li> 
        }
      </ul>
    </>
  )
}

export default BreadCrumb;