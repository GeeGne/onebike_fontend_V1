// HOOKS
import React, {useEffect, useRef, useState} from 'react';

// SCSS
import '/src/styles/components/Banner.scss';

function Banner ({pageTitle, description}) {

  return (
    <section className="banner">
      <h1 className="banner__title">{pageTitle}</h1>  
      {description && <div className="banner__description">{description}</div>}
    </section>
  )
}

export default Banner;