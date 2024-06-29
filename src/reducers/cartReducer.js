import products from '/src/data/products.json';
import calculatePrice from '/src/utils/calculatePrice.js';

function cartReducer(cart, action) {

  const updateQuantityAndPriceCheckLimit = (prevAmount, newAmount) => {
    const totalAmount = prevAmount + newAmount;
    switch (true) {
      case totalAmount > 9:
        return 9
      case totalAmount < 1:
        return 1
      default:
        return totalAmount
    }
  }

  const updateQuantityAndCheckLimit = (prevAmount, newAmount) => {
    const totalAmount = prevAmount + newAmount;
    switch (true) {
      case totalAmount > 9:
        return 9
      case totalAmount < 1:
        return 1
      default:
        return totalAmount
    }
  }

  const newProduct = () => ({id: action.product.id, quantity: action.quantity, quantityPrice: calculatePrice(action.product.price, action.product.discount) * action.quantity, price: calculatePrice(action.product.price, action.product.discount), product: action.product})
  const checkProduct = () => cart.filter(item => item.id === action.product.id)[0];
  const updateCartProductQuantity = () => cart.map(item => item.id === action.product.id ? {...item, quantity: updateQuantityAndCheckLimit(item.quantity, action.quantity), quantityPrice: calculatePrice(item.product.price, item.product.discount) * updateQuantityAndCheckLimit(item.quantity, action.quantity)} : item);
  const removeProductFromCart = () => cart.filter(item => item.id !== action.product.id);
  const addProductToCart = () => [...cart, newProduct()];
  
  switch (action.type) {
    case 'ADD_TO_CART':
      return checkProduct() ? updateCartProductQuantity() : addProductToCart();
    case 'REMOVE_FROM_CART':
      return removeProductFromCart();
    case 'INCREASE_AMOUNT_BY_ONE':
      return updateCartProductQuantity();
    case 'DECREASE_AMOUNT_BY_ONE':
      return updateCartProductQuantity();
    default:
      return [...cart];
  }
}

export default cartReducer;