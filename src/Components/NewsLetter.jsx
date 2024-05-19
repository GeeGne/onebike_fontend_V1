// HOOKS
import React, {useEffect, useState, useRef} from 'react';

// SCSS
import '/src/Styles/Components/NewsLetter.scss';



function NewsLetter () {

  return (
    <div className="newsLetter-container"> 
      <div className="newsLetter-container__content">
        {/* <h1>Join ONE BIKE's Journey!</h1> */}
        {/* <h2>Create Memories and Boost Your Fitness with ONE BIKE!</h2> */}
        <h1 className="newsLetter-container__content__title"><span className="one-bike"><span className="colored">O</span>NE <span className="colored">B</span>IKE</span> Daily newsletter</h1>
        <h2 className="newsLetter-container__content__description"><span class="firstLetter">S</span>tay updated on our exciting team activity events, discover the newest bicycle equipment in our store and exclusive hot sales</h2>
        <label className="newsLetter-container__content__paragraph" for="email">keep connected with ONE BIKE community.</label>
        <div className="newsLetter-container__content__toggles">
          <div className="newsLetter-container__content__toggles__input-container">
            <img className="newsLetter-container__content__toggles__input-container__logo" src="/src/assets/Img/Logo/ONEBIKE.png"/>
            <input className="newsLetter-container__content__toggles__input-container__input" placeholder="email address" id="email" type="text"/>
          </div>
          <button className="newsLetter-container__content__toggles__subscribe-button">Subscribe</button>
        </div>
      </div>
    </div>
  )
}

export default NewsLetter;