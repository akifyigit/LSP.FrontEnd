import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterInfo: {
    day: '',
    classroomTypeId: 0,
    classroomCapacityId: 0,
    startHour: 0,
    endHour: 0,
  },
};

export const filterSlice = createSlice({
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
export const { setFilterInfo, clearFilterInfo } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
export const filterReducerName = filterSlice.name;
export default filterSlice.reducer;
