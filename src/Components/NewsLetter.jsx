// HOOKS
import React, {useEffect, useState, useRef} from 'react';

// SCSS
import '/src/Styles/Components/NewsLetter.scss';

function NewsLetter () {

  return (
    <div className="newsLetter-container"> 
      <div className="newsLetter-container__content">
        <h1>Join ONE BIKE's Journey!</h1>
        <h2>Create Memories and Boost Your Fitness with ONE BIKE!</h2>
        <h3>Subscribe to our newsletter to stay updated on our exciting team activity events, discover the newest bicycle equipment in our store, and get access to exclusive hot sales. Our newsletter will keep you inspired and connected with the ONE BIKE community. Let's make every weekend an adventure together!</h3>
      </div>
    </div>
  )
}

export default NewsLetter;