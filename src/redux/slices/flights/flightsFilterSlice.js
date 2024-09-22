import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterInfo: {
    landingAirport: '',
    flightDate: '',
  },
};

export const flightsFilterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilterInfo: (state, action) => {
      const { field, value } = action.payload;
      state.filterInfo[field] = value;
    },
    clearFilterInfo: () => {
      return initialState;
    },
  },
});
export const filterInfoSelector = (state) => state.filters.filterInfo;
export const { setFilterInfo, clearFilterInfo } = flightsFilterSlice.actions;
export const filterReducer = flightsFilterSlice.reducer;
export const filterReducerName = flightsFilterSlice.name;
export default flightsFilterSlice.reducer;
