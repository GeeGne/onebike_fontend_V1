function calculatePrice (price, discount) {
  switch(typeof(discount)) {
    case 'string':
      const discountVal = parseFloat(discount);
      const discountAmount = (price * discountVal) / 100;
      return price - discountAmount;
    case 'number':
      return price - discount;
    case 'boolean':
      return price;
    default:
      console.log('Unknown type:' + type);
  }
}

export default calculatePrice;