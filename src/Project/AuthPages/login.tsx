import { useState } from "react";
interface LoginDetails {
  setUser: any;
  switchTabs: any;
  login: any;
  validateEmail: () => RegExpMatchArray | null;
  validatePassword: () => boolean;
  setEmail: any;
  setPassword: any;
}
function Login({ setUser, switchTabs, login, validateEmail, validatePassword, setEmail, setPassword }: LoginDetails) {
  const [showErrEmail, setShowErrEmail] = useState(false);
  const [showErrPass, setShowErrPass] = useState(false);
  async function handleLogin(e: any) {
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
      let user = await login();
      localStorage.setItem("uid", user.uid);
      setUser(user);
    }
  }

  return (
        <form
          className="mb-10"
          onSubmit={(e) => {
            handleLogin(e);
          }}
        >
          <div className="flex flex-col pt-16 px-10 text-center mb-4">
            <h2 className="m-0 mb-2.5 font-semibold text-2xl text-left">
              Log In
            </h2>
            <h5 className="m-0 mb-2.5 text-xs text-left font-medium">
              By continuing, you are setting up a Seenit account and agree to
              demo my site!
            </h5>
            <div className="border-b my-5" />
            <span
              className={`${
                showErrEmail ? "visible" : "hidden"
              } text-red-500 text-sm`}
            >
              {" "}
              Invalid email address.{" "}
            </span>
            <input
              className="px-4 py-2.5 background-input border-none rounded-3xl placeholder:text-[#737577] mb-1.5"
              id="EmailInputLogin"
              autoComplete="name"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <span
              className={`${
                showErrPass ? "visible" : "hidden"
              } text-red-500 text-sm`}
            >
              {" "}
              Passwords must be between 6 and 30 characters in length.{" "}
            </span>
            <input
              className="px-4 py-2.5 background-input border-none rounded-3xl placeholder:text-[#737577] my-1.5"
              id="PasswordInputLogin"
              autoComplete="name"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              className="text-center align-center mt-4 p-1.5 rounded-3xl seenit-orange text-white border-none h-[40px] cursor-pointer w-full"
              type="submit"
            >
              Continue
            </button>
          </div>
          <span className="text-xs px-12">
            Don't have an account?{" "}
            <button
              className="text-blue-400 underline"
              onClick={(e) => {
                e.preventDefault();
                switchTabs(1);
              }}
            >
              Sign up here
            </button>
          </span>
        </form>
  );
}

export default Login;
