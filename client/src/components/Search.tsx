import { FaSearch } from "react-icons/fa"

function Search() {
    return (
        <div className="mr-2 p-4 pb-0 flex items-center gap-2">
            <div className="">
                <FaSearch size={18} title="Search" />
            </div>

            <input
                type="text"
                placeholder="Search"
                className="flex-1 px-2 py-1 rounded shadow outline-0"
            />
        </div>
    )
}
export default Search