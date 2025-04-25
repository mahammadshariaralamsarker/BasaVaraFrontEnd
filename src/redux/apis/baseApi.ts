import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://basa-vara-server.vercel.app",
    // baseUrl: "http://localhost:5000",
    credentials: "include",
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          headers.set("Authorization", token);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["Requests", "Profile", "Orders", "Listings", "Users", "Product"],
  endpoints: () => ({}),
});
