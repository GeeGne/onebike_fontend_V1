// HOOKS
import React, {useEffect, useState, useRef} from 'react';

// SCSS
import '/src/styles/components/NewsLetter.scss';

// ICONS
import oneBikeLogo from '/assets/img/logo/onebike.webp';
import test from '/assets/img/logo/test6.png';
import test2 from '/assets/img/logo/test13.png';

function NewsLetter () {

  return (                                                                           
    <div className="newsLetter-container"> 
      <div className="newsLetter-container__content">
        <h1 className="newsLetter-container__content__title">
          <img src={test} style={{width: "12em"}}/>
          <img src={test2} style={{width: "12em"}}/>
        </h1>
        <h2 className="newsLetter-container__content__description"><span className="firstLetter">S</span>tay updated on our exciting team activity events, discover the newest bicycle equipment in our store and exclusive hot sales!</h2>
        <label className="newsLetter-container__content__paragraph" htmlFor="email">keep connected with ONE BIKE community.</label>
        <div className="newsLetter-container__content__toggles">
          <div className="newsLetter-container__content__toggles__input-container">
            <img className="newsLetter-container__content__toggles__input-container__logo" src={oneBikeLogo}/>
            <input className="newsLetter-container__content__toggles__input-container__input" placeholder="Email address" id="email" type="text"/>
          </div>
          <button className="newsLetter-container__content__toggles__subscribe-button">Subscribe</button>
        </div>
      </div>
    </div>
  )
}

export default NewsLetter;