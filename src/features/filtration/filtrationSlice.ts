import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

import {
  SortByInterface,
  SortByType,
  SortRuNameType,
  OrderType,
} from '../../@types/filtrationTypes';

import { getItemFromLocalStorage } from '../../utils/getItemFromLocalStorage';

export interface FiltrationInterface {
  page: number;
  category: null | number;
  sortBy: SortByType;
  sortRuName: SortRuNameType;
  order: OrderType;
  filter: string;
}

const filtrationInitialState: FiltrationInterface = {
  page: 1,
  category: null,
  sortBy: 'rating',
  sortRuName: 'большей популярности',
  order: 'desc',
  filter: '',
};

const initialState = getItemFromLocalStorage(filtrationInitialState, 'filtration');

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
    filterReset: (state) => {
      state.filter = '';
    },
    allFiltrationReset: () => {
      return filtrationInitialState;
    },
  },
});

export const selectFiltration = (state: RootState) => state.filtration;

export const {
  pageChanged,
  categoryChanged,
  sortByChanged,
  filterChanged,
  filterReset,
  allFiltrationReset,
} = filtrationSlice.actions;
export default filtrationSlice.reducer;
