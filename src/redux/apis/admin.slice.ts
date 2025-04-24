
import { baseApi } from "../baseApi/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    deleteUserByAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/user/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),
    deleteListingByAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/listings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Listings"],
    }),
    updateListingByAdmin: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/listings/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Listings"],
    }),
    getAllListings: builder.query({
      query: () => ({
        url: "/admin/listings",
        method: "GET",
      }),
      providesTags: ["Listings"],
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
