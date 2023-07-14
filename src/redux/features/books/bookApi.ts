import { api } from "../api/api";

const bookApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => '/books'
        })
    })
})

export const {useGetBooksQuery} = bookApi