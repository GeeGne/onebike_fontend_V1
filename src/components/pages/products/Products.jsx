// HOOKS
import React, {useState, useEffect} from 'react';

// COMPONENTS
import BreadCrumb from '../../BreadCrumb';
import Controls from './Controls';
import EmptyList from './EmptyList';
import AdvertList from './AdvertList';

// SCSS
import '/src/styles/components/pages/products/Products.scss';

// JSON
import products from '/src/data/products.json';

// UTILS
import capitalizeFirstLetter from '/src/utils/capitalizeFirstLetter.js';
import cleanseString from '/src/utils/cleanseString.js';

function Products ({category, type, darkMode, lan}) {
  
  const productCategory = type ? type[lan] : category[lan];
  const productCategoryEN = type ? type.en : category.en;
  const matchedProducts = products.filter(product => product.category === cleanseString(productCategoryEN) || product.type  === cleanseString(productCategoryEN));
  const totalProducts = matchedProducts.length;

  return (
    <div className="products-container">
      <section className="products-container__breadCrumb-container"><BreadCrumb category={category} type={type} lan={lan}/></section>
      <section className="products-container__category-title-container">
        <h1 className="products-container__category-title-container__h1">{productCategory}</h1>
        <h3 className="products-container__category-title-container__result">&#10088;{lan === 'en' ? totalProducts + ' results' : totalProducts + ' نتيجه'}&#10089;</h3>
      </section>
      <Controls darkMode={darkMode} lan={lan}/>
      {totalProducts === 0 ? 
      <EmptyList darkMode={darkMode} lan={lan} productCategoryEN={cleanseString(productCategoryEN)} productCategory={productCategory}/> : 
      <AdvertList darkMode={darkMode} lan={lan} matchedProducts={matchedProducts}/>}
    </div>
  )
}

export default Products;