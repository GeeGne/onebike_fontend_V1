import React, {useState, useRef, useEffect} from 'react';

import '../Styles/Components/Alert.scss';

function Alert ({alertText, newAlert}) {

  const alertElement = useRef(null);
  const alertMessageElement = useRef(null);
  const alertFillerElement = useRef(null);
  const alertTimerElement = useRef(null);
  const afterTimerID = useRef(null);
  
  useEffect (() => {
    if (!alertText) {
      // alertElement.current.classList.add('animation--none');
      alertElement.current.style.opacity = '0';
      return;
    }

    alertElement.current.classList.remove('animation--none');
    alertElement.current.classList.remove('alertFadeOut');
    alertMessageElement.current.classList.remove('alertFadeIn--opacity');
    alertFillerElement.current.classList.remove('alert-popIn');
    alertTimerElement.current.classList.remove('alert--timer');
    alertElement.current.style.setProperty('--after-opacity', '0');

    setTimeout(() => {
      alertElement.current.classList.add('alertFadeOut');
      alertMessageElement.current.classList.add('alertFadeIn--opacity');
      alertFillerElement.current.classList.add('alert-popIn');
      alertTimerElement.current.classList.add('alert--timer');
    }, 10)

    clearTimeout(afterTimerID.current);
    afterTimerID.current = setTimeout(() => {
      alertElement.current.style.setProperty('--after-opacity', '1');
    }, 1000)
  }, [alertText, newAlert])

  const handleClick = () => {
    alertElement.current.classList.add('animation--none');
  }

  return (
    <>
      <div className="alert-container" onClick={handleClick} ref={alertElement}>
        <h3 className="alert-container__message" ref={alertMessageElement}>{alertText}</h3>
        <div className="alert-container__filler-animation" ref={alertFillerElement}/>
        <div className="alert-container__timer-animation" ref={alertTimerElement}/>
      </div>
    </>
  )
}

export default Alert;