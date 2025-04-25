// src/redux/api/landlordApi.ts
import { TProduct } from "@/lib/types/user";
import { baseApi } from "./baseApi";

export const landlordApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllListings: builder.query<TProduct[], void>({
      query: () => ({
        url: "/landlords/listings",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    getOwnListings: builder.query<TProduct[], void>({
      query: () => ({
        url: "/landlords/my-postings",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    getSingleListing: builder.query<TProduct, string>({
      query: (id) => ({
        url: `/landlords/listings/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    getSingleUser: builder.query<TProduct, string>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
 
    createListing: builder.mutation<void, { data: TProduct }>({
      query: ({ data }) => ({
        url: "/landlords/listings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    changePassword: builder.mutation<void, { data: { oldPassword: string; newPassword: string } }>({
      query: ({ data }) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),

    updateListing: builder.mutation<void, { data: Partial<TProduct> & { id: string } }>({
      query: ({ data }) => ({
        url: `/landlords/listings/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    // updateListing: builder.mutation<void, { id: string; data: FormData }>({
    //   query: ({ id, data }) => ({
        
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    // }),

    deleteListing: builder.mutation<void, string>({
      query: (id) => ({
        url: `/landlords/listings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    

    getMyPostings: builder.query<TProduct[], void>({
      query: () => ({
        url: "/landlords/my-postings",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    respondToRequest: builder.mutation<void, { requestId: string; data: { status: string; message?: string } }>({
      query: ({ requestId, data }) => ({
        url: `/landlords/requests/${requestId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProfile: builder.mutation<void, { data: { id: string; name: string; email: string; [key: string]: unknown } }>({
      query: ({ data }) => ({
        url: `/user/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getRentalRequests: builder.query<any[], void>({
      query: () => ({
        url: "/tenants/rental-requests", // assuming the backend uses `req.user.id`
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllListingsQuery,
  useGetSingleListingQuery,
  useCreateListingMutation,
  useUpdateListingMutation,
  useDeleteListingMutation,
  useGetMyPostingsQuery,
  useRespondToRequestMutation,
  useGetRentalRequestsQuery,
  useGetOwnListingsQuery,
  useGetSingleUserQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = landlordApi;
