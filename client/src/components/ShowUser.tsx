import { useDispatch, useSelector } from "react-redux"
import { AuthState, clearAuthState } from "../store/AuthSlice";
import { googleLogout } from "@react-oauth/google";
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { FcApproval } from "react-icons/fc";

function ShowUser() {
    const [modal, setModal] = useState(false);
    const user = useSelector((state: AuthState) => state.auth.user);
    const dispatch = useDispatch();

    function handleSignOut(){
        localStorage.clear();
        dispatch(clearAuthState())
        googleLogout();
        setModal(false);
    }

    return (
        <div
            onClick={() => setModal(modal => !modal)}
            className="relative"
        >
            <img src={user.picture} alt="User" className="w-8 h-8 rounded-full overflow-hidden cursor-pointer object-cover" referrerPolicy="no-referrer" />

            {
                modal && (
                    <div className="p-4 absolute top-0 right-full w-fit bg-white border border-gray-400 shadow-xl rounded">
                        <p className="pb-2 text-3xl font-thin">Hi, {user.given_name}! 🙌</p>

                        <div className="mb-4 flex items-center gap-1">
                            <FcApproval/>
                            <p className="text-xs break-words">{user.email}</p>
                        </div>

                        {/* Todo: Add More Buttons*/}

                        <button
                            onClick={handleSignOut}
                            className="flex border items-center gap-2 px-2 py-1 rounded bg-white hover:bg-red-600 hover:text-white transition-colors">
                            <p className="text-xs tablet:text-sm font-semibold">Sign out</p>
                            <FaSignOutAlt size={16} />
                        </button>
                    </div>
                )
            }
        </div>
    )
}
export default ShowUser