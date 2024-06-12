import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classesInfo: {
    name: '',
    classroomTypeId: 0,
    classroomCapacityId: 0,
  },
};

export const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    setClassesInfo: (state, action) => {
      const { field, value } = action.payload;
      state.classesInfo[field] = value;
    },
    clearClassesInfo: () => {
      return initialState;
    },
  },
});
export const classesInfoSelector = (state) => state.classes.classesInfo;
export const { setClassesInfo, clearClassesInfo } = classesSlice.actions;
export const classesReducer = classesSlice.reducer;
export const classesReducerName = classesSlice.name;
export default classesSlice.reducer;
