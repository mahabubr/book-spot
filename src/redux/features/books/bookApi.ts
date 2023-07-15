import { api } from "../api/api";

const bookApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: (search: string) => `/books?searchTerm=${search}`
        })
    })
})

export const {useGetBooksQuery} = bookApi