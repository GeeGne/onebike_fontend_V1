function calculateDiscountPercantage (price, discount) {
  switch (typeof(discount)) {
    case 'string':
      return discount;
    case 'number':
      return Math.round((discount / price) * 100) + '%' ;
  }
}

export default calculateDiscountPercantage