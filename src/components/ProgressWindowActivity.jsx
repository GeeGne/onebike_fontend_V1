// HOOKS
import React, {useState, useEffect, useRef} from 'react';

// SCSS
import '/src/styles/components/ProgressWindowActivity.scss'

// ASSETS
import progressActivity from '/assets/img/icons/progress_activity.svg';

// ASSETS - DARK MODE
import progressActivityDarkMode from '/assets/img/icons/progress_activity_darkMode.svg';

function ProgressWindowActivity ({ darkMode, windowActivity, invert }) {

  const handleSrc = () => {
    switch (true){
      case invert:
        return darkMode ? progressActivity : progressActivityDarkMode;
      default:
        return darkMode ? progressActivityDarkMode : progressActivity;
    }
  }

  return (
    <div className={`progressWindowActivity${windowActivity}`}>
      <img className="progressWindowActivity__img" src={handleSrc()} />
    </div>
  )
}

export default ProgressWindowActivity;