// HOOKS
import React, {useState, useEffect, useRef} from 'react';

// SCSS
import '/src/styles/components/TwoBarsActivity.scss';

// ASSETS TEST
import checkIcon from '/assets/img/icons/check.svg';

function TwoBarsActivity ({darkMode, icon}) {

  return (
    <div className="sticks-cont">
      <img className="sticks-cont__img" src={icon} />
      <div className="sticks-cont__stick-a --stick-a"/>
      <div className="sticks-cont__stick-b --stick-b"/>
    </div>
  )
}

export default TwoBarsActivity;