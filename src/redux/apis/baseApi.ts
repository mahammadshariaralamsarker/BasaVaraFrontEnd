import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5000",
//     credentials: "include",
//     // prepareHeaders: (headers) => {
//     //   if (typeof window !== "undefined") {
//     //     const token = localStorage.getItem("token");
//     //     console.log("Token from localStorage:", token);
//     //     if (token) {
//     //       headers.set("Authorization", token);
//     //     }
//     //   }
//     //   return headers;
//     // },
//   }),
//   endpoints: () => ({}),
// });

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    credentials: "include",
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        // console.log("Token from localStorage:", token);
        if (token) {
          headers.set("Authorization", token);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["Requests", "Profile", "Orders", "Listings"],
  endpoints: () => ({}),
});
