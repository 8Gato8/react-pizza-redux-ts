import { configureStore } from '@reduxjs/toolkit';
import pizzasReducer from '../features/pizzas/pizzasSlice';
import cartReducer from '../features/cart/cartSlice';
import filtrationReducer from '../features/filtration/filtrationSlice';
import singlePizzaReducer from '../features/singlePizza/singlePizzaSlice';

export const store = configureStore({
  reducer: {
    pizzas: pizzasReducer,
    cart: cartReducer,
    filtration: filtrationReducer,
    singlePizza: singlePizzaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
