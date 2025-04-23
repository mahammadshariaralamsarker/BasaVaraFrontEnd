// src/redux/api/landlordApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface TProduct {
  _id: string
  title: string
  location: string
  description: string
  rent: string
  bedrooms: string
  bathrooms: string
  imageUrls: string[]
  images?: string[]
  LandlordID: string
  area: string
  houseStatus?: "available" | "rented"
}
 
export const landlordApi = createApi({
  reducerPath: "landlordApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000", 
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllListings: builder.query<TProduct[], void>({
      query: () => "/landlords/listings",
      providesTags: ["Product"],
    }),

    getSingleListing: builder.query<TProduct, string>({
      query: (id) => `/landlords/listings/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }), 

    createListing: builder.mutation({
      query: ({  data }) => ({
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
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    getMyPostings: builder.query<TProduct[], void>({
      query: () => "/landlords/my-postings",
      providesTags: ["Product"],
    }),

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
