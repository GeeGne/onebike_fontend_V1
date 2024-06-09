import products from '/src/data/products.json';

function cartReducer(cart, action) {

  const updateQuantityAndCheckLimit = (prevAmount, newAmount) => {
    const totalAmount = prevAmount + newAmount;
    switch(true) {
      case totalAmount > 9:
        return 9
      case totalAmount < 1:
        return 1
      default:
        return totalAmount
    }
  }

  const checkProduct = () => {
    let itemFound;
    cart.forEach(item => item.id === action.product.id && (itemFound = true));
    return itemFound;
  }

  const updateCartProductQuantity = () => cart.map(item => item.id === action.product.id ? {...item, quantity: updateQuantityAndCheckLimit(item.quantity, action.quantity)} : item);

  const addProductToCart = () => {
    const newItem = {id: action.product.id, quantity: action.quantity, product: action.product};
    return [...cart, newItem];
  }

  const removeProductFromCart = () => cart.filter(item => item.id !== action.product.id );

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