import React, {useState, useEffect} from 'react';

function Products ({category, type}) {

  useEffect(() => {

  }, [category, type])

  return (
    <>
      <div>hi</div>
      <div>{type ? type : category}</div>
      {/* <div>{type ? type }</div> */}
    </>
  )
}

export default Products;