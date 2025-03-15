import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./globals.css"
import Posts from "./pages/Posts";
import Write from "./pages/Write";
import NotFound from "./pages/NotFound";
import PostId from "./pages/PostId";
import Layout from "./Layout";
import { store } from "./store/store";

import AllPosts from "./components/posts/AllPosts";
import PostByCategory from "./components/posts/PostByCategory";

/* Router */ 
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Navigate to="/posts" replace />
            },
            {
                path: "posts",
                element: <Posts />,
                children: [
                    {
                        index:true,
                        element: <AllPosts/>
                    },
                    {
                        path: "q",
                        element: <PostByCategory/>
                    }
                ]
            },
            {
                path: "posts/:id",
                element: <PostId />
            },
            {
                path: "posts/edit/:id",
                element: <Write />
            },
            {
                path: "write",
                element: <Write />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

createRoot(document.getElementById("root")!).render(
        <Provider store={store}>
            <GoogleOAuthProvider clientId="">
            <RouterProvider router={router} />
            </GoogleOAuthProvider>
        </Provider>
)