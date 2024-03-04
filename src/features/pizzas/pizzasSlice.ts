import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

import { getPizzas } from '../../utils/pizzasApi';

import { PizzaInterface, PizzasStatusType } from '../../@types/pizzasTypes';
import { getItemFromLocalStorage } from '../../utils/getItemFromLocalStorage';

interface PizzasInterface {
  pizzas: PizzaInterface[];
  pizzasStatus: PizzasStatusType;
  error: string | undefined;
}

const pizzasInitialState: PizzasInterface = {
  pizzas: [],
  pizzasStatus: 'idle',
  error: '',
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
        state.pizzas = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaInterface[]>) => {
        state.pizzas = action.payload;
        state.pizzasStatus = 'succeeded';
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.error = action.error.message;
        state.pizzasStatus = 'failed';
        state.pizzas = [];
      });
  },
});

export const selectPizzas = (state: RootState) => state.pizzas;
export default pizzasSlice.reducer;
