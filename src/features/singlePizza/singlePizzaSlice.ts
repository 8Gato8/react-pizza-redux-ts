import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

import { getPizzaById } from '../../utils/pizzasApi';

import { PizzaInterface } from '../../types/pizzasTypes';

interface SinglePizzaInterface {
  singlePizza: PizzaInterface | Record<string, never>;
  singlePizzaStatus: string;
  error: string | undefined;
}

const initialState: SinglePizzaInterface = {
  singlePizza: {},
  singlePizzaStatus: 'idle',
  error: '',
};

export const fetchPizzaById = createAsyncThunk('pizzas/fetchPizzaById', async (id: number) => {
  return await getPizzaById(id);
});

const singlePizzaSlice = createSlice({
  name: 'singlePizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzaById.pending, (state) => {
        state.singlePizzaStatus = 'loading';
        state.singlePizza = {};
      })
      .addCase(fetchPizzaById.fulfilled, (state, action: PayloadAction<PizzaInterface>) => {
        state.singlePizza = action.payload;
        state.singlePizzaStatus = 'succeeded';
      })
      .addCase(fetchPizzaById.rejected, (state, action) => {
        state.error = action.error.message;
        state.singlePizzaStatus = 'failed';
        state.singlePizza = {};
      });
  },
});

export const selectSinglePizza = (state: RootState) => state.singlePizza;

export default singlePizzaSlice.reducer;
