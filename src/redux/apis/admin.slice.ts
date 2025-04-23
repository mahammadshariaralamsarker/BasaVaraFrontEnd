import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Users', 'Listings'], 
  endpoints: (builder) => ({
    getAllListings: builder.query({
      query: () => '/admin/listings',
      providesTags: ['Listings'], 
      
    }),
    getAllUsers: builder.query({
      query: () => '/admin/users',
      providesTags: ['Users'],
    }),
    deleteUserByAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/user/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Users'],
    }),
    deleteListingByAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/listings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Listings'] 
    }),
    updateListingByAdmin: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/listings/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Listings'],
    }),

  }),
});

export const { 
  useGetAllListingsQuery,
  useGetAllUsersQuery,
  useDeleteUserByAdminMutation,
  useDeleteListingByAdminMutation,
  useUpdateListingByAdminMutation,
} = adminApi;
