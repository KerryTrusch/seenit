import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faUser } from "@fortawesome/free-solid-svg-icons";
import { createCommunity } from "../../firebase";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
interface CommunityDetails {
  show: boolean;
  closeModal: any;
}

function CommunityModal({ closeModal, show }: CommunityDetails) {
  //Use different types when I am at the point of having a restricted and private seenitoo type
  //const [type, setType] = useState(1);
  const [name, setName] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const navigate = useNavigate();
  const user = useContext<any | null>(UserContext);
  const handleCreation = (e: any) => {
    e.preventDefault();
    createCommunity(name, user.email);
    closeModal();
    navigate("/r/"+name, {replace: true});
  };
  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } fixed top-0 left-0 w-full h-full z-10 bg-black/[0.6]`}
    >
      <div
        className="flex flex-col fixed top-[50%] left-[50%] bg-white rounded h-auto translate-x-[-50%] translate-y-[-50%] p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex">
          <span className="font-semibold"> Create a community</span>
          <FontAwesomeIcon
            className="ml-auto cursor-pointer text-gray-500"
            icon={faX}
            onClick={closeModal}
          />
        </div>
        <div className="border-b my-5" />
        <span className="font-semibold"> Name </span>
        <small className="text-gray-400 text-xs">
          {" "}
          Community names including capitalizaiton cannot be changed.{" "}
        </small>
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            handleCreation(e);
          }}
        >
          <div
            className={`${
              inputFocus
                ? "outline outline-[2px] outline-blue-600"
                : "outline-none"
            } flex border border-gray-300 rounded mt-4`}
          >
            <span className="pl-2 my-auto text-gray-400">r/</span>
            <input
              className="rounded-r w-full p-1 border-1 border-gray-300 border-l-0 focus:outline-none"
              id="communityNameInput"
              onChange={(e) => {
                setName(e.target.value);
              }}
              onFocus={(e) => {
                setInputFocus(true);
              }}
              onBlur={(e) => {
                setInputFocus(false);
              }}
              onKeyDown={(evt) =>
                name.length === 21 &&
                evt.key !== "Backspace" &&
                evt.preventDefault()
              }
            />
          </div>
          <span
            className={`${
              name.length === 21 ? "text-red-400" : "text-gray-400"
            } text-xs mt-3`}
          >
            {21 - name.length} characters remaining
          </span>
          <span
            className={`${
              name.length < 3 && name.length > 0 && !inputFocus
                ? "visible"
                : "hidden"
            } text-red-400 text-xs`}
          >
            Community names must be between 3 and 21 characters
          </span>
          <span
            className={`${
              name.indexOf(" ") >= 0 ? "visible" : "hidden"
            } text-red-400 text-xs`}
          >
            Community names must not contain spaces
          </span>
          <span className="font-semibold mt-6">Community type</span>
          <label className="text-sm font-medium mt-2">
            <input
              type="radio"
              id="PublicRadio"
            />
            <FontAwesomeIcon className="px-2 text-gray-400" icon={faUser} />
            Public{" "}
            <span className="text-xs text-gray-400 font-normal">
              Anyone can view, post, and comment to this community
            </span>
          </label>
          <div className="mx-[-16px] mb-[-16px] mt-4">
            <div className="w-full rounded-b bg-gray-200 p-4">
              <div className="flex">
                <button
                  className="ml-auto mr-2 border border-blue-500 text-blue-500 rounded-3xl px-3 py-1 font-bold"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button className="bg-blue-500 text-white rounded-3xl px-3 py-1 font-bold">
                  Create Community
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommunityModal;
