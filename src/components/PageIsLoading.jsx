// HOOKS
import React, { useEffect, useState, useRef } from 'react';

// SCSS
import '/src/styles/components/PageIsLoading.scss';

// COMPONENTS
import DotsRowActivity from '/src/components/DotsRowActivity';

// UTILS
import localStorage from '/src/utils/localStorage';

// ASSETS
import logo from '/assets/img/logo/onebike.webp';

function PageIsLoading ({ type, darkMode, lan }) {

  if (type === 'a') {
    darkMode = localStorage.get('darkTheme') || false;
    lan = localStorage.get('lan') || false;
    if (darkMode) document.body.classList.add('dark-theme');
  }

  return (
    <div className={`pageIsLoading${type === 'b' ? ' b --panel-flick' : ''}`}>
      {type === 'a' 
      ? <>
          <img className="pageIsLoading__img" src={logo} alt="onebike logo" fetchpriority="high" />
          <h1 className="pageIsLoading__h1">{lan === 'ar' ? '..جاري التحميل' : 'Loading..'}</h1>
          <DotsRowActivity darkMode={darkMode} lan={lan} />
        </> 
      : <>
          <div className="pageIsLoading__banner" />  
          <ul className="pageIsLoading__grid">
            <li className="pageIsLoading__grid__block" />
            <li className="pageIsLoading__grid__block" />
            <li className="pageIsLoading__grid__block" />
            <li className="pageIsLoading__grid__block" />
            <li className="pageIsLoading__grid__block" />
            <li className="pageIsLoading__grid__block" />
          </ul>
        </>
      }
    </div>
  )
}

export default PageIsLoading;