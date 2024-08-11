// HOOKS
import React, { useState, useRef, useEffect} from 'react';

// SCSS
import '/src/styles/components/DotsRowActivity.scss';

function DotsRowActivity () { 

  return (
    <ul className="dots">
      <li className="dots__dot --dot" />
      <li className="dots__dot --dot delay--03s" />
      <li className="dots__dot --dot delay--06s" />
      <li className="dots__dot --dot delay--09s" />
      <li className="dots__dot --dot delay--1o2s" />
    </ul>
  )
}

export default DotsRowActivity;