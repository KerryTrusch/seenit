import { Link } from "react-router-dom";
import {useState} from 'react';
import Signup from './core/signup';
import Login from "./core/login";
interface NavDetails {
  setUser: any;
}
function Navbar({setUser}: NavDetails) {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const closeSignup = () => {
    setShowSignup(false);
  }
  const closeLogin = () => {
    setShowLogin(false);
  }
  const moveToLoginFromSignup = () => {
    setShowSignup(false);
    setShowLogin(true);
  }
  const moveToSignupFromLogin = () => {
    setShowLogin(false);
    setShowSignup(true);
  }
  return (
    <div className="flex bg-white w-full p-2">
      <Link className="mr-auto my-auto max-w-[100px]" to={`/`}>
        <img className="h-auto w-full min-h-[20px]" src={`/seenit.png`} alt="logo" />
      </Link>
      <div className="flex ml-auto">
          <button className="border border-blue-400 rounded-2xl px-8 py-0.5 pb-1.5 cursor-pointer hover:bg-[#faf7f7] text-sm font-bold text-blue-500" onClick={e => {setShowSignup(true)}}>
            Sign Up
          </button>
          <button className="hover:bg-blue-500/75 px-8 pb-1.5 py-0.5 rounded-2xl mx-3 bg-blue-500 text-white m-auto cursor-pointer text-sm font-bold" onClick={e => {setShowLogin(true)}}>
            Log In
          </button>
      </div>
      <Signup show={showSignup} closeModal={closeSignup} setUser={setUser} switchTabs={moveToLoginFromSignup}/>
      <Login show={showLogin} closeModal={closeLogin} setUser={setUser} switchTabs={moveToSignupFromLogin}/>
    </div>
  );
}

export default Navbar;