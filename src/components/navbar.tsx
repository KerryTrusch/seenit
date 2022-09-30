import { Link } from "react-router-dom";
function navbar() {
  return (
    <div className="flex bg-white w-full p-2 ml-2">
      <div className="mr-auto">
        <img className="h-auto w-1/3" src={`/seenit.png`} alt="logo" />
      </div>
      <div className="flex ml-auto">
          <Link className="border border-blue-400 rounded-2xl px-8 py-0.5 pb-1.5 cursor-pointer hover:bg-[#faf7f7] text-sm font-bold text-blue-500" to={`/signup`}>
            Sign Up
          </Link>
          <Link className="hover:bg-blue-500/75 px-8 pb-1.5 py-0.5 rounded-2xl mx-3 bg-blue-500 text-white m-auto cursor-pointer text-sm font-bold" to={`/login`}>
            Log In
          </Link>
      </div>
    </div>
  );
}

export default navbar;