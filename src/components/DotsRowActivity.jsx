// HOOKS
import React, { useState, useRef, useEffect} from 'react';

// SCSS
import '/src/styles/components/DotsRowActivity.scss';

function DotsRowActivity () { 

  return (
    <ul className="dots">
      <li className="dots__dot --dot" />
      <li className="dots__dot --dot delay--02s" />
      <li className="dots__dot --dot delay--04s" />
      <li className="dots__dot --dot delay--06s" />
      <li className="dots__dot --dot delay--08s" />
    </ul>
  )
}

export default DotsRowActivity;