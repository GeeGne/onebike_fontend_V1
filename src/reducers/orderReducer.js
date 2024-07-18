function orderReducer(order, action) {
  const {type, cart, city: deliverTo, shippingFee: shipping, newNumber} = action

  const calculateTotal = () => {
    let total = 0;
    cart.forEach(product => total += product.quantityPrice)
    return total;
  }

  switch (type) {
    case 'UPDATE_PRODUCTS':
      return {...order, products: cart, total: calculateTotal()};
    case 'update_shipping_fee_and_inp':
      return {...order, shipping, deliverTo};
    case 'default_number_is_selected':
    case 'new_number_is_selected':
    case 'phone_number_inp':
      return {...order, newNumber};
    default:
      console.error('Error: Unknown type: ' + type);
      return {...order};
  }
}

export default orderReducer;