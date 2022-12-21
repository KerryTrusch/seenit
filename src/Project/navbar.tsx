import { Link } from "react-router-dom";
import {getSensitiveUserInformation} from "../firebase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import AuthModals from "./AuthPages";
import { UserContext } from "../App";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react";
interface NavDetails {
  setUser: any;
}
function Navbar({ setUser }: NavDetails) {
  const [showAuth, setShowAuth] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [authType, setAuthType] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [userData, setUserData] = useState<any | null>(null);
  const user = useContext<any | null>(UserContext);
  const handleClick = (num: number) => {
    setAuthType(num);
    setClicks(clicks + 1);
  }
  useEffect(() => {
    if (clicks > 0) {
      setShowAuth(true);
    }
  }, [clicks]);
  useEffect(() => {
    async function getUserData() {
      let uid = localStorage.getItem("uid");
      if (uid !== null) {
        let data = await getSensitiveUserInformation(uid);
        console.log(data);
        setUserData(data);
      }
    }
    getUserData();
  }, [])
  const closeAuthModal = () => {
    setShowAuth(false);
  }
  const openDropdown = () => {
    if (userDropdown) {
      setUserDropdown(false);
    } else {
      setUserDropdown(true);
    }
  }
  const signOutUser = () => {
    signOut(auth);
    window.location.reload();
  }
  if (user === null || user === undefined || userData === null || userData === undefined) {
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
              handleClick(1);
            }}
          >
            Sign Up
          </button>
          <button
            className="hover:bg-blue-500/75 px-8 pb-1.5 py-0.5 rounded-2xl mx-3 bg-blue-500 text-white m-auto cursor-pointer text-sm font-bold"
            onClick={(e) => {
              handleClick(0);
            }}
          >
            Log In
          </button>
        </div>
        <AuthModals
        closeModal={closeAuthModal}
        show={showAuth}
        setUser={setUser}
        modalType={authType}
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
              src={`/defaultPFP.png`}
              alt="profile"
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold">{userData.username}</span>
              <div className="text-xs">{userData.karma}</div>
            </div>
            <FontAwesomeIcon className="my-auto ml-10" icon={faChevronDown} />
          </div>
          <div className={`absolute ${userDropdown ? "visible" : "hidden"} top-10 w-full rounded bg-white`}>
            <div className="flex flex-col">
              <div className="pl-10 py-2 text-sm hover:bg-gray-400/[.4]">
                <Link to={`/profile`}>
                  Profile
                </Link>
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="pl-10 py-2 text-sm hover:bg-gray-400/[.4]">
                <button onClick={signOutUser}>
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
