import { useState } from "react";
import GoogleAuth from "./GoogleAuth";
import { AiOutlineClose } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";


function AuthBtn() {
    const [modal, setModal] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setModal(true)}
                className="flex border border-b-2 items-center gap-2 px-2 py-1 rounded hover:border-b-green-600">
                <p className="text-xs tablet:text-sm font-semibold">Sign in</p>

                <BiLogIn size={16} />
            </button>

            {modal && (
                <div className="absolute w-fit top-0 right-0 border bg-white rounded shadow-lg">
                    <button
                        onClick={() => setModal(false)}
                        className="absolute top-2 right-2 p-1 rounded-full">
                        <AiOutlineClose fontSize={20}/>
                    </button>
                    <div className="px-4 py-6">
                        <p className="pb-2 font-semibold text-sm">Sign in options:</p>
                        <GoogleAuth />
                    </div>
                </div>
            )}
        </div>
    )
}

export default AuthBtn