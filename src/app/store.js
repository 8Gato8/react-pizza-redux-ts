import { configureStore } from '@reduxjs/toolkit';
import pizzasReducer from '../features/pizzas/pizzasSlice';
import cartReducer from '../features/cart/cartSlice';
import filtrationReducer from '../features/filtration/filtrationSlice';
import singlePizzaReducer from '../features/singlePizza/singlePizzaSlice';

export default configureStore({
  reducer: {
    pizzas: pizzasReducer,
    cart: cartReducer,
    filtration: filtrationReducer,
    singlePizza: singlePizzaReducer,
  },
});
