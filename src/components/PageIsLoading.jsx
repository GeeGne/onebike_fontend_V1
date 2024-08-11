// HOOKS
import React, { useEffect, useState, useRef } from 'react';

// SCSS
import '/src/styles/components/PageIsLoading.scss';

// COMPONENTS
import DotsRowActivity from '/src/components/DotsRowActivity';

function PageIsLoading ({ darkMode, lan }) {

  return (
    <div className="pageIsLoading">
      <h1 className="pageIsLoading__h1">Loading...</h1>
      <DotsRowActivity darkMode={darkMode} lan={lan} />
    </div>
  )
}

export default PageIsLoading;