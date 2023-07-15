import { api } from "../api/api";

interface GetBooksQueryParams {
  searchTerm?: string;
  date?: string;
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
          queryParameters.append("publication_date", data.date);
        }
        if (data.genre) {
          queryParameters.append("genre", data.genre);
        }
        return `/books?${queryParameters.toString()}`;
      },
    }),
  }),
});

export const { useGetBooksQuery } = bookApi;
