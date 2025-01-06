import { configureStore } from "@reduxjs/toolkit";
import AuthReducer, { AuthType } from "./AuthSlice"
import { postsApi } from "./PostsApi";
import { usersApi } from "./UsersApi";

export type StoreType = {
    auth: AuthType,
} 

export const store = configureStore({
    reducer:{
        auth: AuthReducer,
        [postsApi.reducerPath]: postsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(postsApi.middleware)
            .concat(usersApi.middleware)
})