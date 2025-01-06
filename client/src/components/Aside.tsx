import { Link } from "react-router-dom"
import Search from "./Search"
import CategoryList from "../data/Categories"
import { useGetAllPostsQuery } from "../store/PostsApi"
import NotFound from "../pages/NotFound";


function Aside() {
  const { data: Posts, isLoading, isError } = useGetAllPostsQuery({});

  const topFive = Posts && Posts.slice().sort((a, b) => (b.reactions.like + b.reactions.star + b.reactions.dislike) - (a.reactions.like + a.reactions.star + a.reactions.dislike)).slice(0, 5);

  if(isError) return <NotFound/>

  return (
    <aside className="hidden tablet:flex max-h-[calc(100vh-6rem)] flex-col w-80 overflow-auto">
      <Search />
      <article className="mr-2 p-4">
        <h3 className="px-1 font-semibold">Categories</h3>
        <ul className="mt-2 font-medium text-sm text-gray-600">
          {CategoryList.map((c, i) => (
            <li key={"Category" + i} className="mb-2 shadow rounded bg-white hover:bg-green-100">
              <Link to={`q?category=${c}`} className="block p-2">
                #{c}
              </Link>
            </li>
          ))}
        </ul>
      </article>

      <article className="mr-2 p-4 pt-0">
        <h3 className="px-1 font-semibold">Top Posts</h3>
        <ul className="relative font-medium text-sm text-gray-600 [counter-reset:TopPosts]">
          {
            isLoading
              ? (<p>Loading...</p>)
              : isError
                ? (<p>Network Error!</p>)
                : (
                  topFive.map((p, i) => (
                    <li key={"topposts" + i} className="my-2 pl-9 py-2 rounded shadow bg-white [counter-increment:TopPosts] before:content-[counter(TopPosts)] before:absolute before:left-3 before:text-2xl before:font-semibold hover:bg-green-100 group">
                      <Link to={`${p._id}`} className="flex flex-col gap-2">
                        <div>
                          <h4 className="text-[#222]">{p.title}</h4>
                          <p className="text-xs text-gray-500">by {p.author}</p>
                        </div>
                        <div>
                          <span key={"category" + i} className="text-xs bg-gray-200 px-2 mr-1 rounded-full group-hover:bg-green-200 group-hover:text-green-700">{p.category}</span>
                        </div>
                      </Link>
                    </li>
                  ))
                )
          }
        </ul>
      </article>
    </aside>
  )
}
export default Aside