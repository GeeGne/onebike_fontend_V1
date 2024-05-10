import React, {useState, useEffect} from 'react';

function Products ({gategory, type}) {

  useEffect(() => {

  }, [gategory, type])

  return (
    <>
      <div>hi</div>
      <div>{type ? type : gategory}</div>
    </>
  )
}

export default Products;