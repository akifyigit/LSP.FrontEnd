import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scheduleInfo: {
    day: '',
    classroomId: 0,
    lectureId: 0,
    startHour: 0,
    endHour: 0,
  },
};

export const scheduleSlice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {
    setScheduleInfo: (state, action) => {
      const { field, value } = action.payload;
      state.scheduleInfo[field] = value;
    },
    clearScheduleInfo: () => {
      return initialState;
    },
  },
});
export const scheduleInfoSelector = (state) => state.schedules.scheduleInfo;
export const { setScheduleInfo, clearScheduleInfo } = scheduleSlice.actions;
export const scheduleReducer = scheduleSlice.reducer;
export const scheduleReducerName = scheduleSlice.name;
export default scheduleSlice.reducer;
