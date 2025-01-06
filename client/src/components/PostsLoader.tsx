function PostsLoader() {
    return (
        <main className="flex-1 mx-4 pt-2 pb-4 pr-1 w-full h-fit tablet:max-h-[calc(100vh-6rem)] tablet:overflow-auto grid tablet:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] tablet:grid-flow-row gap-4">
            {[1, 2, 3, 4, 5, 6].map((_, i) => {
                return (
                    <article key={"loader" + i} className="min-w-80 bg-white shadow-card rounded border animate-pulse">
                        <div className="w-full h-56 bg-stone-100 rounded-t" />

                        <div className="flex flex-col px-4 py-3 w-full">
                            <div className="h-5 bg-stone-100 rounded"></div>

                            <div className="my-2 h-16 py-2 bg-stone-100 rounded"></div>
                            <p className="mb-1 px-4 w-28 h-6 bg-stone-100 rounded"></p>
                        </div>               
                    </article>
                )
            })}
        </main>
    )
}
export default PostsLoader