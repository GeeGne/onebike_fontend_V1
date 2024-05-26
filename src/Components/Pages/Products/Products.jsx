// HOOKS
import React, {useState, useEffect} from 'react';

// COMPONENTS
import BreadCrumb from '../../BreadCrumb';
import Controls from './Controls';
import AdvertList from './AdvertList';

//SCSS
import '/src/styles/components/pages/products/Products.scss';

//UTILS
import capitalizeFirstLetter from '/src/utils/capitalizeFirstLetter.js'
import cleanseString from '/src/utils/cleanseString.js'

function Products ({category, type, darkMode, lan}) {
  
  const [productCategory, setProductGategory] = useState('');

  useEffect(() => {
    setProductGategory(type ? type[lan] : category[lan]);
  }, [category, type, lan])

  return (
    <div className="products-container">
      <section className="products-container__breadCrumb-container"><BreadCrumb category={category} type={type} lan={lan}/></section>
      <section className="products-container__category-title-container">
        <h1 className="products-container__category-title-container__h1">{productCategory}</h1>
        <h3 className="products-container__category-title-container__result">&#10088;{lan === 'en' ? '0 results' : '0 نتيجه'}&#10089;</h3>
      </section>
      <Controls darkMode={darkMode} lan={lan}/>
      <AdvertList darkMode={darkMode} lan={lan} productCategory={cleanseString(productCategory)}/>
    </div>
  )
}

export default Products;