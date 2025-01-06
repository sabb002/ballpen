import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { FormEvent, useEffect, useRef, useState } from "react";

import { useDeletePostMutation, useGetPostByIdQuery, useUpdatePostMutation } from "../store/PostsApi";
import { TiDocumentDelete } from "react-icons/ti";
import { StoreType } from "../store/store";
import NotFound from "./NotFound";

const REACTION_ARRAY = [
    { name: "like", icon: "👍" },
    { name: "dislike", icon: "🙉" },
    { name: "star", icon: "🔥" },
]

function PostId() {
    const { id } = useParams();
    const navigate = useNavigate();
    const textareaRef = useRef(null);
    const [reactionClicked, setReactionClicked] = useState({ current: null, last: null });
    const user = useSelector((state: StoreType) => state.auth.user);
    const { data: post, error, isLoading, refetch } = useGetPostByIdQuery(id);
    const [updatePost] = useUpdatePostMutation();
    const [deletePost] = useDeletePostMutation();

    useEffect(()=>{
        const viewed = JSON.parse(sessionStorage.getItem('viewed') || '[]');
        if(viewed && viewed.some(p => p === id)) return;

        async function updateViewCount(){
            await updatePost({ id, payload: { $inc: { viewCount: 1 } } })
        }
        updateViewCount();

        viewed.push(id);
        sessionStorage.setItem('viewed', JSON.stringify(viewed));
    }, [id, updatePost])


    
    if (error) return <NotFound/>;

    if (isLoading) {
        return (
            <section className="my-4 flex justify-center">
                <p>Loading...</p>
            </section>
        )
    }

    async function handleDelete() {
        await deletePost(id);
        navigate('/posts');
    }

    async function handleReactionClick(r) {
        console.log(r, reactionClicked.last);
        if (r === reactionClicked.last) return;
        setReactionClicked((prev) => ({ ...prev, current: r }));

        await updatePost({ id, payload: { $inc: { [`reactions.${r}`]: 1 } } })
        if (reactionClicked.last) {
            await updatePost({ id, payload: { $inc: { [`reactions.${reactionClicked.last}`]: -1 } } })
        }

        setReactionClicked((prev) => ({ ...prev, last: r }));
        refetch();
    }

    function handleTextarea() {
        textareaRef.current.style.height = `auto`
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }

    async function submitComment(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const text = e.target[0].value;
        e.target[0].value = '';
        if (text.trim() === '') return;
        const comment = {
            author: user.full_name,
            avatar: user.picture,
            text,
            date: new Date().toISOString()
        };

        textareaRef.current.style.height = `auto`

        await updatePost({ id, payload: { $push: { "comments": comment } } })
        refetch();
    }

    return (
        <div className="mx-4">
            <section className="mx-auto max-w-[740px]">

                <h1 className="my-4 tablet:my-6 font-semibold tracking-wide text-black text-2xl tablet:text-3xl">{post.title}</h1>

                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-4">
                        <img src={post.avatar} alt="Author" referrerPolicy="no-referrer" className="w-10 tablet:h-10 rounded-full object-cover object-center" />

                        <div className="text-neutral-600">
                            <p className="font-medium">{post.author}</p>
                            <p className="text-xs">{new Date(post.createdAt).toLocaleString("en-us", { dateStyle: "long", timeStyle: "short" })}</p>
                        </div>
                    </div>
                    {
                        user && post.author === user.full_name && (
                            <button
                                onClick={handleDelete}
                                className="flex border items-center gap-2 px-2 py-1 h-fit rounded bg-white hover:bg-red-600 hover:text-white transition-colors">
                                <p className="text-xs tablet:text-sm font-semibold">Delete</p>
                                <TiDocumentDelete size={16} />
                            </button>
                        )
                    }
                </div>
                <hr />

                <article
                    id="blog__content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="mx-2 my-6 leading-7 tablet:mx-0 laptop:text-lg laptop:leading-9"
                >
                </article>

                <hr />

                <div className="my-4 flex gap-4">
                    {REACTION_ARRAY.map((r, i) => (
                        <button
                            key={"reaction" + i}
                            onClick={() => handleReactionClick(r.name)}
                            style={{ backgroundColor: reactionClicked.current === r.name ? '#dcfce7' : '#f3f4f6' }}
                            className="p-2 flex items-center bg-gray-100 rounded-full hover:bg-green-100"
                        >
                            <div className="text-xl">{r.icon}</div>
                            <p className="w-8">{post.reactions[`${r.name}`]}</p>
                        </button>
                    ))}
                </div>

                <hr />

                <div className="my-2 w-full">
                    <h4 className="my-4 py-1 text-2xl font-semibold">Comments ({post.comments.length})</h4>

                    <form onSubmit={submitComment} className="mb-8 flex items-center">
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            placeholder="Write a comment"
                            onChange={handleTextarea}
                            className="flex-1 border-b border-b-stone-500 outline-none"
                        />
                        <button
                            type="submit"
                            className="p-1"
                        >Comment</button>
                    </form>

                    {post.comments.length === 0 && (
                        <p className="mt-4 mb-8 text-lg text-stone-300 text-center">No Comments yet!</p>
                    )}

                    {post.comments.slice().reverse().map((c, i) => (
                        <div
                            key={"comment" + i}
                            className="my-4 p-2 flex gap-2"
                        >
                            <img src={c.avatar} alt="x" className="w-9 h-9 object-cover rounded-full bg-blue-200" referrerPolicy="no-referrer" />

                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="font-medium">{c.author}</p>
                                    <p className="px-1 font-sans text-[10px] tablet:text-xs text-neutral-700 border bg-stone-200 rounded">{new Date(c.date).toLocaleString("en-us", { dateStyle: "medium", timeStyle: "short" })}</p>
                                </div>
                                <p className="font-sans text-sm laptop:text-base whitespace-pre-line">{c.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <p className="py-1 text-center text-xs opacity-50">Developed by⚡sabb</p>
        </div>
    )
}

export default PostId