// HOOKS
import React, {useState, useRef, useEffect} from 'react';

// SCSS
import '../styles/components/ImageSlider.scss';

// JSON
import sliderData from '/src/data/slider.json';


function ImageSlider ({darkMode, lan}) {

  const [currentImage, setCurrentImage] = useState(null);

  const initialX = useRef(null);
  const currentX = useRef(null);
  const amountX = useRef(null);
  const scrollLeft = useRef(null);

  const imageSliderElement = useRef(null);

  const firstImage = sliderData[0];
  const lastImage = sliderData[sliderData.length - 1];

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
    const id = setInterval(() => action('scroll left'), 8000);

    return () => clearInterval(id);
  }, []);

  const handleStart = e => {
    action('is last image') && action('scroll beginning');
    action('is first image') && action('scroll end');
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
    const scroll = (e, left, behavior) => e.scroll({left, behavior});
    const activateLength = 100;
    
    if (amountX.current > activateLength) {
      scroll(imageSliderElement.current, vars('scroll left').sliderBetweenImagesWidth, 'smooth');    
      setCurrentImage(oldNum => vars().lastIndex === oldNum ? 0 : oldNum + 1);
    } else if (amountX.current < -1 * activateLength) {    
      scroll(imageSliderElement.current, vars('scroll right').sliderBetweenImagesWidth, 'smooth');    
      setCurrentImage(oldNum => oldNum  === 0 ? vars().lastIndex : oldNum - 1);
    } else {
      action('return');
    }

    amountX.current = 0;
  }

  const handleClick = e => {
    const {type} = e.currentTarget.dataset;

    switch (type) {
      case 'scroll_to_left':
        action('scroll right');
        break;
      case 'scroll_to_right':
        action('scroll left');
        break;
      default:
        console.error('Error: Unknown Action: ' + type);
    }
  }

  function action (action, totalAmount) {

    const scroll = (e, left, behavior) => e.scroll({left, behavior});

    const isLastImage = () => vars().sliderScrollWidth <= vars().totalScroll;
    const isFirstImage = () => vars().sliderScrollLeft < vars().sliderWidth;

    const scrollToBeginning = () => {
      scroll(imageSliderElement.current, vars().sliderWidth, 'instant');
      setCurrentImage(0);
    }

    const scrollToEnd = () => {
      scroll(imageSliderElement.current, vars().sliderLastImageWidth, 'instant');
      setCurrentImage(vars().lastIndex);
    }

    const scrollToLeft = () => {  
      isFirstImage() && scrollToEnd();
      isLastImage() && scrollToBeginning();
      scrollLeft.current = vars().sliderScrollLeft;

      scroll(imageSliderElement.current, vars('scroll left').sliderBetweenImagesWidth, 'smooth');    
      setCurrentImage(oldNum => vars().lastIndex === oldNum ? 0 : oldNum + 1);
    }

    const scrollToRight = () => { 
      isFirstImage() && scrollToEnd();
      isLastImage() && scrollToBeginning();
      scrollLeft.current = vars().sliderScrollLeft;

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
    action === 'is last image' && isLastImage();
    action === 'is first image' && isFirstImage();
  }

  return (
    <section className='imageSlider-container --fade-in delay--04s animate--03s'>
      <ul className='imageSlider-container__img-holder' onTouchStart={handleStart}  onTouchMove={handleMove} onTouchEnd={handleEnd} ref={imageSliderElement}>
        <li className='imageSlider-container__img-holder__imges'><img src={lastImage.url} alt={lastImage.alt[lan]} loading="lazy" /></li>
        {sliderData.map((data, i) =>
        <li className='imageSlider-container__img-holder__imges' key={data.id}>
          <img src={data.url} alt={data.alt[lan]} loading={i < 1 ? "eager" : "lazy"} fetchpriority={i < 1 ? "high" : ""} />
        </li>          
        )}
        <li className='imageSlider-container__img-holder__imges'><img src={firstImage.url} alt={firstImage.alt[lan]} loading="lazy"/></li>
      </ul>
      <ul className="imageSlider-container__dots-container">
        {sliderData.map((data, i) =>
        <li className ={`imageSlider-container__dots-container__dot ${i === currentImage && 'current'}`} key={data.id}></li>
        )}
      </ul>
      <div className="imageSlider-container__arrows">
        <button className="imageSlider-container__arrows__left-arrow" data-type="scroll_to_left" onClick={handleClick}/>
        <button className="imageSlider-container__arrows__right-arrow" data-type="scroll_to_right" onClick={handleClick} />
      </div>
    </section>
  )
}

export default ImageSlider;