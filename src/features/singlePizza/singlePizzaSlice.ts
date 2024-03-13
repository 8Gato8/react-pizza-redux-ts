import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

import { getPizzaById } from '../../utils/pizzasApi';

import { PizzaInterface, PizzasStatusType } from '../../@types/pizzasTypes';

import { ErrorInterface } from '../pizzas/pizzasSlice';

interface SinglePizzaInterface {
  singlePizza: PizzaInterface | Record<string, never>;
  singlePizzaStatus: PizzasStatusType;
  error: ErrorInterface;
}

const initialState: SinglePizzaInterface = {
  singlePizza: {},
  singlePizzaStatus: 'idle',
  error: {
    message: '',
    status: 0,
  },
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
        if (action.error.message) {
          state.error.message = action.error.message;
          state.error.status = +action.error.message.slice(-3);
          console.log(+action.error.message?.slice(-3));
        }
        state.singlePizzaStatus = 'failed';
        state.singlePizza = {};
      });
  },
});

export const selectSinglePizza = (state: RootState) => state.singlePizza;

export default singlePizzaSlice.reducer;
