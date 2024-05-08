import React, {useState, useRef, useEffect} from 'react';

import '../Styles/Components/ImageSlider.scss';

import sliderData from '/src/Data/Slider.json';


function ImageSlider () {

  const [currentImage, setCurrentImage] = useState(null);

  const initialX = useRef(null);
  const currentX = useRef(null);
  const amountX = useRef(null);
  const scrollLeft = useRef(null);

  const imageSliderElement = useRef(null);

  const firstImage = sliderData[0].URL;
  const lastImage = sliderData[sliderData.length - 1].URL;

  const vars = () => {
    const sliderWidth = getWidth(imageSliderElement.current);
    let sliderScrollWidth = imageSliderElement.current.scrollWidth;
    const extraLength = 100;
    let sliderScrollLeft = imageSliderElement.current.scrollLeft;
    let sliderBetweenImagesWidth = sliderScrollLeft + sliderWidth;
    let totalScroll = sliderScrollLeft + sliderWidth + extraLength;
    const lastIndex = sliderData.length - 1;

    return {
      sliderWidth,
      sliderScrollWidth,
      extraLength,
      sliderScrollLeft,
      sliderBetweenImagesWidth,
      totalScroll,
      lastIndex
    }
  }

  useEffect(() => {

    action('scroll beginning');

    const id = setInterval(() => {
      // const sliderWidth = getWidth(imageSliderElement.current);
      // let sliderScrollWidth = imageSliderElement.current.scrollWidth;
      // const extraLength = 100;
      // let sliderScrollLeft = imageSliderElement.current.scrollLeft;
      // let sliderBetweenImagesWidth = sliderScrollLeft + sliderWidth;
      // let totalScroll = sliderScrollLeft + sliderWidth + extraLength;
      // const lastIndex = sliderData.length - 1;
      
      if (vars().sliderScrollLeft < vars().sliderWidth) {
        action('scroll end');
      } 

      if (vars().sliderScrollWidth <= vars().totalScroll) {
        action('scroll beginning');
      }
      
      // sliderScrollLeft = imageSliderElement.current.scrollLeft
      // sliderBetweenImagesWidth = sliderScrollLeft + sliderWidth;
      // totalScroll = sliderScrollLeft + sliderWidth + extraLength;
      scroll(imageSliderElement.current, vars().sliderBetweenImagesWidth, 'smooth')
      setCurrentImage(old => vars().lastIndex === old ? 0 : old + 1);
      // setCurrentImage(old => old + 1);
    }, 4000)

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    console.log(currentImage);
  }, [currentImage])

  const handleStart = e => {
    // note: in theory sliderScrollWidth should be equal to sliderScrollLeft when sliding all the way to the left,
    // but for some reason it's acrually sliderScrollWidth is equal to sliderScrollLeft + sliderWidth.

    // const sliderWidth = getWidth(e.currentTarget);
    // const sliderScrollWidth = e.currentTarget.scrollWidth;
    // const sliderScrollLeft = e.currentTarget.scrollLeft;
    // const extraLength = 100;
    // const totalScroll = sliderScrollLeft + sliderWidth + extraLength

    vars().sliderScrollWidth <= vars().totalScroll && action('scroll beginning');
    vars().sliderScrollLeft < vars().sliderWidth && action('scroll end');

    initialX.current = e.touches[0].clientX;
    // scrollLeft.current = vars().sliderScrollLeft = e.currentTarget.scrollLeft;
    scrollLeft.current = vars().sliderScrollLeft = e.currentTarget.scrollLeft;
  }

  const handleMove = e => {
    currentX.current = e.touches[0].clientX;
    amountX.current = initialX.current - currentX.current;
    const totalAmount =  scrollLeft.current + amountX.current;
    scroll(e.currentTarget, totalAmount, 'instant');
  }

  const handleEnd = e => {
    const activateLength = 100;
    if (amountX.current > activateLength) {
      action('scroll left')
    } else if (amountX.current < -1 * activateLength) {
      action('scroll right');
    } else {
      scroll(e.currentTarget, scrollLeft.current, 'smooth');
    }

    amountX.current = 0;
  }

  function action (action) {
    const sliderWidth = getWidth(imageSliderElement.current);
    const sliderScrollWidth = imageSliderElement.current.scrollWidth;
    const sliderLastImageWidth = sliderScrollWidth - sliderWidth * 2;
    const sliderBetweenImagesWidth = scrollLeft.current + (action === 'scroll left' ? 1 : -1) * sliderWidth
    const lastIndex = sliderData.length - 1;

    const scrollToBeginning = () => {
      scroll(imageSliderElement.current, sliderWidth, 'instant');
      setCurrentImage(0);
    }

    const scrollToEnd = () => {
      scroll(imageSliderElement.current, sliderLastImageWidth, 'instant');
      setCurrentImage(lastIndex);
    }

    const scrollToLeft = () => {
      scroll(imageSliderElement.current, sliderBetweenImagesWidth, 'smooth');    
      setCurrentImage(oldNum => oldNum + 1);
    }

    const scrollToRight = () => {
      scroll(imageSliderElement.current, sliderBetweenImagesWidth, 'smooth');    
      setCurrentImage(oldNum => oldNum - 1);
    }

    action === 'scroll beginning' && scrollToBeginning();
    action === 'scroll end' && scrollToEnd();
    action === 'scroll left' && scrollToLeft();
    action === 'scroll right' && scrollToRight();
  }

  const scroll = (e, left, behavior) => e.scrollTo({left,behavior});

  const getWidth = el => {
    const computedStyle = getComputedStyle(el);
    const width = parseFloat(computedStyle.width);
    return width;
  }


  return (
    <>
      <section className='imageSlider-container'>
        <ul className='imageSlider-container__img-holder' onTouchStart={handleStart} 
          // onMouseEnter={handleStart} 
          onTouchMove={handleMove} 
          // onMouseDown={handleMove} 
          onTouchEnd={handleEnd} 
          // onMouseUp={handleEnd}
          ref={imageSliderElement}
        >
          <li className='imageSlider-container__img-holder__imges'><img src={lastImage}/></li>
          {sliderData.map(data =>
          <li className='imageSlider-container__img-holder__imges' key={data.id}>
            <img src={data.URL}/>
          </li>          
          )}
          <li className='imageSlider-container__img-holder__imges'><img src={firstImage}/></li>
        </ul>
        <ul className="imageSlider-container__dots-container">
          {sliderData.map((data, i) =>
          <li className ={`imageSlider-container__dots-container__dot ${i === currentImage && 'current'}`} key={data.id}></li>
          )}
        </ul>
      </section>
    </>
  )
}

export default ImageSlider;