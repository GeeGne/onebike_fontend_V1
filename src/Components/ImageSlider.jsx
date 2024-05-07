import React, {useState, useRef, useEffect} from 'react';

import '../Styles/Components/ImageSlider.scss';

import img1 from '/src/assets/Img/Content/main-sec.jpg';
import img2 from '/src/assets/Img/Content/poster.jpg';
import img3 from '/src/assets/Img/Content/poster1.jpg';

function ImageSlider () {

  const [currentImage, setCurrentImage] = useState(null);

  const initialX = useRef(null);
  const currentX = useRef(null);
  const amountX = useRef(null);
  const scrollLeft = useRef(null);

  const imageSliderElement = useRef(null);
  const dotElements = useRef([]);

  useEffect(() => {
    const computedStyle = getComputedStyle(imageSliderElement.current);
    const width= parseFloat(computedStyle.width);

    imageSliderElement.current.scrollTo({
      left: width,
      behavior: 'instant'
    })

    setCurrentImage(0);
  }, []);

  useEffect(() => {
    console.log('moved');
    currentImage >= dotElements.current.length && setCurrentImage(0);
    currentImage === -1 && setCurrentImage(dotElements.current.length - 1);
    // dotElements.current.forEach(el => console.log(el));
    dotElements.current.forEach(el => el.classList.remove('current'));
    dotElements.current.forEach((el, i) => i === currentImage && el.classList.add('current'))
  }, [currentImage]);

  const handleStart = e => {
    console.log('start');

    const computedStyle = getComputedStyle(e.currentTarget);
    const width = parseFloat(computedStyle.width);
    if (e.currentTarget.scrollWidth <= e.currentTarget.scrollLeft + width + 300) {
      console.log('hi')
      setCurrentImage(0);
      e.currentTarget.scrollTo({
        left: width,
        behavior: 'instant'
      })
    }

    if (e.currentTarget.scrollLeft < width) {
      console.log('here', e.currentTarget.scrollWidth - width * 2)
      setCurrentImage(2);
      e.currentTarget.scrollTo({
        // left: e.currentTarget.scrollWidth - width,
        left: e.currentTarget.scrollWidth - width * 2,
        behavior: 'instant'
      })
    }

    initialX.current = e.touches[0].clientX;
    scrollLeft.current = e.currentTarget.scrollLeft;
  }

  const handleMove = e => {
    console.log('move');
    // console.log(e.currentTarget);
    currentX.current = e.touches[0].clientX;
    amountX.current = initialX.current - currentX.current;
    const total =  scrollLeft.current + amountX.current;
    e.currentTarget.scrollTo({
      left: total,
      behavior: 'instant'
    });

    // const deltaX = 
  }

  const handleEnd = e => {

    console.log('end');
    // console.log(e.currentTarget.scrollLeft);

    
    const computedStyle = getComputedStyle(e.currentTarget);
    const width= parseFloat(computedStyle.width);
    const total = scrollLeft.current + width;
    if (amountX.current > 100) {
      setCurrentImage(oldNum => oldNum + 1);
      e.currentTarget.scrollTo({
        left: total,
        behavior: 'smooth'
      })
    } else if (amountX.current < - 100) {
      setCurrentImage(oldNum => oldNum - 1);
      e.currentTarget.scrollTo({
        left: scrollLeft.current - width,
        behavior: 'smooth'
      })
    } else {
      e.currentTarget.scrollTo({
        left: scrollLeft.current,
        behavior: 'smooth'
      })
    }

    // setTimeout(() => scrollLeft.current = e.currentTarget.scrollLeft, 100);
    // initialX.current = null;
    // currentX.current = null;

    // if (e.currentTarget.scrollWidth <= e.currentTarget.scrollLeft + width + 300) {
    //   e.currentTarget.scrollTo({
    //     left: 0,
    //     behavior: 'smooth'
    //   })
    // }
    console.log(e.currentTarget.scrollLeft);
    console.log(e.currentTarget.scrollWidth);
    console.log(width);
    console.log(amountX);
  }

  const addRef = el => {
    console.log(dotElements.current.length)
    dotElements.current.length < 3 && (dotElements.current = [...dotElements.current, el]);
    // dotElements.current = [...dotElements.current, el];
    console.log(dotElements.current)
  }

  return (
    <>
      <section className='imageSlider-container'>
        <ul className='imageSlider-container__img-holder' 
          onTouchStart={handleStart} 
          // onMouseEnter={handleStart} 
          onTouchMove={handleMove} 
          // onMouseDown={handleMove} 
          onTouchEnd={handleEnd} 
          // onMouseUp={handleEnd}
          ref={imageSliderElement}
        >
          <li className='imageSlider-container__img-holder__imges'>
            <img src={img3}/>
          </li>
          <li className='imageSlider-container__img-holder__imges'>
            <img src={img1}/>
          </li>
          <li className='imageSlider-container__img-holder__imges'>
            <img src={img2}/>
          </li>
          <li className='imageSlider-container__img-holder__imges'>
            <img src={img3}/>
          </li>
          <li className='imageSlider-container__img-holder__imges'>
            <img src={img1}/>
          </li>
        </ul>
        <ul className="imageSlider-container__dots-container">
          <li className ="imageSlider-container__dots-container__dot" data-id='0' ref={el => addRef(el)}></li>
          <li className ="imageSlider-container__dots-container__dot" data-id='1' ref={el => addRef(el)}></li>
          <li className ="imageSlider-container__dots-container__dot" data-id='2' ref={el => addRef(el)}></li>
        </ul>
      </section>
    </>
  )
}

export default ImageSlider;