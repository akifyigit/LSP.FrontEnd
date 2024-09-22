import { createApi } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'constant/Varible';

import { axiosBaseQuery } from '../../../utils/axiosBaseQuery';

export const flightsApi = createApi({
  reducerPath: 'flights',
  baseQuery: axiosBaseQuery({ baseUrl: API_URL }), // Default to remote API
  tagTypes: ['flights'],
  endpoints: (builder) => ({
    getFlights: builder.query({
      query: ({ page }) => ({
        method: 'GET',
        path: `public-flights/flights?page=${page}`,
      }),
      providesTags: ['flights'],
    }),
  }),
});

export const flightsApiReducerName = flightsApi.reducerPath;
export const flightsApiReducer = flightsApi.reducer;
export const flightsApiMiddleware = flightsApi.middleware;

export const { useGetFlightsQuery } = flightsApi;
