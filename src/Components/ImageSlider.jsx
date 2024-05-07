import React, {useState, useRef, useEffect} from 'react';

import '../Styles/Components/ImageSlider.scss';

import img1 from '/src/assets/Img/Content/main-sec.jpg';
import img2 from '/src/assets/Img/Content/poster.jpg';
import img3 from '/src/assets/Img/Content/poster1.jpg';

function ImageSlider () {

  const initialX = useRef(null);
  const currentX = useRef(null);
  const scrollLeft = useRef(null);

  const handleStart = e => {
    console.log('start');
    initialX.current = e.touches[0].clientX;
    scrollLeft.current = e.currentTarget.scrollLeft;
  }

  const handleMove = e => {
    console.log('move');
    // console.log(e.currentTarget);
    currentX.current = e.touches[0].clientX;
    const amountX = initialX.current - currentX.current;
    const total =  scrollLeft.current + amountX;
    e.currentTarget.scrollTo({
      left: total,
      behavior: 'instant'
    });

    // const deltaX = 
  }

  const handleEnd = e => {
    initialX.current = null;
    currentX.current = null;
    console.log('end');
    console.log(e.currentTarget.scrollLeft);
  }

  return (
    <>
      <section className='ImageSlider-container'>
        <ul className='ImageSlider-container__img-holder' 
          onTouchStart={handleStart} 
          // onMouseEnter={handleStart} 
          onTouchMove={handleMove} 
          // onMouseMove={handleMove} 
          onTouchEnd={handleEnd} 
          // onMouseLeave={handleEnd}
        >
          <li className='ImageSlider-container__img-holder__imges'>
            <img src={img1}/>
          </li>
          <li className='ImageSlider-container__img-holder__imges'>
            <img src={img2}/>
          </li>
          <li className='ImageSlider-container__img-holder__imges'>
            <img src={img3}/>
          </li>
        </ul>
      </section>
    </>
  )
}

export default ImageSlider;