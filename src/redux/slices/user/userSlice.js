import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const userInfoSelector = (state) => state.userInfo;
export const { updateUserInfo } = userSlice.actions;

export const userReducer = userSlice.reducer;
export const userReducerName = userSlice.name;

export default userSlice.reducer;
