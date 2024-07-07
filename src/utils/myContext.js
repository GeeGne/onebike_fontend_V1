import {createContext} from 'react';

const CartProductsContext = createContext([]);
const CartContext = createContext([]);
const WishlistToggleContext = createContext(false);

export {CartProductsContext, CartContext, WishlistToggleContext};