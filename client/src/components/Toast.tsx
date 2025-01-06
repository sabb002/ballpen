import { useEffect } from "react"
import { IoClose } from "react-icons/io5";

function Toast({show, setShow, text = "Toast", backgroundColor = "royalblue" }) {

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [setShow])

    if(!show) return null;

    return (
        <div 
            style={{ backgroundColor }}
            className="flex items-center justify-between gap-2 font-semibold rounded shadow text-white"
        >
            <p className="px-4 py-2">{text}</p>

            <button 
                onClick={()=>setShow(false)}
                className="p-2"
            >
                <IoClose size={25}/>
            </button>
        </div>
    )
}
export default Toast