// HOOKS
import React, {useEffect, useRef, useState} from 'react';

// SCSS
import '/src/styles/components/Banner.scss';

function Banner ({pageTitle}) {

  return (
    <section className="banner-container">{pageTitle}</section>
  )
}

export default Banner;