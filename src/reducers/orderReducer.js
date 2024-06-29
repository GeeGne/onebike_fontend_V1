function orderReducer(order, action) {
  const {type, cart} = action

  const calculateTotal = () => {
    let total = 0;
    cart.forEach(product => total += product.quantityPrice)
    return total;
  }

  switch (type) {
    case 'UPDATE_PRODUCTS':
      return {...order, products: cart, total: calculateTotal()};
    default:
      console.error('Error: Unknown type: ' + type);
      return {...order};
  }
}

export default orderReducer;