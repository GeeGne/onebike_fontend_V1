function calculatePrice (price, discount) {
  switch(typeof(discount)) {
    case 'string':
      console.log('working-string');
      const discountVal = parseFloat(discount);
      const discountAmount = (price * discountVal) / 100;
      return price - discountAmount;
    case 'number':
      console.log('working-number');
      return price - discount;
  }
}

export default calculatePrice;