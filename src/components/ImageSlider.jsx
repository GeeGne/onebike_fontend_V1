// HOOKS
import React, {useState, useRef, useEffect} from 'react';

// SCSS
import '../styles/components/ImageSlider.scss';

// COMPONENTS
import DisplayImg from '/src/components/DisplayImg';
import DisplayWebImg from '/src/components/DisplayWebImg';

// JSON
// import homePageBannersData from '/src/data/slider.json';

// STORE 
import { useDataStore } from '/src/store/store';

function ImageSlider ({darkMode, lan}) {

  const [currentImage, setCurrentImage] = useState(null);
  const { homePageBannersData } = useDataStore();
  // const homePageBannersData = [];

  const initialX = useRef(null);
  const currentX = useRef(null);
  const amountX = useRef(null);
  const scrollLeft = useRef(null);

  const imageSliderElement = useRef(null);

  const displayBlocks = [1, 2, 3, 4];
  const isBannersDataLoaded = homePageBannersData.length !== 0;
  const firstImage = isBannersDataLoaded && homePageBannersData[0];
  const lastImage = isBannersDataLoaded && homePageBannersData[homePageBannersData.length - 1];
  const getBannerImgURL = item => `/assets/img/banners/homepage/${item.id}.webp`;

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
    const lastIndex = homePageBannersData.length - 1;

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
    <section className={`imageSlider-cont${isBannersDataLoaded ? '' : ' empty'}`}>
      <ul className='imageSlider-cont__img-holder' onTouchStart={handleStart}  onTouchMove={handleMove} onTouchEnd={handleEnd} ref={imageSliderElement}>
        { isBannersDataLoaded 
          ? <li className='imageSlider-cont__img-holder__imges'>
              <DisplayWebImg className='imageSlider-cont__img-holder__imges__img' src={getBannerImgURL(lastImage)} alt={lastImage.alt} loading="lazy" />
            </li>
          : <li className='imageSlider-cont__img-holder__imges'>
              <div className='imageSlider-cont__img-holder__imges__img empty --panel-flick' />
            </li>
        }
        { isBannersDataLoaded 
          ? homePageBannersData.map((data, i) =>
            <li className='imageSlider-cont__img-holder__imges' key={data.id}>
              <DisplayWebImg className='imageSlider-cont__img-holder__imges__img' src={getBannerImgURL(data)} alt={data.alt} loading={i < 1 ? "eager" : "lazy"} fetchpriority={i < 1 ? "high" : ""} />
            </li>)
          : displayBlocks.map(data =>
            <li className='imageSlider-cont__img-holder__imges' key={data}>
              <div className='imageSlider-cont__img-holder__imges__img empty --panel-flick' />
            </li>)
        }
        { isBannersDataLoaded 
          ? <li className='imageSlider-cont__img-holder__imges'>
              <DisplayWebImg className='imageSlider-cont__img-holder__imges__img'  src={getBannerImgURL(firstImage)} alt={firstImage.alt} loading="lazy"/>
            </li>
          : <li className='imageSlider-cont__img-holder__imges'>
              <div className='imageSlider-cont__img-holder__imges__img empty --panel-flick' />
            </li>
        }
      </ul>
      <ul className="imageSlider-cont__dots-container">
        { isBannersDataLoaded 
          ?  homePageBannersData.map((data, i) =>
              <li className ={`imageSlider-cont__dots-container__dot ${i === currentImage && 'current'}`} key={data.id} />
            )
          : displayBlocks.map((data, i) =>
             <li className ={`imageSlider-cont__dots-container__dot ${i === currentImage && 'current'} empty --panel-flick`} key={data} />
            )
        }
      </ul>
      <div className="imageSlider-cont__arrows">
        <button className="imageSlider-cont__arrows__left-arrow" aria-label="Left Arrow" data-type="scroll_to_left" onClick={handleClick}/>
        <button className="imageSlider-cont__arrows__right-arrow" aria-label="Right Arrow" data-type="scroll_to_right" onClick={handleClick} />
      </div>
    </section>
  )
}

export default ImageSlider;