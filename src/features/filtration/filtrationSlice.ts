import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

import {
  SortByInterface,
  SortByType,
  SortRuNameType,
  OrderType,
  /* AssignFiltrationInterface, */
} from '../../@types/filtrationTypes';

import { PAGE_LIMIT } from '../../utils/constants';

interface FiltrationInterface {
  page: number;
  category: null | number;
  sortBy: SortByType;
  sortRuName: SortRuNameType;
  order: OrderType;
  limit: number;
  filter: string;
}

const initialState: FiltrationInterface = {
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
    pageChanged: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    categoryChanged: (state, action: PayloadAction<number | null>) => {
      state.category = action.payload;
    },
    sortByChanged: (state, action: PayloadAction<SortByInterface>) => {
      state.sortBy = action.payload.sortBy;
      state.sortRuName = action.payload.sortRuName;
      if (action.payload.order !== undefined) {
        state.order = action.payload.order;
      }
    },
    filterChanged: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    /* assignFiltrationState: (state, action: PayloadAction<AssignFiltrationInterface>) => {
      state.page = +action.payload.page;
      if (action.payload.category !== undefined) {
        state.category = +action.payload.category;
      }
      state.sortBy = action.payload.sortBy;
      state.sortRuName = action.payload.sortRuName;
      state.order = action.payload.order;
    }, */
  },
});

export const selectFiltration = (state: RootState) => state.filtration;

export const {
  pageChanged,
  categoryChanged,
  sortByChanged,
  filterChanged /* , assignFiltrationState */,
} = filtrationSlice.actions;
export default filtrationSlice.reducer;
