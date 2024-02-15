import { createSlice, createSelector } from '@reduxjs/toolkit';

interface CartItemInterface {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  type: string;
  size: number;
  count: number;
}

interface InitialStateInterface {
  cartItems: Array<any>;
  totalCost: number;
  totalCount: number;
}

const initialState: InitialStateInterface = {
  cartItems: [],
  totalCost: 0,
  totalCount: 0,
};

const selectItemsWithoutRemovedItem = createSelector(
  [(state) => state.cartItems, (state, item: CartItemInterface) => item],
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
  state: any,
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

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartItemAdded: (state, action: { type: string; payload: CartItemInterface }) => {
      const sameItem = selectCartItemByParams(state, action.payload);

      if (sameItem !== undefined) {
        sameItem!.count++;
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
    cartItemNumberDecreased: (state, action) => {
      const sameItem = selectCartItemByParams(state, action.payload);

      sameItem!.count--;

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

export const selectCart = (state: any) => state.cart;

export const { cartItemAdded, cartItemNumberDecreased, cartItemRemoved, allCartItemsRemoved } =
  cartSlice.actions;
export default cartSlice.reducer;
