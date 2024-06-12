import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lang: 'tr',
};

export const localizationSlice = createSlice({
  name: 'localization',
  initialState,
  reducers: {
    changelocalization: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const currentLangSelector = (state) => state.lang;
export const { changelocalization } = localizationSlice.actions;

export const localizationReducer = localizationSlice.reducer;
export const localizationReducerName = localizationSlice.name;

export default localizationSlice.reducer;
