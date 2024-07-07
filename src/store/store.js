import {create} from 'zustand';

const useWishlistStore = create(set => ({
  wishlistToggle: false,
  setWishlistToggle: (boolean) => set({wishlistToggle: boolean}),
}))

export {useWishlistStore};