import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  activeCategoryId: 0,
  activeSortingType: {
    name: 'большей популярности',
    sortingType: 'rating',
  },
};

const filtrationSlice = createSlice({
  name: 'filtration',
  initialState,
  reducers: {
    currentPageChanged: (state, action) => {
      state.currentPage = action.payload;
    },
    activeCategoryIdChanged: (state, action) => {
      state.activeCategoryId = action.payload;
    },
    activeSortingTypeChanged: (state, action) => {
      state.activeSortingType = action.payload;
    },
  },
});

export const { currentPageChanged, activeCategoryIdChanged, activeSortingTypeChanged } =
  filtrationSlice.actions;
export default filtrationSlice.reducer;
