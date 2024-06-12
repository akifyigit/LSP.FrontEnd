import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../../utils/axiosBaseQuery';

export const dashboardApi = createApi({
  reducerPath: 'dashboard',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['schedule'],
  endpoints: (builder) => ({
    getEntities: builder.query({
      query: () => ({
        method: 'GET',
        path: 'dashboard/statisticsOfEntities',
      }),
      providesTags: ['dashboard'],
    }),
    getAvaliableClasses: builder.query({
      query: ({ day, start, end }) => ({
        method: 'GET',
        path: `dashboard/availabilityOfClasses?Day=${day}&StartHour=${start}&EndHour=${end}`,
      }),
      providesTags: ['dashboard'],
    }),
  }),
});

export const dashboardApiReducerName = dashboardApi.reducerPath;
export const dashboardApiReducer = dashboardApi.reducer;
export const dashboardApiMiddleware = dashboardApi.middleware;

export const { useGetAvaliableClassesQuery, useGetEntitiesQuery } =
  dashboardApi;
