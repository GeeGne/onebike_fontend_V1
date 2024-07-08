import {create} from 'zustand';

const isProductInWishlist = (wishlist ,product) => wishlist.some(item => item.id === product.id);
const useWishlistStore = create((set, get) => ({
  wishlist: [],
  addProductToWishlist: (product) => isProductInWishlist(get().wishlist, product) || set(state =>({wishlist: [...state.wishlist, product]})),
  removeProductFromWishlist: (product) => set({wishlist: [...get().wishlist.filter(item => item.id !== product.id)]}),
  wishlistToggle: false,
  setWishlistToggle: (boolean) => set({wishlistToggle: boolean}),
}))

export {useWishlistStore};