import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Users'], // Define a tag for users
  endpoints: (builder) => ({
    getAllListings: builder.query({
      query: () => '/admin/listings',
    }),
    getAllUsers: builder.query({
      query: () => '/admin/users',
      providesTags: ['Users'], // This query provides the 'Users' tag
    }),
    deleteByAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/user/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Users'], // This mutation invalidates the 'Users' tag
    }),
  }),
});

export const { 
  useGetAllListingsQuery,
  useGetAllUsersQuery,
  useDeleteByAdminMutation,
} = adminApi;