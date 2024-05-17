// HOOKS
import React, {useState, useEffect} from 'react';

// COMPONENTS
import BreadCrumb from '../../BreadCrumb';
import Controls from './Controls';
import AdvertList from './AdvertList';

//SCSS
import '/src/Styles/Components/Pages/Products/Products.scss';

//UTILS
import capitalizeFirstLetter from '/src/Utils/capitalizeFirstLetter.js'

function Products ({category, type, darkMode, language}) {
  
  const [productCategory, setProductGategory] = useState('');

  useEffect(() => {
    setProductGategory(type ? type[language] : category[language]);
  }, [category, type, language])

  return (
    <>
      <div className="products-container">
        <section className="products-container__breadCrumb-container"><BreadCrumb category={category} type={type} language={language}/></section>
        <section className="products-container__category-title-container">
          <h1 className="products-container__category-title-container__h1">{productCategory}</h1>
          <h3 className="products-container__category-title-container__result">&#10088;{language === 'english' ? '0 results' : '0 نتيجه'}&#10089;</h3>
        </section>
        <section className="products-container__controls-container"><Controls darkMode={darkMode} language={language}/></section>
        <section className="products-container__advertList-container"><AdvertList darkMode={darkMode} language={language}/></section>
      </div>
    </>
  )
}

export default Products;