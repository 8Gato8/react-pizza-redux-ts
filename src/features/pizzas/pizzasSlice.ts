import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

import { getPizzas } from '../../utils/pizzasApi';

import { PizzaInterface, PizzasStatusType } from '../../@types/pizzasTypes';
import { getItemFromLocalStorage } from '../../utils/getItemFromLocalStorage';

export interface ErrorInterface {
  message: string | undefined;
  status: number | undefined;
}

interface PizzasInterface {
  pizzas: PizzaInterface[];
  pizzasStatus: PizzasStatusType;
  error: ErrorInterface;
}

const pizzasInitialState: PizzasInterface = {
  pizzas: [],
  pizzasStatus: 'idle',
  error: {
    message: '',
    status: 0,
  },
};

const initialState = getItemFromLocalStorage(pizzasInitialState, 'pizzas');

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (newParams: string) => {
  return await getPizzas(newParams);
});

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.pizzasStatus = 'loading';
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaInterface[]>) => {
        state.pizzas = action.payload;
        state.pizzasStatus = 'succeeded';
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        if (action.error.message) {
          state.error.message = action.error.message;
          state.error.status = +action.error.message.slice(-3);
          console.log(+action.error.message?.slice(-3));
        }
        state.pizzasStatus = 'failed';
        state.pizzas = [];
      });
  },
});

export const selectPizzas = (state: RootState) => state.pizzas;
export default pizzasSlice.reducer;
