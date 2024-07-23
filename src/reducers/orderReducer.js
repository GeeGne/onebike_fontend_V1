// NANOID
import {nanoid} from 'nanoid';

// UTILS
import getCurrentDateFormat from '/src/utils/getCurrentDateFormat';

nanoid(12)
function orderReducer(order, action) {
  const {type, cart, city, shippingCost, phone, addressDetails, secondAddress, notes, user, userData} = action

  const calculateTotal = () => {
    let total = 0;
    cart.forEach(product => total += product.quantityPrice)
    return total;
  }

  switch (type) {
    case 'update_products':
      return {...order, products: cart, total: order.shippingCost + calculateTotal(), subtotal: calculateTotal()};
    case 'update_costumer':
      return {...order, costumer: {...order.costumer, costumerId: userData?.userId, fullName: userData?.fullName, email: userData?.email, phone: userData?.phone}}      
    case 'update_shipping_fee_and_inp':
      return {...order, shippingCost, shippingAddress: {...order.shippingAddress, city}, total: order.total + shippingCost};
    case 'default_number_is_selected':
    case 'phone':
      return {...order, costumer: {...order.costumer, phone}};
    case 'addressDetails':
      return {...order, shippingAddress: {...order.shippingAddress, addressDetails}};
    case 'secondAddress':
      return {...order, shippingAddress: {...order.shippingAddress, secondAddress}};
    case 'notes':
      return {...order, notes};
    default:
      console.error('Error: Unknown type: ' + type);
      return {...order};
  }
}

export default orderReducer;