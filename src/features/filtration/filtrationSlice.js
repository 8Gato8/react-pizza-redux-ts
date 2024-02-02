import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    activeCategoryIdChanged: (state, action) => {
      state.activeCategoryId = action.payload;
    },
    activeSortingTypeChanged: (state, action) => {
      state.activeSortingType = action.payload;
    },
  },
});

export const { activeCategoryIdChanged, activeSortingTypeChanged } = filtrationSlice.actions;
export default filtrationSlice.reducer;
