import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

// SCSS
import '/src/Styles/Components/BreadCrumb.scss';

// Utils
import strSlashSplit from '/src/Utils/strSlashSplit.js';

function BreadCrumb () {

  // useEffect (() => {

    const pathname = decodeURIComponent(window.location.pathname);
    console.log(pathname)

  // }, [])

  return (
    <> 
      <ul className="breadCrumb-list">
        <li className="breadCrumb-list__item-container">
          <Link className="breadCrumb-list__item-container__link" to="/">home </Link>
          <span className="breadCrumb-list__item-container__quotation-mark-ornament">&#10095;</span>
        </li>
        {strSlashSplit(pathname).map((val, i) => 
        <li className ="breadCrumb-list__item-container" key={i}>
          <Link className="breadCrumb-list__item-container__link" to={`${i === 0 ? '/' + val : '#'}`}>{val}</Link> 
          {i === strSlashSplit(pathname).length - 1 ? '' : <span className="breadCrumb-list__item-container__quotation-mark-ornament">&#10095;</span>}
        </li>
        )}
      </ul>
    </>
  )
}

export default BreadCrumb;