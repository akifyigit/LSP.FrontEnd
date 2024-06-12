import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'utils/axiosBaseQuery';

// Define a service using a base URL and expected endpoints
export const signUp = createApi({
  reducerPath: 'signUpApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getCountryList: builder.query({
      query: ({ country }) => ({
        method: 'GET',
        path: `publicdata/GetCountries/${country}`,
      }),
    }),

    getCityList: builder.query({
      query: ({ country, city }) => ({
        method: 'GET',
        path: `publicdata/GetCities/${country}/${city}`,
      }),
    }),
    getDistrictsList: builder.query({
      query: ({ country, districts }) => ({
        method: 'GET',
        path: `PublicData/GetDistricts/${country}/${districts}`,
      }),
    }),
    getPostalCode: builder.query({
      query: ({ country, code }) => ({
        method: 'GET',
        path: `PublicData/GetPostalCodes/${country}/${code}`,
      }),
    }),

    regiter: builder.mutation({
      query: ({ data }) => ({
        data,
        method: 'POST',
        path: 'login/PublicRegister',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const signUpApiReducerName = signUp.reducerPath;
export const signUpApiReducer = signUp.reducer;
export const signUpMiddleware = signUp.middleware;

export const {
  useGetCountryListQuery,
  useGetCityListQuery,
  useGetDistrictsListQuery,
  useGetPostalCodeQuery,
  useRegiterMutation,
} = signUp;
