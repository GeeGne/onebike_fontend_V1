// HOOKS
import React, { useEffect, useState, useRef } from 'react';

// SCSS
import '/src/styles/components/PageIsLoading.scss';

// COMPONENTS
import DotsRowActivity from '/src/components/DotsRowActivity';

// ASSETS
import logo from '/assets/img/logo/onebike.webp';

function PageIsLoading ({ darkMode, lan }) {

  return (
    <div className="pageIsLoading">
      <img className="pageIsLoading__img" src={logo} />
      <h1 className="pageIsLoading__h1">{lan === 'ar' ? '..جاري التحميل' : 'Loading..'}</h1>
      <DotsRowActivity darkMode={darkMode} lan={lan} />
    </div>
  )
}

export default PageIsLoading;