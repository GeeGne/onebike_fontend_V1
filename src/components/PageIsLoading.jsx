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

  const logoImgEL = useRef(null);

  if (type === 'a') {
    darkMode = localStorage.get('darkTheme') || false;
    lan = localStorage.get('lan') || false;
    if (darkMode) document.body.classList.add('dark-theme');
    document.body.style.transition= "background-color 0.5s ease-in";
  }     

  const handleLoad = e => {
    const { type } = e.currentTarget.dataset;

    switch (type) {
      case 'onebike_logo':
        logoImgEL.current.classList.add('--fade-in', '--animate-015s');
        break;
      default:
        console.error('Unknown type: ', type);
    }
  }

  return (
    <div className={`pageIsLoading${type === 'b' ? ' b --panel-flick' : ' --fade-in animate--02s'}`}>
      {type === 'a' 
      ? <>
          <img className="pageIsLoading__img" src={logo} alt="onebike logo" fetchpriority="high" data-type="onebike_logo" onLoad={handleLoad} ref={logoImgEL} />
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