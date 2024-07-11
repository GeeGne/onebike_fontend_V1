// ZUSTAND
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

const isProductInWishlist = (wishlist ,product) => wishlist.some(item => item.id === product.id);
const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],
      addProductToWishlist: (product) => isProductInWishlist(get().wishlist, product) || set(state =>({wishlist: [...state.wishlist, product]})),
      removeProductFromWishlist: (product) => set({wishlist: [...get().wishlist.filter(item => item.id !== product.id)]}),
      toggle: false,
      setToggle: (boolean) => set({toggle: boolean}),
    }),
    {
      name: 'wishlist-storage',
      getStorage: () => localStorage,
    }
  )
)

const useCartStore = create((set, get) => ({
  cart: [],
  toggle: false,
  setToggle: boolean => set({toggle: boolean}),
  
}));

export {useWishlistStore, useCartStore};