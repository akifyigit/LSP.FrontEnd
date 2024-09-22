import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URL_LOCAL } from 'constant/Varible';

import { axiosBaseQuery } from '../../../utils/axiosBaseQuery';

export const flightsLocalApi = createApi({
  reducerPath: 'flightsLocal',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL_LOCAL }),
  tagTypes: ['flightsLocal'],
  endpoints: (builder) => ({
    getLocalFlights: builder.query({
      query: () => ({
        method: 'GET',
        path: `api/my-flights`,
      }),
      providesTags: ['flightsLocal'],
    }),
    BookFlights: builder.mutation({
      query: ({ data }) => ({
        data,
        method: 'POST',
        path: 'api/book-flight',
      }),
      invalidatesTags: ['flightsLocal'],
    }),
  }),
});

export const flightsLocalApiReducerName = flightsLocalApi.reducerPath;
export const flightsLocalApiReducer = flightsLocalApi.reducer;
export const flightsLocalApiMiddleware = flightsLocalApi.middleware;

export const { useGetLocalFlightsQuery, useBookFlightsMutation } =
  flightsLocalApi;
