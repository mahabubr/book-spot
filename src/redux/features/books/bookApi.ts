import { IBooks } from "../../../types";
import { api } from "../api/api";

interface GetBooksQueryParams {
  searchTerm?: string;
  date?: string | number;
  genre?: string;
}

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (data: GetBooksQueryParams) => {
        const queryParameters = new URLSearchParams();
        if (data.searchTerm) {
          queryParameters.append("searchTerm", data.searchTerm);
        }
        if (data.date) {
          queryParameters.append("publication_date", data.date as string);
        }
        if (data.genre) {
          queryParameters.append("genre", data.genre);
        }
        return `/books?${queryParameters.toString()}`;
      },
    }),
    getSingleBook: builder.query({
      query: (id: string) => `/books/${id}`,
    }),
    postBooks: builder.mutation({
      query: (data: IBooks) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
    }),
    updateBooks: builder.mutation({
      query: ({ data, id }: { data: IBooks; id: string }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateReview: builder.mutation({
      query: ({ data, id }: { data: object; id: string }) => ({
        url: `/books/review/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  usePostBooksMutation,
  useGetSingleBookQuery,
  useDeleteBookMutation,
  useUpdateBooksMutation,
  useUpdateReviewMutation,
} = bookApi;
