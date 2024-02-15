import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPizzaById } from '../../utils/pizzasApi';

interface InitialStateInterface {
  singlePizza: any;
  singlePizzaStatus: string;
  error: string | undefined;
}

const initialState: InitialStateInterface = {
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
      .addCase(fetchPizzaById.fulfilled, (state, action) => {
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

export default singlePizzaSlice.reducer;
