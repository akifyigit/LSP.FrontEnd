import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lectureInfo: {
    name: '',
    departmentId: 0,
  },
};

export const lectureSlice = createSlice({
  name: 'lecture',
  initialState,
  reducers: {
    setLectureInfo: (state, action) => {
      const { field, value } = action.payload;
      state.lectureInfo[field] = value;
    },
    clearLectureInfo: () => {
      return initialState;
    },
  },
});
export const lectureInfoSelector = (state) => state.lecture.lectureInfo;
export const { setLectureInfo, clearLectureInfo } = lectureSlice.actions;
export const lectureReducer = lectureSlice.reducer;
export const lectureReducerName = lectureSlice.name;
export default lectureSlice.reducer;
