import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

import { CartItemInterface } from '../../@types/cartItemTypes';

import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage';

export interface CartInteface {
  cartItems: CartItemInterface[];
  totalCost: number;
  totalCount: number;
}

/* const initialState: CartInteface = {
  cartItems: [],
  totalCost: 0,
  totalCount: 0,
}; */

const { cartItems, totalCost, totalCount } = getCartFromLocalStorage();

const initialState: CartInteface = {
  cartItems,
  totalCost,
  totalCount,
};

const selectItemsWithoutRemovedItem = createSelector(
  [(state) => state.cartItems, (_, item: CartItemInterface) => item],
  (cartItems, item) => {
    return cartItems.filter((cartItem: CartItemInterface) => {
      return !(
        cartItem.price === item.price &&
        cartItem.id === item.id &&
        cartItem.type === item.type &&
        cartItem.size === item.size
      );
    });
  },
);

export const selectCartItemByParams = (
  state: CartInteface,
  item: CartItemInterface,
): undefined | CartItemInterface => {
  return state.cartItems.find(
    (cartItem: CartItemInterface) =>
      cartItem.price === item.price &&
      cartItem.id === item.id &&
      cartItem.type === item.type &&
      cartItem.size === item.size,
  );
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartItemAdded: (state, action: PayloadAction<CartItemInterface>) => {
      const sameItem = selectCartItemByParams(state, action.payload);

      if (sameItem !== undefined) {
        sameItem.count++;
      } else {
        state.cartItems.push({ ...action.payload, count: 1 });
      }

      state.totalCost = state.cartItems.reduce((sum, cartItem: CartItemInterface) => {
        return cartItem.price * cartItem.count + sum;
      }, 0);

      state.totalCount = state.cartItems.reduce((sum, cartItem: CartItemInterface) => {
        return cartItem.count + sum;
      }, 0);
    },
    cartItemNumberDecreased: (state, action: PayloadAction<CartItemInterface>) => {
      const foundItem = selectCartItemByParams(state, action.payload);

      foundItem!.count--;

      state.totalCost -= action.payload.price;
      state.totalCount--;
    },
    cartItemRemoved: (state, action: PayloadAction<CartItemInterface>) => {
      state.cartItems = selectItemsWithoutRemovedItem(state, action.payload);
      state.totalCost -= action.payload.price * action.payload.count;
      state.totalCount -= action.payload.count;
    },
    allCartItemsRemoved: (state) => {
      state.cartItems = [];
      state.totalCost = 0;
      state.totalCount = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { cartItemAdded, cartItemNumberDecreased, cartItemRemoved, allCartItemsRemoved } =
  cartSlice.actions;
export default cartSlice.reducer;
