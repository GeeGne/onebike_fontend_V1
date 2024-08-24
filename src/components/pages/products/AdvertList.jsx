// HOOKS
import React, {useState, useEffect, useRef, useReducer} from 'react';

// COMPONENTS
import DisplayWebImg from '/src/components/DisplayWebImg';
import Alert from '/src/components/Alert';

// STORE
import { useWishlistStore, useCartStore, useDataStore } from '/src/store/store';

// SCSS
import '/src/styles/components/pages/products/AdvertList.scss';

// JSON

// REDUCERS
import cartReducer from '/src/reducers/cartReducer.js';

// UTILS
import formatNumberWithCommas from '/src/utils/formatNumberWithCommas.js'
import calculatePrice from '/src/utils/calculatePrice.js'
import calculateDiscountPercantage from '/src/utils/calculateDiscountPercantage.js'
import fetchElementById from '/src/utils/fetchElementById.js'

function AdvertList ({darkMode, lan, matchedProducts}) {

  const { products } = useDataStore();
  const {wishlist, addProductToWishlist, removeProductFromWishlist} = useWishlistStore();
  const {addProductToCart, removeProductFromCart} = useCartStore();
  const [loadLimit, setLoadLimit] = useState(0);
  const allProductsLoaded = loadLimit === matchedProducts.length;
  const [newAlert, setNewAlert] = useState(0);
  const [alertText, setAlertText] = useState(null);

  const addToCartELs = useRef([]);
  const productAmountELs = useRef([]);
  const heartTimerID = useRef();
  const removeTimerID = useRef();

  const en = lan === 'en';
  const displayedProducts = matchedProducts.slice(0, loadLimit);
  const nowStyle = {color: "var(--primary-color)"}
  const getProductImgURL = product => `/assets/img/products/${product.category}/${product.type}/${product.id + '-' + product.color}-front.webp`;
  const getProductPrice = product => formatNumberWithCommas(calculatePrice(product.price, product.discount));
  const isProductInWishlist = product => wishlist.some(item => item.id === product.id);

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

  const handleClick = e => {
    const {type, productId} = e.currentTarget.dataset;
    const getProduct = id => products.find(product => product.id === id);

    switch (type) {
      case 'add_to_cart':
        const getAmountEL = fetchElementById(e.target, 'productId', productAmountELs.current);
        const quantity = Number(getAmountEL.textContent);
        const product = getProduct(productId);
        addProductToCart(product, quantity);
        setAlertText(`${en ? '' : 'تم اضافه'} x${quantity} ${getProduct(productId).title[lan]} ${en ? 'is added to Cart!' : 'الى السله!'}`);
        setNewAlert(Math.random());
        break;
      case 'add_product_to_wishlist':
        setAlertText(`${en ? '' : 'تم اضافه'} ${getProduct(productId).title[lan]} ${en ? 'is added to Wishlist!' : 'الى المفضله!'}`);
        setNewAlert(Math.random());
        e.target.style.opacity = '0';
        clearTimeout(heartTimerID.current);
        heartTimerID.current = setTimeout(() => {
          addProductToWishlist(getProduct(productId));
          e.target.style.opacity = '1';
        }, 250)
        break;
        case 'remove_product_from_wishlist':
        setAlertText(`${en ? '' : 'تم ازاله'} ${getProduct(productId).title[lan]} ${en ? 'is removed from Wishlist!' : 'من المفضله!'}`);
        setNewAlert(Math.random());
        e.target.style.opacity = '0';
        clearTimeout(heartTimerID.current);
        heartTimerID.current = setTimeout(() => {
          removeProductFromWishlist(getProduct(productId));
          e.target.style.opacity = '1';
        }, 250)
        break;
      default:
        console.log('unknown type:' + type);
    }
  }

  return (
    <div className='advertList'>
    <Alert alertText={alertText} newAlert={newAlert} />
      <section className="advertList__advert-sctn">
        <ul className="advertList__advert-sctn__grid">
          {displayedProducts.map((product, i) => 
          <li className={`advertList__advert-sctn__grid__product${product.state === 'out-of-stock' ? ' out-of-stock' : ''}`} key={product.id}>
            {isProductInWishlist(product) 
            ? <button className="advertList__advert-sctn__grid__product__favourite added-to-wishlist" data-type="remove_product_from_wishlist" data-product-id={product.id} onClick={handleClick} />
            : <button className="advertList__advert-sctn__grid__product__favourite" data-type="add_product_to_wishlist" data-product-id={product.id} onClick={handleClick} />
            }
            <DisplayWebImg className="advertList__advert-sctn__grid__product__img" src={getProductImgURL(product)} alt={product.title[lan]} loading={i <= 5 ? "eager" : "lazy"} fetchpriority={i <= 5 ? "high" : ""} />
            {!product.discount || <h3 className="advertList__advert-sctn__grid__product__discount">{lan === 'ar' ? 'خصم ' : ''}{calculateDiscountPercantage(product.price, product.discount)}{en ? ' off' : ''}</h3>}
            <h3 className="advertList__advert-sctn__grid__product__description">{product.title[lan]}</h3>
            {product.brand && <img className="advertList__advert-sctn__grid__product__brand-img" src={`/assets/img/logo/${product.brand}.webp`}/>}
            <div className="advertList__advert-sctn__grid__product__price">
              {product.discount 
              ? <><span className="now" style={nowStyle}>{en ? 'NOW' : 'الان'}</span> 
              <span className="total">{getProductPrice(product)}</span>
              <span className="currency-symbol">{en ? 'S.P ' : 'ل.س'}</span>
              <s className="old">{formatNumberWithCommas(product.price)}</s></> 
              : <><span className="total">{getProductPrice(product)}</span>
              <span className="currency-symbol">{en ? 'S.P' : 'ل.س'}</span></>
              }
            </div>
            <div className="advertList__advert-sctn__grid__product__btns">
              <button className="advertList__advert-sctn__grid__product__btns__add-to-cart"
              data-type="add_to_cart" data-product-id={product.id} onClick={handleClick}>{en ? 'Add to cart' : 'اضف الى السله'}</button>  
              <button className="advertList__advert-sctn__grid__product__btns__increment" data-product-id={product.id} onClick={e => updateProductAmount(e, 1)}></button>  
              <div className="advertList__advert-sctn__grid__product__btns__total" data-product-id={product.id} ref={el => addRef('productAmountELs', el, i)}>1</div>  
              <button className="advertList__advert-sctn__grid__product__btns__decrement" data-product-id={product.id} onClick={e => updateProductAmount(e, -1)}></button>  
            </div>
          </li>
          )}
        </ul>
      </section>
      <section className="advertList__btn-sctn">
        {allProductsLoaded || <button className="advertList__btn-sctn__load-more" onClick={() => setLoadLimit(num => num + 24 < matchedProducts.length ? (num + 24) : matchedProducts.length)}>{en ? 'Load More' : 'عرض المزيد'}</button>}
        <div className="advertList__btn-sctn__load-amount">{en ? `${loadLimit} showing out of ${matchedProducts.length} results` : `${loadLimit} معروض من ${matchedProducts.length} نتيجه`}</div>
      </section>
    </div>
  )
}

export default AdvertList;
