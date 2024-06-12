import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../../utils/axiosBaseQuery';

export const scheduleApi = createApi({
  reducerPath: 'schedule',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['schedule'],
  endpoints: (builder) => ({
    createSchedule: builder.mutation({
      query: ({ data }) => ({
        data,
        method: 'POST',
        path: 'scheduleRecord',
      }),
      providesTags: ['schedule'],
    }),
    getScheduleList: builder.query({
      query: () => ({
        method: 'GET',
        path: 'scheduleRecord',
      }),
      providesTags: ['schedule'],
    }),
    getlectureList: builder.query({
      query: () => ({
        method: 'GET',
        path: 'lecture',
      }),
      providesTags: ['lecture'],
    }),
  }),
});

export const scheduleApiReducerName = scheduleApi.reducerPath;
export const scheduleApiReducer = scheduleApi.reducer;
export const scheduleApiMiddleware = scheduleApi.middleware;

export const {
  useCreateScheduleMutation,
  useGetScheduleListQuery,
  useGetlectureListQuery,
} = scheduleApi;
