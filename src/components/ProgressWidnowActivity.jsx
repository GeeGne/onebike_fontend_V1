// HOOKS
import React, {useState, useEffect, useRef} from 'react';

// SCSS
import '/src/styles/components/ProgressActivity.scss'

// ASSETS
import progressActivity from '/assets/img/icons/progress_activity.svg';

// ASSETS - DARK MODE
import progressActivityDarkMode from '/assets/img/icons/progress_activity_darkMode.svg';

function ProgressWindowActivity ({darkMode, invert}) {

  const handleSrc = () => {
    switch (true){
      case invert:
        return darkMode ? progressActivity : progressActivityDarkMode;
      default:
        return darkMode ? progressActivityDarkMode : progressActivity;
    }
  }

  return (
    <img className="progressActivity --rotate" src={handleSrc()} />
  )
}

export default ProgressWindowActivity;