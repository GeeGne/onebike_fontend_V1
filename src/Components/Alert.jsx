import React, {useState, useRef, useEffect} from 'react';

import '../Styles/Components/Alert.scss';

function Alert ({alertText}) {

  const alertElement = useRef(null)
  const alertMessageElement = useRef(null)
  const alertFillerElement = useRef(null)
  const alertTimerElement = useRef(null)
  
  useEffect (() => {
    alertElement.current.classList.remove('alertFadeIn--opacity', 'alertFadeOut');
    alertMessageElement.current.classList.remove('alertFadeIn--opacity');
    alertFillerElement.current.classList.remove('alert-popIn');
    alertTimerElement.current.classList.remove('alert--timer');

    setTimeout(() => {
      alertElement.current.classList.add('alertFadeIn--opacity', 'alertFadeOut');
      alertMessageElement.current.classList.add('alertFadeIn--opacity');
      alertFillerElement.current.classList.add('alert-popIn');
      alertTimerElement.current.classList.add('alert--timer');
    }, 10)
    console.log('test');
  }, [alertText])

  return (
    <>
      <div className="alert-container" ref={alertElement}>
        <h2 className="alert-container__message" ref={alertMessageElement}>{alertText}</h2>
        <div className="alert-container__filler-animation" ref={alertFillerElement}/>
        <div className="alert-container__timer-animation" ref={alertTimerElement}/>
      </div>
    </>
  )
}

export default Alert;