import { IBooks } from "../../../types";
import { api } from "../api/api";

const wishlistSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    postWishlist: builder.mutation({
      query: (data: IBooks) => ({
        url: "/wishlist",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostWishlistMutation } = wishlistSlice;
