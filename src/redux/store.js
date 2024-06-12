import { configureStore } from '@reduxjs/toolkit';
import middleware from 'redux/middleware';
import rootReducer from 'redux/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});
