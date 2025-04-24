// redux/apis/tenant.slice.ts

import { baseApi } from "./baseApi";

export const tenantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllListings: builder.query({
      query: () => ({
        url: "/landlords/listings",
        method: "GET",
      }),
      providesTags: ["Listings"],
    }),

    getSingleListing: builder.query({
      query: (id) => ({
        url: `/landlords/listings/${id}`,
        method: "GET",
      }),
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
      query: () => ({
        url: "/tenants/my-requests",
        method: "GET",
      }),
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
      query: (tenantRequest) => ({
        url: `/order/rental-payment`,
        method: "POST",
        body: { tenantRequest },
      }),
      invalidatesTags: ["Orders", "Requests"],
    }),

    verifyPayment: builder.query({
      query: (orderId) => ({
        url: `/order/verify?orderId=${orderId}`,
        method: "GET",
      }),
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: `/order/my-order`,
        method: "GET",
      }),
      providesTags: ["Orders"],
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
