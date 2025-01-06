import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import ImageComponent from "./ImageComponent";
import { MdStars } from "react-icons/md";

type Card = {
    post: {
        _id: string,
        title: string;
        category: string;
        author: string;
        viewCount: number;
        createdAt: string;
        banner: string;
        editorsChoice: boolean;
    }
}

function Card({ post }: Card) {
    const { _id, title, author, category, viewCount, createdAt, banner, editorsChoice } = post;

    return (
        <article className="min-w-80 h-full bg-white shadow-card rounded select-none">
            <Link to={`/posts/${_id}`} className="flex flex-col h-full">
                <ImageComponent src={banner} category={category} className="w-full h-56" />

                <div className="flex flex-col px-4 py-3 w-full h-full">
                    <div className="flex justify-between text-xs font-medium">
                        <p>{new Date(createdAt).toLocaleDateString('en-us', { month: 'short', day: '2-digit', year: 'numeric' })}</p>

                        <div className="flex items-center gap-1">
                            <div><FaEye /></div>
                            <p>{viewCount}</p>
                        </div>
                    </div>

                    <div className="flex-1 my-2">
                        <div className="py-2 font-semibold">
                            <h2 className="text-lg leading-6">{title}</h2>
                            <p className="my-1 text-xs text-gray-500">by {author}</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="mb-1 px-4 py-1 w-fit bg-stone-200 uppercase text-stone-600 text-xs font-semibold rounded">{category}</p>

                        {editorsChoice && (
                            <div className="flex items-center gap-1">
                                <MdStars color="#fdba74" size={20} />
                                <p className=" py-1 text-orange-300 text-xs uppercase font-bold">Editors choice</p>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </article>
    )
}
export default Card