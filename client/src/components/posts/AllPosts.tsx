import { useNavigate } from "react-router-dom";
import { useGetAllPostsQuery } from "../../store/PostsApi";
import Card from "../Card";
import { useEffect } from "react";
import PostsLoader from "../PostsLoader";
import NotFound from "../../pages/NotFound";


function AllPosts() {
  const navigate = useNavigate();
  const { data: Posts, refetch, error, isLoading } = useGetAllPostsQuery({});

  useEffect(() => {
    refetch();
  }, [refetch, navigate])

  if (error) return <NotFound/>;

  if (isLoading) {
    return (
      <PostsLoader />
    )
  };

  return (
    <main className="flex-1 mx-4 pt-2 pb-4 pr-1 w-full h-fit tablet:max-h-[calc(100vh-6rem)] tablet:overflow-auto grid tablet:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] tablet:grid-flow-row gap-4">
      {Posts.map((post, i) => {
        const { _id, title, author, category, viewCount, createdAt, banner, editorsChoice } = post;
        return (
          <Card key={"Post" + i} post={{ _id, author, title, category, viewCount, createdAt, banner, editorsChoice }} />
        )
      })}
    </main>
  )
}
export default AllPosts