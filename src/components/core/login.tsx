import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { auth } from "../../firebase";
interface LoginDetails {
  show: boolean;
  closeModal: () => void;
  setUser: any;
  switchTabs: any;
}
function Login({ show, closeModal, setUser, switchTabs }: LoginDetails) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showErrEmail, setShowErrEmail] = useState(false);
    const [showErrPass, setShowErrPass] = useState(false);
  function handleLogin(e: any) {
    e.preventDefault();
    if (!validateEmail()) {
      setShowErrEmail(true);
      setShowErrPass(false);
    } else if (!validatePassword()) {
      setShowErrPass(true);
      setShowErrEmail(false);
    } else {
      setShowErrEmail(false);
      setShowErrPass(false);
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ": " + errorMessage);
      });
    }
  }

  const validateEmail = () => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = () => {
    return password.length >= 6 && password.length <= 30;
  }

  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } fixed top-0 left-0 w-full h-full z-10 bg-black/[0.6]`}
    >
      <div
        className="flex flex-col fixed top-[50%] left-[50%] w-[400px] bg-white rounded h-auto translate-x-[-50%] translate-y-[-50%]"
        onClick={(e) => e.stopPropagation()}
      >
        <FontAwesomeIcon className="ml-auto cursor-pointer pt-4 pr-4" icon={faX} onClick={closeModal} />
        <form className="mb-10" onSubmit={e => {handleLogin(e)}}>
          <div className="flex flex-col pt-16 px-10 text-center mb-4">
            <h2 className="m-0 mb-2.5 font-semibold text-2xl text-left">
              Log In
            </h2>
            <h5 className="m-0 mb-2.5 text-xs text-left font-medium">
              By continuing, you are setting up a Seenit account and agree to
              demo my site!
            </h5>
            <div className="border-b my-5"/>
            <span className={`${showErrEmail ? "visible" : "hidden"} text-red-500 text-sm`}> Invalid email address. </span>
            <input
              className="px-4 py-2.5 background-input border-none rounded-3xl placeholder:text-[#737577] mb-1.5"
              id="EmailInputLogin"
              autoComplete="name"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <span className={`${showErrPass ? "visible" : "hidden"} text-red-500 text-sm`}> Passwords must be between 6 and 30 characters in length. </span>
            <input
              className="px-4 py-2.5 background-input border-none rounded-3xl placeholder:text-[#737577] my-1.5"
              id="PasswordInputLogin"
              autoComplete="name"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
            className="flex flex-col align-center mt-4 p-1.5 rounded-3xl seenit-orange text-white border-none h-[40px] cursor-pointer w-full"
            type="submit"
            >
            Continue
          </button>
          </div>
          <span className="text-xs px-12">Already a user? <button className="text-blue-400 underline" onClick={e => {e.preventDefault(); switchTabs();}}>Login here</button></span>
        </form>
      </div>
    </div>
  );
}

export default Login;
