// Test Component is mainly for testing fonts, global settings etc
import React, {useRef, useState, useEffect} from 'react';
// import './Styles/Test.scss';

import img1 from '/src/assets/Img/Content/main-sec.jpg';
import img2 from '/src/assets/Img/Content/poster.jpg';
import img3 from '/src/assets/Img/Content/poster1.jpg';

function Test  () {
  const mainContainer = useRef(null);
  const container = useRef(null);
  const [scrollDepth, setScrollDepth] = useState(0);

  const handleClick = (e) => {
    console.log(e)

  }

  useEffect(() => {
    // const computedStyle = window.getComputedStyle(mainContainer.current);
    const computedStyle = window.getComputedStyle(container.current);
    const width = parseFloat(computedStyle.width)
    const fontSize = parseFloat(computedStyle.fontSize);
    console.log(mainContainer.current.scrollLeft);
    mainContainer.current.scrollLeft;
    mainContainer.current.scrollTo({
      left: scrollDepth,
      behavior: 'smooth'
    })
  },[scrollDepth])



  return (
    // <>
    //   <input placeholder="This is Input"/>
    //   <h1>This is H1</h1>
    //   <h2>This is H2</h2>
    //   <h3>This is H3</h3>
    //   <button onClick={handleClick}>Light Theme / Dark Theme</button>
    // </>
    <>
      <ul className="container" ref={mainContainer}>
        <li className="blue-container" ref={container}><img src={img1}/></li>
        <li className="green-container"><img src={img2}/></li>
        <li className="blue-container"><img src={img3}/></li>
        <li className="blue-container" ref={container}><img src={img1}/></li>
        <li className="green-container"><img src={img2}/></li>
        <li className="blue-container"><img src={img3}/></li>
      </ul>
      <button onClick={() => setScrollDepth(oldVal => (oldVal - container.current.scrollWidth))}>left</button>
      <button onClick={() => setScrollDepth(oldVal => (oldVal + container.current.scrollWidth))}>right</button>
    </>
  )
}

export default Test;