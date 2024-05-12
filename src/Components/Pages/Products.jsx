// HOOKS
import React, {useState, useEffect} from 'react';

// COMPONENTS
import BreadCrumb from '../BreadCrumb';

function Products ({category, type}) {
  const [productCategory, setProductGategory] = useState(null);
  useEffect(() => {
    setProductGategory(type ? type : category);
  }, [category, type])

  return (
    <>
      <div className="products-container">
      <section className="products-container__breadCrumb-container">
        <BreadCrumb/>
      </section>
      <section className="products-container__category-title-container">
        <h1>{productCategory}</h1>
        </section>
      </div>
    </>
  )
}

export default Products;