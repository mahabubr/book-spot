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
    postBookmark: builder.mutation({
      query: (data) => ({
        url: "/bookmark",
        method: "POST",
        body: data,
      }),
    }),
    getAllBookmark: builder.query({
      query: (id: string) => `/bookmark/${id}`,
    }),
  }),
});

export const {
  usePostWishlistMutation,
  useGetAllWishlistQuery,
  usePostBookmarkMutation,
  useGetAllBookmarkQuery
} = wishlistSlice;
