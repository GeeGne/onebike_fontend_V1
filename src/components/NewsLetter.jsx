// HOOKS
import React, {useEffect, useState, useRef} from 'react';

// SCSS
import '/src/styles/components/NewsLetter.scss';

// ICONS
import oneBikeLogo from '/src/assets/img/logo/onebike.webp';
import test from '/src/assets/img/logo/test6.png';
import test2 from '/src/assets/img/logo/test13.png';

function NewsLetter () {

  return (                                                                           
    <div className="newsLetter-container"> 
      <div className="newsLetter-container__content">
        {/* <h1>Join ONE BIKE's Journey!</h1> */}
        {/* <h2>Create Memories and Boost Your Fitness with ONE BIKE!</h2> */}
        {/* <img src={test}  style={{width: "18em"}}/> */}
        {/* <h1 className="newsLetter-container__content__title"><span className="one-bike"><span className="colored">O</span>NE <span className="colored">B</span>IKE</span> Daily newsletter</h1> */}
        <h1 className="newsLetter-container__content__title">
          <img src={test} style={{width: "12em"}}/>
          <img src={test2} style={{width: "12em"}}/>
        </h1>
        {/* <img className="newsLetter-container__content__title" src={test}  style={{width: "18em"}}/> */}
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