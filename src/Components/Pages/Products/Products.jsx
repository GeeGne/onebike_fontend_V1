// HOOKS
import React, {useState, useEffect} from 'react';

// COMPONENTS
import BreadCrumb from '../../BreadCrumb';
import Controls from './Controls';

//SCSS
import '/src/Styles/Components/Pages/Products/Products.scss';

//UTILS
import capitalizeFirstLetter from '/src/Utils/capitalizeFirstLetter.js'

function Products ({category, type, darkMode, language}) {
  
  const [productCategory, setProductGategory] = useState('');

  useEffect(() => {
    setProductGategory(type ? type : category);
  }, [category, type])

  return (
    <>
      <div className="products-container">
        <section className="products-container__breadCrumb-container"><BreadCrumb/></section>
        <section className="products-container__category-title-container">
          <h1 className="products-container__category-title-container__h1">{capitalizeFirstLetter(productCategory)}</h1>
          <h3 className="products-container__category-title-container__result">&#10088;0 results&#10089;</h3>
        </section>
        <section className="products-container__controls-container"><Controls darkMode={darkMode} language={language}/></section>
      </div>
    </>
  )
}

export default Products;