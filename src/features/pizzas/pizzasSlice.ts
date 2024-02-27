import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

import { getPizzas } from '../../utils/pizzasApi';

import { PizzaInterface } from '../../types/pizzasTypes';

interface PizzasInterface {
  pizzas: Array<PizzaInterface>;
  pizzasStatus: string;
  error: string | undefined;
}

const initialState: PizzasInterface = {
  pizzas: [],
  pizzasStatus: 'idle',
  error: '',
};

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
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Array<PizzaInterface>>) => {
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
