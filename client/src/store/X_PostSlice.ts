// import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
// import Posts from "../data/Posts";

// type Post = {
//     id: string,
//     title: string,
//     content: string,
//     author: string,
//     avatar: string,
//     reactions: {
//         like: number,
//         dislike: number,
//         star: number
//     },
//     comments: {
//         author: string,
//         avatar: string,
//         text: string,
//         date: string,
//     }[],
//     category: string,
//     banner: string,
//     viewCount: number,
//     isUpdated: boolean,
//     createdAt: string,
// }

// // export type PostsState = {
// //     posts: Post[]
// // }

// const PostSlice = createSlice({
//     name: 'Posts',
//     initialState: Posts,
//     reducers: {
//         addPost: {
//             reducer(state, action: PayloadAction<Post>) {
//                 state.push(action.payload)
//             },
//             prepare(author, avatar, title, content, banner, category) {
//                 return {
//                     payload: {
//                         id: nanoid(),
//                         title,
//                         content,
//                         author,
//                         avatar,
//                         reactions: {
//                             like: 0,
//                             dislike: 0,
//                             star: 0
//                         },
//                         comments: [],
//                         category,
//                         banner,
//                         viewCount: 0,
//                         isUpdated: false,
//                         createdAt: new Date().toISOString(),
//                     }
//                 }
//             }
//         },
//         setReaction: (state, action) => {
//             const { postId, reaction } = action.payload;
//             const i = state.findIndex((p) => p.id === postId);
//             if (i !== -1) state[i].reactions[reaction]++;
//         }
//     }
// })

// export const { addPost, setReaction } = PostSlice.actions;
// export default PostSlice.reducer;