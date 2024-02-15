import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPizzas } from '../../utils/pizzasApi';

interface PizzasInterface {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

interface InitialStateInterface {
  pizzas: Array<any> | [];
  pizzasStatus: string;
  error: string | undefined;
}

const initialState: InitialStateInterface = {
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
      .addCase(fetchPizzas.fulfilled, (state, action) => {
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

export default pizzasSlice.reducer;
