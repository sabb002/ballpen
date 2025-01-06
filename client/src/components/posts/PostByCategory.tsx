import { useLocation } from "react-router-dom"
import { useGetPostsByCategoryQuery } from "../../store/PostsApi";
import Card from "../Card";
import PostsLoader from "../PostsLoader";


function PostByCategory() {
    const q = new URLSearchParams(useLocation().search);
    const { data: Posts, error, isLoading } = useGetPostsByCategoryQuery(q.get('category'));

    if (error) {
        return (
            <main className="flex-1 mx-4 pt-2 pb-4 pr-1 w-full h-fit">
                <p className="text-stone-500 text-2xl text-center">No post yet on {q.get('category')}.</p>
            </main>
        )
    };
    
    if (isLoading) {
        return <PostsLoader/>
    }

    return (
        <main className={`flex-1 mx-4 pt-2 pb-4 pr-1 w-full h-fit tablet:max-h-[calc(100vh-6rem)] tablet:overflow-auto grid tablet:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] tablet:grid-flow-row gap-4`}>
            {Posts.map((post, i) => {
                const { _id, title, author, category, viewCount, createdAt, banner, editorsChoice } = post;
                return (
                    <Card key={"Post" + i} post={{ _id, author, title, category, viewCount, createdAt, banner, editorsChoice }} />
                )
            })}
        </main>
    )
}
export default PostByCategory