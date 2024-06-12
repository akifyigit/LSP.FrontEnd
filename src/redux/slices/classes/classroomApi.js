import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../../../utils/axiosBaseQuery';

export const classroomApi = createApi({
  reducerPath: 'classroomApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['classroom'],
  endpoints: (builder) => ({
    getClassrooms: builder.query({
      query: ({ TypeId, CapacityId, Day, Start, End }) => ({
        method: 'GET',
        path: `classroom/availableClassroomList?ClassroomTypeId=${TypeId}&ClassroomCapacityId=${CapacityId}&Day=${Day}&StartHour=${Start}&EndHour=${End}`,
      }),
      providesTags: ['classroom'],
    }),
    getClassroomsById: builder.query({
      query: ({ id }) => ({
        method: 'GET',
        path: `classroom/${id}`,
      }),
      providesTags: ['classroom'],
    }),
    getClassroomTypeList: builder.query({
      query: () => ({
        method: 'GET',
        path: 'classroomType',
      }),
      providesTags: ['classroom'],
    }),
    getClassroomCapacityList: builder.query({
      query: () => ({
        method: 'GET',
        path: 'classroomCapacity',
      }),
      providesTags: ['classroom'],
    }),
    createClassroom: builder.mutation({
      query: ({ data }) => ({
        data,
        method: 'POST',
        path: 'classroom',
      }),
    }),
  }),
});

export const classroomApiReducerName = classroomApi.reducerPath;
export const classroomApiReducer = classroomApi.reducer;
export const classroomApiMiddleware = classroomApi.middleware;

export const {
  useGetClassroomsQuery,
  useGetClassroomsByIdQuery,
  useGetClassroomTypeListQuery,
  useGetClassroomCapacityListQuery,
  useCreateClassroomMutation,
} = classroomApi;
