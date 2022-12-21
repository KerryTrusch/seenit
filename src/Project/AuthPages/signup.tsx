  import { useState } from "react";
interface SignupDetails {
  switchTabs: any;
  email: string | null;
  setEmail: any;
}
function Signup({ switchTabs, email, setEmail }: SignupDetails) {
  const [showErrEmail, setShowErrEmail] = useState(false);

  function handleContinue(e: any) {
    e.preventDefault();
    if (!validateEmail()) {
      setShowErrEmail(true);
    } else {
      setShowErrEmail(false);
      switchTabs(2);
    }
  }
  const validateEmail = () => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
        <form
          className="mb-10"
          onSubmit={(e) => {
            handleContinue(e);
          }}
        >
          <div className="flex flex-col pt-16 px-10 text-center mb-4">
            <h2 className="m-0 mb-2.5 font-semibold text-2xl text-left">
              Sign Up
            </h2>
            <h5 className="m-0 mb-2.5 text-xs text-left font-medium">
              By continuing, you are setting up a Seenit account and agree to
              demo my site!
            </h5>
            <div className="border-b my-5" />
            <span className={`${showErrEmail ? "visible" : "hidden"} text-red-500 text-sm`}> Invalid email address. </span>
            <input
              className="px-2.5 py-1.5 background-input border-none rounded-2xl text-[#737577] mb-1.5"
              id="EmailInputSignin"
              autoComplete="name"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <button
              className="text-center align-center mt-4 p-1.5 rounded-3xl seenit-orange text-white border-none h-[40px] cursor-pointer w-full"
              type="submit"
            >
              Continue
            </button>
          </div>
          <span className="text-xs px-12 mb-5">
            Already a user?{" "}
            <button
              className="text-blue-400 underline"
              onClick={(e) => {
                e.preventDefault();
                switchTabs(0);
              }}
            >
              Login here
            </button>
          </span>
        </form>
  );
}

export default Signup;
