import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pizzas: [],
  totalCost: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    pizzaAdded: (state, action) => {
      const sameItem = state.pizzas.find(
        (pizza) =>
          pizza.price === action.payload.price &&
          pizza.id === action.payload.id &&
          pizza.type === action.payload.type &&
          pizza.size === action.payload.size,
      );

      if (sameItem) {
        sameItem.count++;
      } else {
        state.pizzas.push({ ...action.payload, count: 1 });
      }

      state.totalCost = state.pizzas.reduce((sum, pizza) => {
        return pizza.price * pizza.count + sum;
      }, 0);
    },
    pizzaNumberDecreased: (state, action) => {
      const sameItem = state.pizzas.find(
        (pizza) =>
          pizza.price === action.payload.price &&
          pizza.id === action.payload.id &&
          pizza.type === action.payload.type &&
          pizza.size === action.payload.size,
      );
      sameItem.count--;

      state.totalCost -= action.payload.price;
    },
    pizzaRemoved: (state, action) => {
      state.pizzas = state.pizzas.filter((pizza) => {
        return !(
          pizza.price === action.payload.price &&
          pizza.type === action.payload.type &&
          pizza.size === action.payload.size &&
          pizza.price === action.payload.price &&
          pizza.id === action.payload.id
        );
      });
      state.totalCost -= action.payload.price * action.payload.count;
    },
    allPizzasRemoved: (state) => {
      state.pizzas = [];
      state.totalCost = 0;
    },
  },
});

export const { pizzaAdded, pizzaNumberDecreased, pizzaRemoved, allPizzasRemoved } =
  cartSlice.actions;
export default cartSlice.reducer;
