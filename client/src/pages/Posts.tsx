import { Outlet } from "react-router-dom"
import Aside from "../components/Aside"
import { useGetAllPostsQuery } from "../store/PostsApi"
import NotFound from "./NotFound";

function Posts() {
  const { error } = useGetAllPostsQuery({});

  if (error) return <NotFound />
  
  return (
    <>
      <section className="flex">
        <Aside />
        <Outlet />
      </section>
    </>
  )
}

export default Posts