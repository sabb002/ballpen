import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://ballpen.onrender.com/users"
    }),
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => '/'
        }),
        saveUserInfo: builder.mutation({
            query: (user) => {  
                return {
                    url: '/new',
                    method: 'POST',
                    body: user
                }
            }
        })
    })
})

export const {
    useGetAllUsersQuery,
    useSaveUserInfoMutation
} = usersApi;