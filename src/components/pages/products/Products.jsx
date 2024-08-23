// HOOKS
import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet-async';

// COMPONENTS
import BreadCrumb from '../../BreadCrumb';
import Controls from './Controls';
import EmptyList from './EmptyList';
import AdvertList from './AdvertList';
import NeedHelp from '../../NeedHelp';

// SCSS
import '/src/styles/components/pages/products/Products.scss';

// JSON

// UTILS
import capitalizeFirstLetter from '/src/utils/capitalizeFirstLetter.js';
import cleanseString from '/src/utils/cleanseString.js';

// STORE 
import { useDataStore } from '/src/store/store';

function Products ({category, type, darkMode, lan, onCartProductsChange}) {

  const { products } = useDataStore();
  const pageURL = window.location.href;
  const checkMatchedProduct = (category, type) => category === cleanseString(productCategoryEN) || type  === cleanseString(productCategoryEN)

  const productCategory = type ? type[lan] : category[lan];
  const productCategoryEN = type ? type.en : category.en;
  const matchedProducts = products.filter(product => checkMatchedProduct(product.category, product.type) && product.state !== 'hidden');
  const totalProducts = matchedProducts.length;

  // const cartProductsData = data => onCartProductsChange(data);
  const cartProductsData = data => onCartProductsChange(data);

  return (

    <>
      <Helmet>
        <title>Products - Quality Bicycles and Bicycle Parts for Sale | ONEBIKE</title>
        <meta name="description" content="Explore a wide range of quality bicycles and bicycle parts for sale at ONEBIKE. Find the best deals on bikes, components, and accessories in Syria." />
        <meta name="keywords" content="bicycles, bicycle parts, bike accessories, bike sale, ONEBIKE, quality bikes, bicycle components" />
        <meta name="author" content="ONEBIKE" />
        
        <meta property="og:title" content="Products - Quality Bicycles and Bicycle Parts for Sale | ONEBIKE" />
        <meta property="og:description" content="Explore a wide range of quality bicycles and bicycle parts for sale at ONEBIKE. Find the best deals on bikes, components, and accessories in Syria." />
        <meta property="og:image" content="https://yourwebsite.com/path/to/your-image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com/products" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ONEBIKE" />
        
        <link rel="canonical" href={pageURL} />
      </Helmet>
      <div className="products-container">
        <section className="products-container__breadCrumb-container"><BreadCrumb category={category} type={type} lan={lan}/></section>
        <section className="products-container__category-title-container">
          <h1 className="products-container__category-title-container__h1">{productCategory}</h1>
          <h3 className="products-container__category-title-container__result">&#10088;{lan === 'en' ? totalProducts + ' results' : totalProducts + ' نتيجه'}&#10089;</h3>
        </section>
        <Controls darkMode={darkMode} lan={lan}/>
        {totalProducts === 0 ? <>
        <EmptyList darkMode={darkMode} lan={lan} productCategoryEN={cleanseString(productCategoryEN)} productCategory={productCategory}/> 
        <NeedHelp darkMode={darkMode} lan={lan}/></>
        : 
        <AdvertList darkMode={darkMode} lan={lan} matchedProducts={matchedProducts} onCartProductsChange={cartProductsData}/>}
      </div>
    </>
  )
}

export default Products;