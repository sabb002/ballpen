import { FiEdit3 } from "react-icons/fi"
import { Link } from "react-router-dom"
import logo from "../assets/icon/logo.png";
import ShowUser from "./ShowUser";
import { useSelector } from "react-redux";
import { AuthState } from "../store/AuthSlice";
import AuthBtn from "./AuthBtn";


function Header() {
  const user = useSelector((state:AuthState)=> state.auth.user);

  return (
    <header className="mx-4 mb-2 h-14 flex justify-between items-center z-10 bg-white border-b">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Logo" width={50} />
      </Link>

      <nav className="flex gap-4">
        <Link to="/write" className="flex border border-b-2 items-center gap-2 px-2 py-1 rounded hover:border-b-green-600">
          <p className="text-xs tablet:text-sm font-semibold">Write</p>
          <FiEdit3 />
        </Link>

        {
          user
          ? <ShowUser/>
          : <AuthBtn/> 
        }
      </nav>
      
      {/* <div className="px-12 py-2 fixed top-2 left-1/2 -translate-x-1/2 bg-red-200 text-red-700 border border-red-700 z-10">
          Login failed!
      </div> */}
    </header>
  )
}
export default Header