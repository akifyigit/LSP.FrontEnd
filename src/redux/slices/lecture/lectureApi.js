import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../../utils/axiosBaseQuery';

export const lectureApi = createApi({
  reducerPath: 'lectureApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['lecture'],
  endpoints: (builder) => ({
    createLecture: builder.mutation({
      query: ({ data }) => ({
        data,
        method: 'POST',
        path: 'lecture',
      }),
      providesTags: ['lecture'],
    }),
    getDepartments: builder.query({
      query: () => ({
        method: 'GET',
        path: 'department',
      }),
      providesTags: ['department'],
    }),
  }),
});

export const lectureApiReducerName = lectureApi.reducerPath;
export const lectureApiReducer = lectureApi.reducer;
export const lectureApiMiddleware = lectureApi.middleware;

export const { useCreateLectureMutation, useGetDepartmentsQuery } = lectureApi;
