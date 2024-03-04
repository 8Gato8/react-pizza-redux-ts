import { CartInteface } from '../features/cart/cartSlice';

export const getCartFromLocalStorage = (): CartInteface => {
  const data = localStorage.getItem('cart');

  if (data) {
    return JSON.parse(data);
  }
  return {
    cartItems: [],
    totalCount: 0,
    totalCost: 0,
  };
};
