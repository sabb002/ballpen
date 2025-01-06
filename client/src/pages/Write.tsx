import React, { ChangeEvent, Suspense, useState } from "react"
import { useSelector } from "react-redux";
import CategoryList from "../data/Categories"
import { AuthState } from "../store/AuthSlice";
import { useCreatePostMutation } from "../store/PostsApi";
const Editor = React.lazy(() => import('../components/Editor'));

import { FaCheck, FaEye, FaSpinner } from "react-icons/fa";
import { getImage } from "../utils/getImage";
import { useNavigate } from "react-router-dom";

function Write() {
  const navigate = useNavigate();
  const [createPost, {isLoading, isSuccess}] = useCreatePostMutation();
  const user = useSelector((state: AuthState) => state.auth.user);
  const [count, setCount] = useState('60');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [imageURL, setImageURL] = useState('');

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const l_count = 60 - value.length;
    if (l_count < 0) {
      setCount("Max. Exceeded!")
    }
    else setCount(l_count.toString());

    setTitle(value);
  }

  function handleCategoryChange(c: string) {
    setSelectedCategory(selectedCategory === c ? null : c);
  }



  function handleImageUrlChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setImageURL(value);
  }


  async function handleSubmit() {
    const id = await createPost({
      title,
      content,
      author: user.full_name,
      avatar: user.picture,
      reactions: {
        like: 0,
        dislike: 0,
        star: 0
      },
      comments: [],
      category: selectedCategory,
      banner: imageURL,
      viewCount: 0,
      updatedAt: null,
      createdAt: new Date().toISOString(),
      editorsChoice: false
    });

    setContent('');
    setSelectedCategory(null);
    setImageURL('');
    navigate(`/posts/${id.data}`);
  }

  return (
    <>
      {!user && (
        <p className="mx-4 px-4 py-2 bg-red-200 text-red-700 border border-red-700 rounded">⛔ Please sign in first.</p>
      )}
      <section className="m-4 flex flex-col gap-4 max-w-[740px] tablet:mx-auto">
        <div>
          <div className="flex justify-between items-end">
            <h3 className="font-bold text-md tablet:text-xl leading-4">Title</h3>
            <p className={`text-xs font-semibold ${Number(count) >= 0 ? "text-green-600" : "text-red-600"}`}>{count}</p>
          </div>
          <input type="text" className=" w-full px-4 py-2 font-medium border border-[#ccc] outline-0 rounded placeholder-gray-300" placeholder="maximum 50 letters" onChange={handleTitleChange} />
        </div>

        <Suspense fallback={
          <div className="p-4 space-y-4">
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        }>
          <Editor content={content} setContent={setContent} />
        </Suspense>

        <div>
          <h3 className="font-bold text-md tablet:text-lg leading-8">Select category</h3>
          <div className="flex flex-wrap">
            {CategoryList.map((c) => (
              <div key={c + "checkbox"} className="flex mr-1 mb-1 select-none">
                <input
                  type="checkbox"
                  name={c} id={`${c}_check`}
                  className="peer hidden"
                  checked={selectedCategory === c}
                  onChange={() => handleCategoryChange(c)}
                />
                <label
                  htmlFor={`${c}_check`}
                  className="px-4 py-2 border peer-checked:border-green-700 peer-checked:bg-green-200 rounded cursor-pointer"
                >{c}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto my-1 w-96 flex flex-col justify-center items-center font-semibold border rounded overflow-hidden">
          {
            imageURL
              ? <img src={imageURL} alt="Couldn't load! Check url." className="w-full h-52 object-cover justify-self-center text-stone-400" />
              : selectedCategory
                ? <img
                  src={getImage(selectedCategory)}
                  alt="Couldn't load! Check network!"
                  className="w-full h-52 object-cover justify-self-center text-stone-400" />
                : <p className="w-full h-52 flex justify-center items-center bg-stone-100 text-stone-400">
                    Banner will load here
                  </p>
          }
          <div className="flex flex-col px-4 py-3 w-full h-full">
            <div className="flex justify-between text-xs font-medium">
              <p>{new Date().toLocaleDateString('en-us', { month: 'short', day: '2-digit', year: 'numeric' })}</p>

              <div className="flex items-center gap-1">
                <div><FaEye /></div>
                <p>0</p>
              </div>
            </div>

            <div className="flex-1 my-2">
              <div className="py-2 font-semibold">
                <h2 className="text-lg leading-6">{title || 'Title'}</h2>
                <p className="my-1 text-xs text-gray-500">by {user?.full_name || 'author'}</p>
              </div>
            </div>

            <p className="mb-1 px-4 py-1 w-fit bg-green-100 text-green-700 text-sm font-semibold shadow rounded">{selectedCategory || 'Category'}</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-md tablet:text-lg leading-4">
            Custom banner
            <span className="text-xs font-normal"> (optional)</span>
          </h3>
          <input type="text" className="w-full px-4 py-2 border border-[#ccc] outline-0 rounded text-xs tablet:text-sm placeholder-gray-300" placeholder="https://images.pexels.com/photos/10919464/pexels-photo-10919464.jpeg?width=400" onChange={handleImageUrlChange} />
        </div>

        {user && title && content && selectedCategory ? (
          <div className="text-right">
            <button
              type="submit"
              className="mb-4 px-8 py-2 w-full tablet:w-fit bg-emerald-600 text-white font-bold shadow rounded"
              onClick={handleSubmit}
            >
              {
                isLoading 
                  ? (<FaSpinner size={24} className="mx-auto w-fit animate-spin"/>)
                  : isSuccess 
                    ? (<FaCheck size={24} className="mx-auto w-fit"/>)
                    : 'Post'
              }
            </button>
          </div>
        ) : (
          <div className="text-right">
            <button className="mb-4 px-8 py-2 w-full tablet:w-fit bg-[#1115] text-gray-200 font-bold shadow rounded cursor-not-allowed" disabled>POST</button>
          </div>
        )}
      </section>
    </>
  )
}

export default Write