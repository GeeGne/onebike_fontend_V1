// ZUSTAND
import {create} from 'zustand';

// UTILS
import localStorage from '/src/utils/localStorage';

const isProductInWishlist = (wishlist ,product) => wishlist.some(item => item.id === product.id);
const useWishlistStore = create((set, get) => ({
  wishlist: JSON.parse(window.localStorage.getItem('wishlist')) || [],
  addProductToWishlist: (product) => isProductInWishlist(get().wishlist, product) || set(state =>({wishlist: [...state.wishlist, product]})),
  removeProductFromWishlist: (product) => set({wishlist: [...get().wishlist.filter(item => item.id !== product.id)]}),
  wishlistToggle: false,
  setWishlistToggle: (boolean) => set({wishlistToggle: boolean}),
}))

useWishlistStore.subscribe(
  (state) => state.wishlist,
  (wishlist) => {
    window.localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }
);

const useCartStore = create((set, get) => ({
  cart: [],
  cartToggle: false
}));

export {useWishlistStore, useCartStore};