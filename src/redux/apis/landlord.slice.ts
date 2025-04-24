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

    getSingleListing: builder.query<TProduct, string>({
      query: (id) => ({
        url: `/landlords/listings/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    createListing: builder.mutation<void, { data: any }>({
      query: ({ data }) => ({
        url: "/landlords/listings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    updateListing: builder.mutation<void, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/landlords/listings/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    respondToRequest: builder.mutation<void, { requestId: string; data: any }>({
      query: ({ requestId, data }) => ({
        url: `/landlords/requests/${requestId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
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
} = landlordApi;
