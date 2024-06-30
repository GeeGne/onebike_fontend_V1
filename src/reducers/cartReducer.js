import calculatePrice from '/src/utils/calculatePrice.js';

function cartReducer(cart, action) {
  const {type, quantity, product, getCart} = action;
  
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

  const newProduct = () => ({id: product.id, quantity, quantityPrice: calculatePrice(product.price, product.discount) * quantity, price: calculatePrice(product.price, product.discount), product: product})
  const checkProduct = () => cart.filter(item => item.id === product.id)[0];
  const updateCartProductQuantity = () => cart.map(item => item.id === product.id ? {...item, quantity: updateQuantityAndCheckLimit(item.quantity, quantity), quantityPrice: calculatePrice(item.product.price, item.product.discount) * updateQuantityAndCheckLimit(item.quantity, quantity)} : item);
  const removeProductFromCart = () => cart.filter(item => item.id !== product.id);
  const addProductToCart = () => [...cart, newProduct()];
  
  switch (type) {
    case 'ADD_TO_CART':
      return checkProduct() ? updateCartProductQuantity() : addProductToCart();
    case 'REMOVE_FROM_CART':
      return removeProductFromCart();
    case 'INCREASE_AMOUNT_BY_ONE':
      return updateCartProductQuantity();
    case 'DECREASE_AMOUNT_BY_ONE':
      return updateCartProductQuantity();
    case 'ADD_CART_FROM_LOCAL_STORAGE':
      return [...getCart];
    default:
      console.error('Error: Unknown type: ' + type);
      return [...cart];
  }
}

export default cartReducer;