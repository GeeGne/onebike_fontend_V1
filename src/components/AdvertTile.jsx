// HOOKS
import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

// COMPONENTS
import DisplayWebImg from '/src/components/DisplayWebImg';
import Alert from '/src/components/Alert';

// STORE
import {useWishlistStore, useCartStore, useDataStore} from '/src/store/store';

// SCSS
import '/src/styles/components/AdvertTile.scss';

// DATA
// import products from '/src/data/products.json';

// UTILS
import calculateDiscountPercantage from '/src/utils/calculateDiscountPercantage';
import formatNumberWithCommas from '/src/utils/formatNumberWithCommas';
import capitalizeFirstLetter from '/src/utils/capitalizeFirstLetter';
import calculatePrice from '/src/utils/calculatePrice';
import cleanseString from '/src/utils/cleanseString';

// ASSETS
import doubleArrowPrimary from '/assets/img/icons/keyboard_double_arrow_right_primary.svg';
import heart from '/assets/img/icons/heart.svg';
import heartFill from '/assets/img/icons/heart_fill.svg';

// ASSETS - DARKMODE
import doubleArrowSecondary from '/assets/img/icons/keyboard_double_arrow_right_secondary.svg';
import heartDarkMode from '/assets/img/icons/heart_darkMode.svg';

