import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

// SCSS
import '/src/Styles/Components/BreadCrumb.scss';

// Utils
import strSlashSplit from '/src/Utils/strSlashSplit.js';
import cleanseString from '/src/Utils/cleanseString.js';

function BreadCrumb ({category, type, language}) {

  return (
    <> 
      <ul className="breadCrumb-list">
        <li className="breadCrumb-list__item-container">
          <Link className="breadCrumb-list__item-container__link" to="/">{language === 'english' ? 'Home' : 'الرئيسيه'} </Link>
          <span className="breadCrumb-list__item-container__quotation-mark-ornament">&#10095;</span>
        </li>
        {type ? 
        <li className ="breadCrumb-list__item-container">
          <Link className="breadCrumb-list__item-container__link" to={'/' + cleanseString(category.english)}>{category[language]}</Link> 
          <span className="breadCrumb-list__item-container__quotation-mark-ornament">&#10095;</span>
          <Link className="breadCrumb-list__item-container__link" to={'/' + cleanseString(category.english) + '/' + cleanseString(type.english) }>{type[language]}</Link> 
        </li>
        :  
        <li className ="breadCrumb-list__item-container">
          <Link className="breadCrumb-list__item-container__link" to={'/' + cleanseString(category.english)}>{category[language]}</Link> 
        </li> 
        }
      </ul>
    </>
  )
}

export default BreadCrumb;