import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/posts'
    }),
    endpoints: (builder) => (
        {
            getAllPosts: builder.query({
                query: () => '/'
            }),
            getPostById: builder.query({
                query: (id) => `/${id}`
            }),
            getPostsByCategory: builder.query({
                query: (c) => `/q?category=${c}` 
            }),

            getPostReactions: builder.query({
                query: (id) => `/${id}/reactions`
            }),

            createPost: builder.mutation({
                query: (post) => ({
                    url: '',
                    method: 'POST',
                    body: post
                }),
            }),
            updatePost: builder.mutation({
                query: ({id, payload}) => {
                    // console.log(id, payload);
                    
                    return {
                    url: `/${id}`,
                    method: 'PUT',
                    body: payload
                }}
            }),
            deletePost: builder.mutation({
                query: (id) => ({
                    url: `/${id}`,
                    method: 'DELETE'
                })
            })
        }
    )
})

export const { 
    useGetAllPostsQuery,
    useGetPostByIdQuery,
    useGetPostsByCategoryQuery,
    useGetPostReactionsQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation
} = postsApi;