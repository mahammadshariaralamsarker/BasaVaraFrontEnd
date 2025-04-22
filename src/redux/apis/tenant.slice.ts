// redux/apis/tenant.slice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
    if (token) {
      headers.set("Authorization", token); // ✅ Add "Bearer " prefix
    }
    return headers;
  },
});

export const tenantApi = createApi({
  reducerPath: "tenantApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Requests", "Profile"],
  endpoints: (builder) => ({
    getAllListings: builder.query({
      query: () => "/landlords/listings",
    }),
    getSingleListing: builder.query({
      query: (id) => `/landlords/listings/${id}`,
    }),
    submitRentalRequest: builder.mutation({
      query: (payload) => ({
        url: "/tenants/requests",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Requests"],
    }),
    getMyRequests: builder.query({
      query: () => "/tenants/my-requests",
      providesTags: ["Requests"],
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: "/tenants/profile",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Profile"],
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    makePayment: builder.mutation<any, { tenantRequest: string }>({
      query: ({ tenantRequest }) => ({
        url: `/order/rental-payment`,
        method: "POST",
        body: { tenantRequest },
      }),
    }),
    verifyPayment: builder.query({
      query: (orderId) => `/order/verify?orderId=${orderId}`,
    }),
    getMyOrders: builder.query({
      query: () => `/order/my-order`,
    }),
  }),
});

export const {
  useGetAllListingsQuery,
  useGetSingleListingQuery,
  useSubmitRentalRequestMutation,
  useGetMyRequestsQuery,
  useUpdateProfileMutation,
  useMakePaymentMutation,
  useVerifyPaymentQuery,
  useGetMyOrdersQuery,
} = tenantApi;
