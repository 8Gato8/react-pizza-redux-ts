import { createSlice } from '@reduxjs/toolkit';
import store from '../../app/store';
import { PAGE_LIMIT } from '../../utils/constants';

interface InitialStateInterface {
  page: number;
  category: null | number;
  sortBy: string;
  sortRuName: string;
  order: string;
  limit: number;
  filter: string;
}

const initialState: InitialStateInterface = {
  page: 1,
  category: null,
  sortBy: 'rating',
  sortRuName: 'большей популярности',
  order: 'desc',
  limit: PAGE_LIMIT,
  filter: '',
};

const filtrationSlice = createSlice({
  name: 'filtration',
  initialState,
  reducers: {
    pageChanged: (state, action) => {
      state.page = action.payload;
    },
    categoryChanged: (state, action) => {
      state.category = action.payload;
    },
    sortByChanged: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.sortRuName = action.payload.sortRuName;
      state.order = action.payload.order;
    },
    changeLimit: (state, action) => {
      state.limit = action.payload.limit;
    },
    filterChanged: (state, action) => {
      state.filter = action.payload;
    },
    assignFiltrationState: (state, action) => {
      state.page = +action.payload.page;
      state.category = +action.payload.category;
      state.sortBy = action.payload.sortBy;
      state.sortRuName = action.payload.sortRuName;
      state.order = action.payload.order;
    },
  },
});

export const selectFiltration = (state: any) => state.filtration;

export const {
  pageChanged,
  categoryChanged,
  sortByChanged,
  changeLimit,
  filterChanged,
  assignFiltrationState,
} = filtrationSlice.actions;
export default filtrationSlice.reducer;
