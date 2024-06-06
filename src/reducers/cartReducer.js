import products from '/src/data/products.json';

function cartReducer(cart, action) {

  const updateQuantityAndCheckLimit = (prevAmount, newAmount) => {
    const totalAmount = prevAmount + newAmount;
    return totalAmount > 9 ? 9 : totalAmount;
  }

  const checkProduct = () => {
    let itemFound;
    cart.forEach(item => item.id === action.product.id && (itemFound = true));
    return itemFound;
  }

  const updateCartProductQuanitiy = () => {
    return cart.map(item => item.id === action.product.id ? {...item, quantity: updateQuantityAndCheckLimit(item.quantity, action.quantity)} : item);
  }

  const addProductToCart = () => {
    const newItem = {id: action.product.id, quantity: action.quantity, product: action.product};
    return [...cart, newItem];
  }

  switch (action.type) {
    case 'ADD_TO_CART':
      const updatedCart = checkProduct() ? updateCartProductQuanitiy() : addProductToCart();
      return updatedCart;
    case 'MODIFY__AMOUNT':
      return;
    case 'REMOVE_FROM_CART':
      return;
    case 'TOGGLE_CART_SLIDER':
      return;
  }
}

export default cartReducer;