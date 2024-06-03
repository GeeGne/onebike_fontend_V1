// HOOKS
import React, {useState, useEffect, useRef} from 'react';

// SCSS
import '/src/styles/components/pages/products/AdvertList.scss';

// JSON
// import products from '/src/data/products.json';

// UTILS
import formatNumberWithCommas from '/src/utils/formatNumberWithCommas.js'
import calculatePrice from '/src/utils/calculatePrice.js'
import calculateDiscountPercantage from '/src/utils/calculateDiscountPercantage.js'
import fetchElementById from '/src/utils/fetchElementById.js'

// product img test
import productIMG from '/src/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg';
import productIMG2 from '/src/assets/img/products/Giant Bicycle Road full Carbon.avif';
import productIMG3 from '/src/assets/img/products/RIDE 12 Chili Red Carbon Grey 2023.avif';
import productIMG4 from '/src/assets/img/products/Seymour Oceanweave 1.3 H2O.avif';
import brandLogo from '/src/assets/img/logo/trek.webp';
import brandLogo2 from '/src/assets/img/logo/giant.webp';
import brandLogo3 from '/src/assets/img/logo/evoc.webp';

function AdvertList ({darkMode, lan, matchedProducts, onCartProductsChange}) {
  const [cartProducts, setCartProducts] = useState([]);
  const [loadLimit, setLoadLimit] = useState(0);
  const addToCartELs = useRef([]);
  const productAmountELs = useRef([]);

  console.log({cartProducts});

  const nowStyle = {
    color: "var(--primary-color)"
  }

  useEffect(() => {
    onCartProductsChange(cartProducts);
  }, [cartProducts])

  useEffect(() => {
    setLoadLimit(24 < matchedProducts.length ? 24 : matchedProducts.length);
  }, [matchedProducts])

  const addRef = (type, el, i) => {

    const updateElements = (currentArray, el) => currentArray.length < matchedProducts.length ? [...currentArray, el] : currentArray;
    
    switch (type) {
      case 'productAmountELs':
        i === 0 && (productAmountELs.current = []);
        productAmountELs.current = updateElements(productAmountELs.current, el)
        break;
      default:
        console.log('unknown type:' + type);
    }
  }

  const updateProductAmount = (e, type) => {
    const getAmountEL = fetchElementById(e.target, 'productId', productAmountELs.current);
    const currentAmount = Number(getAmountEL.textContent);
    
    switch (true) {
      case (currentAmount >= 9 && type === 1):
        getAmountEL.textContent = 9;
        break;
      case (currentAmount <= 1 && type === -1):
        getAmountEL.textContent = 1;
        break;
      default:
        getAmountEL.textContent = currentAmount + type;
    }
  }

  function handleClick (type, e, product) {

    const checkLimit = (prevAmount, newAmount) => {
      const totalAmount = prevAmount + newAmount;
      return totalAmount > 9 ? 9 : totalAmount;
    }

    switch (type) {
      case 'addToCart':
        const getAmountEL = fetchElementById(e.target, 'productId', productAmountELs.current);
        const currentAmount = Number(getAmountEL.textContent);
        const newItem = {id: product.id, currentAmount, product};
        let itemFound;
        cartProducts.forEach(item => item.id === product.id && (itemFound = true));
        const updatedCart = itemFound ? 
          cartProducts.map(item => item.id === product.id ? {...item, currentAmount: checkLimit(item.currentAmount, currentAmount)} : item) : [...cartProducts, newItem];
        setCartProducts(updatedCart);
        break;
      default:
        console.log('unknown type:' + type);
    }
  }

  return (
    <div className="advertList-container">
      <section className="advertList-container__advert-section">
        <ul className="advertList-container__advert-section__grid">
          {matchedProducts.slice(0, loadLimit).map((product, i) => 
          <li className={`advertList-container__advert-section__grid__product-content${product.outOfStock ? ' out-of-stock' : ''}`} key={product.id}>
          <button className="advertList-container__advert-section__grid__product-content__favourite"></button>
          <img className="advertList-container__advert-section__grid__product-content__img" src={`/src/assets/img/products/${product.category}/${product.type}/${product.id + '-' + product.color.en}-front.webp`}/>
          {product.discount ? <h3 className="advertList-container__advert-section__grid__product-content__discount">{lan === 'ar' ? 'خصم ' : ''}{calculateDiscountPercantage(product.price, product.discount)}{lan === 'en' ? ' off' : ''}</h3> : <></>}
          <h3 className="advertList-container__advert-section__grid__product-content__description">{product.title[lan]}</h3>
          <img className="advertList-container__advert-section__grid__product-content__brand-logo" src={product.brand ? `/src/assets/img/logo/${product.brand}.webp` : ''}/>
          <h2 className="advertList-container__advert-section__grid__product-content__price">{product.discount ? <><span style={nowStyle}>{lan === 'en' ? 'NOW' : 'الان'}</span> {formatNumberWithCommas(calculatePrice(product.price, product.discount))} <span className="currency-symbol">{lan === 'en' ? 'S.P ' : 'ل.س'}</span><s>{formatNumberWithCommas(product.price)}</s></> : <>{formatNumberWithCommas(product.price)} <span className="currency-symbol">{lan === 'en' ? 'S.P' : 'ل.س'}</span></>}</h2>
          <div className="advertList-container__advert-section__grid__product-content__cart-utils">
            <button className="advertList-container__advert-section__grid__product-content__cart-utils__add-to-cart" data-product-id={product.id} onClick={e => handleClick('addToCart', e, product)}>{lan === 'en' ? 'Add to cart' : 'اضف الى السله'}</button>  
            <button className="advertList-container__advert-section__grid__product-content__cart-utils__increment" data-product-id={product.id} onClick={e => updateProductAmount(e, 1)}></button>  
            <div className="advertList-container__advert-section__grid__product-content__cart-utils__total" data-product-id={product.id} ref={el => addRef('productAmountELs', el, i)}>1</div>  
            <button className="advertList-container__advert-section__grid__product-content__cart-utils__decrement" data-product-id={product.id} onClick={e => updateProductAmount(e, -1)}></button>  
          </div>
          </li>
          )}
        </ul>
      </section>
      <section className="advertList-container__button-section">
        <button className="advertList-container__button-section__load-more" onClick={() => setLoadLimit(num => num + 24 < matchedProducts.length ? (num + 24) : matchedProducts.length)}>{lan === 'en' ? 'Load More' : 'عرض المزيد'}</button>
        <div className="advertList-container__button-section__load-amount">{lan === 'en' ? `${loadLimit} showing out of ${matchedProducts.length} results` : `${loadLimit} معروض من ${matchedProducts.length} نتيجه`}</div>
      </section>
    </div>
  )
}

export default AdvertList;