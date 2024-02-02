import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPizzas } from '../../utils/pizzasApi';

const initialState = {
  pizzas: [],
  status: 'idle',
  error: '',
};

export const getNewPizzas = createAsyncThunk('pizzas/fetchPizzas', async (newParams) => {
  return await getPizzas(newParams);
});

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getNewPizzas.pending, (state) => {
        state.status = 'fetching';
      })
      .addCase(getNewPizzas.fulfilled, (state, action) => {
        state.status = 'suceedeed';
        state.pizzas = action.payload;
      })
      .addCase(getNewPizzas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});

export default pizzasSlice.reducer;
