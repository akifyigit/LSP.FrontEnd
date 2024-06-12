import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../../utils/axiosBaseQuery';

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ data }) => ({
        data,
        method: 'POST',
        path: 'auth/login',
      }),
    }),
    checkToken: builder.query({
      query: () => ({
        method: 'GET',
        path: 'auth/checkToken',
      }),
    }),
  }),
});

export const loginApiReducerName = loginApi.reducerPath;
export const loginApiReducer = loginApi.reducer;
export const loginApiMiddleware = loginApi.middleware;

export const { useLoginMutation, useCheckTokenQuery } = loginApi;
