import {useState, useEffect} from 'react';
import { checkUsernameValidity } from '../../firebase';
interface CompleteSignupDetails {
    setUser: any;
    setUsername: any;
    setPassword: any;
    switchTabs: any;
    createAccount: any;
    password: string | null;
    username: string | null;
}
const CompleteSignup = ({setUser, setUsername, setPassword, switchTabs, createAccount, password, username}: CompleteSignupDetails) => {
  const [showErrUser, setShowErrUser] = useState(false);
  const [showErrPass, setShowErrPass] = useState(false);
  const [showInUse, setShowInUse] = useState(false);
  async function handleCreateAccount(e: any) {
    e.preventDefault();
    if (!validateUser()) {
      setShowErrUser(true);
      setShowErrPass(false);
    } else if (!validatePassword()) {
      setShowErrPass(true);
      setShowErrUser(false);
    } else {
      //import firebase function to create account 
      let user = await createAccount();
      localStorage.setItem("uid", user.uid);
      console.log(user);
      setUser(user);
    }
  }
  const validatePassword = () => {
    if (password === null) return false;
    return password.length >= 6 && password.length <= 30;
  };
  const validateUser = () => {
    if (username === null) return false;
    return username.length >= 3 && username.length <= 30;
  };
  useEffect(() => {
    async function checkEmail() {
      if (username !== null && username.length > 30) {
        setShowErrUser(true);
      } else {
        setShowErrUser(false);
        let validEmail = await checkUsernameValidity(username);
        if (validEmail) {
          setShowInUse(false);
        } else {
          setShowInUse(true);
        }
      }
    }
    checkEmail();
  }, [username]);
    return (
        <form
          className="mb-10"
          onSubmit={(e) => {
            handleCreateAccount(e);
          }}
        >
          <div className="flex flex-col pt-16 px-10 text-center mb-4">
            <h1 className="mb-2.5 font-semibold text-2xl text-left">Complete your account</h1>
            <span className="text-left text-sm mb-2.5 font-medium ">Fill out your username and password and hit "Create Account" below to start posting!</span>
            <div className="border-b mt-5 mb-2"/>
            <div className="flex flex-col mt-4">
              <span className={`${showErrUser ? "visible" : "hidden"} text-red-500 text-sm mb-1.5`}> Usernames must be between 3 and 30 characters in length. </span>
              <span className={`${(showErrUser || username === null || username.length < 3) ? "hidden" : "visible"} ${showInUse ? "text-red-500" : "text-green-500"} text-sm mb-1`}> {showInUse ? "This username is already in use." : "Congrats! This username is available!"} </span>
              <input
              className="px-2.5 py-1.5 background-input border-none rounded-2xl text-[#737577] mb-1.5"
              id="UsernameInputSignin"
              autoComplete="name"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              />
              <span className={`${showErrPass ? "visible" : "hidden"} text-red-500 text-sm`}> Passwords must be between 6 and 30 characters in length. </span>
              <input
              className="px-2.5 py-1.5 background-input border-none rounded-2xl text-[#737577] my-1.5"
              id="PasswordInputSignin"
              autoComplete="name"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              />
              <button
              className="text-center align-center mt-4 p-1.5 rounded-3xl seenit-orange text-white border-none h-[40px] cursor-pointer w-full"
              type="submit"
            >
              Create Account
            </button>
            </div>
          </div>
          <span className="text-xs px-12 mb-5">
            Not sure if you have the right info?{" "}
            <button
              className="text-blue-400 underline"
              onClick={(e) => {
                e.preventDefault();
                switchTabs(1);
              }}
            >
              Go back
            </button>
          </span>
        </form>
    )
}

export default CompleteSignup