import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-spot-server-jet.vercel.app/api/v1",
  } as {
    baseUrl: string;
  }),
  tagTypes: ["review", "delete", "update", "created", "wishlist", "bookmark"],
  endpoints: () => ({}),
});
