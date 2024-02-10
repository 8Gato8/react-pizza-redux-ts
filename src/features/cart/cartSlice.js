import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  totalCost: 0,
  totalCount: 0,
};

export const selectCartItemByParams = (state, item) => {
  return state.cartItems.find(
    (cartItem) =>
      cartItem.price === item.price &&
      cartItem.id === item.id &&
      cartItem.type === item.type &&
      cartItem.size === item.size,
  );
};

const selectItemsWithoutRemovedItem = (state, item) => {
  return state.cartItems.filter((cartItem) => {
    return !(
      cartItem.price === item.price &&
      cartItem.id === item.id &&
      cartItem.type === item.type &&
      cartItem.size === item.size
    );
  });
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartItemAdded: (state, action) => {
      const sameItem = selectCartItemByParams(state, action.payload);

      if (sameItem) {
        sameItem.count++;
      } else {
        state.cartItems.push({ ...action.payload, count: 1 });
      }

      state.totalCost = state.cartItems.reduce((sum, cartItem) => {
        return cartItem.price * cartItem.count + sum;
      }, 0);

      state.totalCount = state.cartItems.reduce((sum, cartItem) => {
        return cartItem.count + sum;
      }, 0);
    },
    cartItemNumberDecreased: (state, action) => {
      const sameItem = selectCartItemByParams(state, action.payload);

      sameItem.count--;

      state.totalCost -= action.payload.price;
      state.totalCount--;
    },
    cartItemRemoved: (state, action) => {
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

export const selectCart = (state) => state.cart;

export const { cartItemAdded, cartItemNumberDecreased, cartItemRemoved, allCartItemsRemoved } =
  cartSlice.actions;
export default cartSlice.reducer;
