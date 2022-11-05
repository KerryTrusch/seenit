import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import Signup from "./core/signup";
import Login from "./core/login";
import { UserContext } from "../App";
interface NavDetails {
  setUser: any;
}
function Navbar({ setUser }: NavDetails) {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const user = useContext<any | null>(UserContext);
  const closeSignup = () => {
    setShowSignup(false);
  };
  const closeLogin = () => {
    setShowLogin(false);
  };
  const moveToLoginFromSignup = () => {
    setShowSignup(false);
    setShowLogin(true);
  };
  const moveToSignupFromLogin = () => {
    setShowLogin(false);
    setShowSignup(true);
  };
  const openDropdown = () => {
    if (userDropdown) {
      setUserDropdown(false);
    } else {
      setUserDropdown(true);
    }
  }
  if (user === null) {
    return (
      <div className="flex bg-white w-full p-2">
        <Link className="mr-auto my-auto max-w-[100px]" to={`/`}>
          <img
            className="h-auto w-full min-h-[20px]"
            src={`/seenit.png`}
            alt="logo"
          />
        </Link>
        <div className="flex ml-auto">
          <button
            className="border border-blue-400 rounded-2xl px-8 py-0.5 pb-1.5 cursor-pointer hover:bg-[#faf7f7] text-sm font-bold text-blue-500"
            onClick={(e) => {
              setShowSignup(true);
            }}
          >
            Sign Up
          </button>
          <button
            className="hover:bg-blue-500/75 px-8 pb-1.5 py-0.5 rounded-2xl mx-3 bg-blue-500 text-white m-auto cursor-pointer text-sm font-bold"
            onClick={(e) => {
              setShowLogin(true);
            }}
          >
            Log In
          </button>
        </div>
        <Signup
          show={showSignup}
          closeModal={closeSignup}
          setUser={setUser}
          switchTabs={moveToLoginFromSignup}
        />
        <Login
          show={showLogin}
          closeModal={closeLogin}
          setUser={setUser}
          switchTabs={moveToSignupFromLogin}
        />
      </div>
    );
  } else {
    return (
      <div className="flex bg-white w-full p-2 max-h-[50px]">
        <Link className="mr-auto my-auto max-w-[100px]" to={`/`}>
          <img
            className="h-auto w-full min-h-[20px]"
            src={`/seenit.png`}
            alt="logo"
          />
        </Link>
        <div className="flex ml-auto mr-2 hover:cursor-pointer border border-white hover:border-inherit relative" onClick={openDropdown}>
          <div className="flex px-2 select-none">
            <img
              className="h-7 w-7 rounded mr-2 my-auto"
              src={`./defaultPFP.png`}
              alt="profile"
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold">{user.email}</span>
              <div className="text-xs">0 karma</div>
            </div>
            <FontAwesomeIcon className="my-auto ml-10" icon={faChevronDown} />
          </div>
          <div className={`absolute ${userDropdown ? "visible" : "hidden"} top-12 w-full`}>
            <div className="flex flex-col rounded bg-white">
              <div className="pl-10 py-2 text-sm hover:bg-gray-400/[.4] rounded">
                <Link to={`/profile`}>
                  Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
