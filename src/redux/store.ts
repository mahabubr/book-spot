import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import { api } from "./features/api/api";

const store = configureStore({
    reducer: {
        user: userSlice,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store