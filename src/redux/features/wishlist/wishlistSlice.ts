import { api } from "../api/api";

const wishlistSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    postWishlist: builder.mutation({
      query: (data) => ({
        url: "/wishlist",
        method: "POST",
        body: data,
      }),
    }),
    getAllWishlist: builder.query({
      query: (id: string) => `/wishlist/${id}`,
    }),
  }),
});

export const { usePostWishlistMutation, useGetAllWishlistQuery } =
  wishlistSlice;