function AdvertTile ({darkMode, lan, type}) {
  
  const { addProductToCart, removedProductFromCart } = useCartStore();
  const { products } = useDataStore();
  const { wishlist, addProductToWishlist, removeProductFromWishlist } = useWishlistStore();
  const [ newAlert, setNewAlert ] = useState(0);
  const [ alertText, setAlertText ] = useState(null);

  const listEL = useRef(null);
  const productConEL = useRef(null);
  const observerRef = useRef(null);
  const addTimerID = useRef(null);
  const removeTimerID = useRef(null);

  const navigate = useNavigate();  
  const en = lan === "en";
  const nowStyle = {color: "var(--primary-color)"}
  const getProductImgURL = product => `/assets/img/products/${product.id}/main.webp`;
  const getProductBrandURL = product => `/assets/img/brands/${product.brand}.svg`;
  const getProductPrice = product => formatNumberWithCommas(calculatePrice(product.price, product.discount));
  const isProductInWishlist = product => wishlist.some(item => item.id === product.id);

  useEffect(() => {
    // const elements = en ? document.querySelectorAll('.--slide-to-left') : document.querySelectorAll('.--slide-to-right');
    const elements = document.querySelectorAll('.--slide-to-left');
    
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observerRef.current.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    
    elements.forEach(el => {
      el.style.animationPlayState = 'paused';
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [products]);

  const handleCategoryType = product => {
    const {categoryType, name} = type;
    
    switch (categoryType) {
      case 'type':
      case 'category':
        return product.state === 'hidden' ? false : product[categoryType] === cleanseString(name.en);
      case 'discount':
        return product.state === 'hidden' ? false : product[categoryType];
      default:
        console.error('Error: unknown categoryType', categoryType);
    }
  }

  const getProducts = products.filter(handleCategoryType);
  const isProductsLoaded = getProducts.length != 0;
  const displayBlocks = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleClick = e => {
    const {categoryType, name} = type;
    const {action, productId} = e.currentTarget.dataset;
    const productConWidth = productConEL.current.offsetWidth;
    const fontSize = window.getComputedStyle(productConEL.current, null).getPropertyValue('font-size');
    const gapLength = parseFloat(fontSize);
    const getProduct = id => products.filter(product => product.id === id)[0];

    const getURL = () => {
      switch (categoryType) {
        case 'type':
          const getCategory = () => products.filter(product => product.type === cleanseString(name.en));
          return '/' + getCategory()[0].category + '/' + cleanseString(name.en);
        case 'category':
        case 'discount':
          return '/' + cleanseString(name.en);
        default:
          console.error('Error: unknown categoryType', categoryType);
      }
    }

    switch (action) {
      case 'navigate_to_url':
        navigate(getURL());
        setTimeout(() => window.scroll({top: 0, behavior: 'smooth'}), 500);
        break;
      case 'scroll_left':
        listEL.current.scrollBy({left: -(productConWidth + gapLength), behavior: "smooth"});
        break;
      case 'scroll_right':
        listEL.current.scrollBy({left: productConWidth + gapLength, behavior: "smooth"});
        break;
      case 'add_product_to_wishlist':
        setAlertText(`${en ? '' : 'تم اضافه'} ${getProduct(productId).title[lan]} ${en ? 'is added to Wishlist!' : 'الى المفضله!'}`);
        setNewAlert(Math.random());
        e.target.style.opacity = '0';
        clearTimeout(addTimerID.current);
        addTimerID.current = setTimeout(() => {
          e.target.style.opacity = '1';
          addProductToWishlist(getProduct(productId));
        }, 250);
        break;
      case 'remove_product_from_wishlist':
        setAlertText(`${en ? '' : 'تم ازاله'} ${getProduct(productId).title[lan]} ${en ? 'is removed from Wishlist!' : 'من المفضله!'}`);
        setNewAlert(Math.random());
        e.target.style.opacity = '0';
        clearTimeout(removeTimerID.current);
        removeTimerID.current = setTimeout(() => {
          e.target.style.opacity = '1';
          removeProductFromWishlist(getProduct(productId));
        }, 250)
        break;
      case 'add_to_cart':
        const amount = 1;
        addProductToCart(getProduct(productId), amount);
        setAlertText(`${en ? '' : 'تم اضافه'} ${getProduct(productId).title[lan]} ${en ? 'is added to Cart!' : 'الى السله!'}`);
        setNewAlert(Math.random());
        break;
      default:
        console.error('Error: Unknown Action: ' + action);
    }
  }

  return (
    <section className="advertTile">
      <Alert alertText={alertText} newAlert={newAlert} />
      <div className="advertTile__panel">
        <h2 className="advertTile__panel__title --colorChange-view">{type.name[lan].toUpperCase()}</h2>
        <button className="advertTile__panel__see-more --colorChange-view" data-action="navigate_to_url" onClick={handleClick}>{en ? 'See More' : 'شاهد المزيد'}</button>
        <img className="advertTile__panel__doubleArrow" src={darkMode ? doubleArrowSecondary : doubleArrowPrimary} onClick={handleClick} alt="Double Down Arrows"/>
      </div>
      <div className="advertTile__list">
        <button className="advertTile__list__left-arr-btn" aria-label="Left Arrow" data-action="scroll_left" onClick={handleClick}></button>
        <button className="advertTile__list__right-arr-btn" aria-label="Right Arrow" data-action="scroll_right" onClick={handleClick}></button>
        <ul className="advertTile__list__products" ref={listEL}>
          {isProductsLoaded 
          ? getProducts.map((product, i) => 
          <li className={`advertTile__list__products__product --slide-to-left${product.state === 'out-of-stock' ? ' out-of-stock' : ''}`} key={product.id} ref={productConEL}>
            {isProductInWishlist(product) 
            ? <button className="advertTile__list__products__product__heart-btn added-to-wishlist" aria-label="Remove product from wishlist" data-action="remove_product_from_wishlist" data-product-id={product.id} onClick={handleClick} />
            : <button className="advertTile__list__products__product__heart-btn" aria-label="Add product to wishlist" data-action="add_product_to_wishlist" data-product-id={product.id} onClick={handleClick} />
            }
            <DisplayWebImg className="advertTile__list__products__product__img" src={getProductImgURL(product)} alt={product.title[lan]} loading={i <= 3 ? "eager" : "lazy"} fetchpriority={i <= 3 ? "high" : ""} />
            {!product.discount || 
              <div className="advertTile__list__products__product__discount">{lan === 'ar' ? 'خصم ' : ''}{calculateDiscountPercantage(product.price, product.discount)}{en ? ' off' : ''}</div>
            }
            <h3 className="advertTile__list__products__product__description">{product.title[lan]}</h3>
            {product.brand && 
              <DisplayWebImg className="advertTile__list__products__product__brand-img" alt={capitalizeFirstLetter(product.brand) + ' Logo'} loading="lazy" src={getProductBrandURL(product)}/>
            }
            <div className="advertTile__list__products__product__price">
              {product.discount 
              ? <> <span className="now" style={nowStyle}>{en ? 'NOW' : 'الان'}</span> 
              <span className="total">{getProductPrice(product)}</span>
              <span className="currency-symbol">{en ? 'S.P ' : 'ل.س'}</span>
              <s className='old'>{formatNumberWithCommas(product.price)}</s></>
              : <><span className="total">{getProductPrice(product)}</span> 
              <span className="currency-symbol">{en ? 'S.P' : 'ل.س'}</span>
              </>}
            </div>
            <button className="advertTile__list__products__product__add-btn" data-action="add_to_cart" data-product-id={product.id} onClick={handleClick}>{en ? 'Add to cart' : 'اضف الى السله'}</button>
          </li>      
          )
          : displayBlocks.map(num => 
          <li className="advertTile__list__products__product empty --panel-flick" key={num} ref={productConEL}>
            <div className="advertTile__list__products__product__heart-btn" />
            <div className="advertTile__list__products__product__img" />
            <div className="advertTile__list__products__product__description" />
            <div className="advertTile__list__products__product__price" />
            <div className="advertTile__list__products__product__add-btn" />
          </li>   
          )}
        </ul>
      </div>
    </section>
  )
}

export default AdvertTile;