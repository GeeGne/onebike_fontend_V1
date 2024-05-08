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

  const vars = (action) => {
    // note: in theory sliderScrollWidth should be equal to sliderScrollLeft when sliding all the way to the left,
    // but for some reason it's acrually sliderScrollWidth is equal to sliderScrollLeft + sliderWidth.
    
    const getWidth = el => {
      const computedStyle = getComputedStyle(el);
      const width = parseFloat(computedStyle.width);
      return width;
    }

    const scrollDirection = action ? action : 'scroll left';
    const sliderWidth = getWidth(imageSliderElement.current);
    const sliderScrollWidth = imageSliderElement.current.scrollWidth;
    const sliderScrollLeft = imageSliderElement.current.scrollLeft;
    // const sliderBetweenImagesWidth = sliderScrollLeft + sliderWidth;
    const sliderBetweenImagesWidth = scrollLeft.current + (scrollDirection === 'scroll left' ? 1 : -1) * sliderWidth
    const sliderLastImageWidth = sliderScrollWidth - sliderWidth * 2;
    const extraLength = 100;
    const totalScroll = sliderScrollLeft + sliderWidth + extraLength;
    const lastIndex = sliderData.length - 1;

    return {
      sliderWidth,
      sliderScrollWidth,
      sliderScrollLeft,
      sliderBetweenImagesWidth,
      sliderLastImageWidth,
      extraLength,
      totalScroll,
      lastIndex
    }
  }

  useEffect(() => {
    action('scroll beginning');
    const id = setInterval(() => {
      
      vars().sliderScrollLeft < vars().sliderWidth && action('scroll end');
      vars().sliderScrollWidth <= vars().totalScroll && action('scroll beginning')
      scrollLeft.current = vars().sliderScrollLeft

      action('scroll left');
    }, 4000)

    return () => clearInterval(id);
  }, []);

  const handleStart = e => {
    vars().sliderScrollWidth <= vars().totalScroll && action('scroll beginning');
    vars().sliderScrollLeft < vars().sliderWidth && action('scroll end');

    initialX.current = e.touches[0].clientX;
    scrollLeft.current = vars().sliderScrollLeft;
  }

  const handleMove = e => {
    currentX.current = e.touches[0].clientX;
    amountX.current = initialX.current - currentX.current;
    const totalAmount =  scrollLeft.current + amountX.current;
    action('move', totalAmount);
  }

  const handleEnd = e => {
    const activateLength = 100;
    if (amountX.current > activateLength) {
      action('scroll left')
    } else if (amountX.current < -1 * activateLength) {
      action('scroll right');
    } else {
      action('return');
    }

    amountX.current = 0;
  }

  function action (action, totalAmount) {

    const scroll = (e, left, behavior) => e.scrollTo({left,behavior});

    const scrollToBeginning = () => {
      scroll(imageSliderElement.current, vars().sliderWidth, 'instant');
      setCurrentImage(0);
    }

    const scrollToEnd = () => {
      scroll(imageSliderElement.current, vars().sliderLastImageWidth, 'instant');
      setCurrentImage(vars().lastIndex);
    }

    const scrollToLeft = () => {  
      scroll(imageSliderElement.current, vars('scroll left').sliderBetweenImagesWidth, 'smooth');    
      setCurrentImage(oldNum => vars().lastIndex === oldNum ? 0 : oldNum + 1);
    }

    const scrollToRight = () => { 
      scroll(imageSliderElement.current, vars('scroll right').sliderBetweenImagesWidth, 'smooth');    
      setCurrentImage(oldNum => oldNum  === 0 ? vars().lastIndex : oldNum - 1);
    }

    const returnBack = () => { 
      scroll(imageSliderElement.current, scrollLeft.current, 'smooth');
    
    }
    const move = totalAmount => { 
      scroll(imageSliderElement.current, totalAmount, 'instant');
    }

    action === 'scroll beginning' && scrollToBeginning();
    action === 'scroll end' && scrollToEnd();
    action === 'scroll left' && scrollToLeft();
    action === 'scroll right' && scrollToRight();
    action === 'return' && returnBack();
    action === 'move' && move(totalAmount);
  }

  return (
    <>
      <section className='imageSlider-container'>
        <ul className='imageSlider-container__img-holder' onTouchStart={handleStart}  onTouchMove={handleMove} onTouchEnd={handleEnd} ref={imageSliderElement}>
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