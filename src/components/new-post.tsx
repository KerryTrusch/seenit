import { useState, useEffect, useContext } from "react";
import { getCommunityNames } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronDown,
  faLink,
  faImage,
  faKeyboard,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../App";
import { createPost } from "../firebase";
function Submit() {
  const user = useContext<any>(UserContext);
  //input value
  const [value, setValue] = useState("");
  //community names for dropdown
  const [names, setNames] = useState<any>([]);
  //whether input is selected or not
  const [selected, setSelected] = useState(false);
  //current community name
  const [community, setCommunity] = useState<string | null>(null);
  const [link, setLink] = useState(null);
  const [body, setBody] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [imagesrc, setImagesrc] = useState(null);
  const [postType, setPostType] = useState(1);
  const [titleCharacters, setTitleCharacter] = useState(0);
  function filterFunction() {
    let input, filter, ul, li, a, i, div;
    input = document.getElementById("SubmitDropdown");
    filter = value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div!.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      let txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }
  const setShow = () => {
    setSelected(true);
  };
  const setHide = () => {
    setSelected(false);
  };
  const flipHide = () => {
    setSelected(!selected);
  }
  const selectElement = (community: string) => {
    const input = (document.getElementById("SubmitDropdown") as HTMLInputElement);
    input.value = 'r/'+community;
    setCommunity(community);
    setHide();
  }
  useEffect(() => {
    async function findNames() {
      const data = await getCommunityNames();
      setNames(data);
    }
    findNames();
  }, []);

  const handleCreatePost = (e: any) => {
    e.preventDefault();
    const timestamp = Date.now();
    const hash = timestamp.toString(36);
    console.log(hash);
    switch (postType) {
      case 1:
        createPost(
          title,
          community,
          null,
          null,
          body,
          "text",
          timestamp,
          user.email,
          hash
        );
        break;
      case 2:
        createPost(
          title,
          community,
          null,
          imagesrc,
          null,
          "image",
          timestamp,
          user.email,
          hash
        );
        break;
      case 3:
        createPost(
          title,
          community,
          link,
          null,
          null,
          "link",
          timestamp,
          user.email,
          hash
        );
        break;
      default:
        throw new Error("Post type is not valid.");
    }
  };
  return (
    <div className="min-h-screen w-full bg-[#dae0e6]">
      <div className="flex p-3 h-full">
        <div className="w-[640px] flex flex-col justify-center mx-auto">
          <div className="mb-2 text-lg text-black font-semibold">
            Create a post
          </div>
          <div className="border-b border-white my-3" />
          <div className="relative mb-3">
            <div className="flex border rounded bg-white p-2 max-w-[50%]">
              <FontAwesomeIcon
                className="my-auto text-gray-400 mr-4"
                icon={faSearch}
              />
              <input
                className="border-none w-full focus:outline-none text-gray-500"
                placeholder="Choose a community"
                id="SubmitDropdown"
                onKeyUp={filterFunction}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                onClick={setShow}
              />
              <FontAwesomeIcon
                className="my-auto text-gray-400 cursor-pointer"
                icon={faChevronDown}
                onClick={flipHide}
              />
            </div>
            <div className={`${selected ? "visible" : "hidden"} absolute w-[50%]`}>
              <div className="flex flex-col rounded" id="myDropdown">
                {names.map((name: string) => {
                  return (
                    <a className="bg-white w-full flex p-2" key={name} href={`#` + name} onClick={(e) => {selectElement(name)}}>
                        <img className="rounded-full h-8" src={`/default.png`} alt={`profile`}/>
                        <span className="my-auto mx-3">{name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <form onSubmit={(e) => {handleCreatePost(e)}}>
            <div className="flex flex-col rounded bg-white">
              <div className="flex select-none">
                <div
                  className={`${
                    postType === 1
                      ? "text-blue-600 border-b-blue-600"
                      : "text-gray-500"
                  } flex basis-1/3 py-2 border-b border-r hover:cursor-pointer hover:bg-blue-100`}
                  onClick={(e) => {
                    setPostType(1);
                  }}
                >
                  <div className="mx-auto font-semibold">
                    <FontAwesomeIcon
                      className="my-auto mr-2"
                      icon={faKeyboard}
                    />
                    <span>Post</span>
                  </div>
                </div>
                <div
                  className={`${
                    postType === 2
                      ? "text-blue-600 border-b-blue-600"
                      : "text-gray-500"
                  } flex basis-1/3 py-2 border-b border-r hover:cursor-pointer hover:bg-blue-100`}
                  onClick={(e) => {
                    setPostType(2);
                  }}
                >
                  <div className="mx-auto font-semibold">
                    <FontAwesomeIcon className="my-auto mr-2" icon={faImage} />
                    <span>Images & Video</span>
                  </div>
                </div>
                <div
                  className={`${
                    postType === 3
                      ? "text-blue-600 border-b-blue-600"
                      : "text-gray-500"
                  } flex basis-1/3 py-2 border-b border-r hover:cursor-pointer hover:bg-blue-100`}
                  onClick={(e) => {
                    setPostType(3);
                  }}
                >
                  <div className="mx-auto font-semibold">
                    <FontAwesomeIcon className="my-auto mr-2" icon={faLink} />
                    <span>Link</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-3 w-full">
                <div className="rounded flex border border-gray-300 my-3">
                  <input
                    className="w-full rounded p-2 border-none focus:outline-none"
                    placeholder="Title"
                    onChange={(e) => {
                      setTitleCharacter(e.target.value.length);
                      setTitle(e.target.value);
                    }}
                  />
                  <span className="text-xs font-semibold text-gray-500 my-auto pr-2">
                    {titleCharacters}/300
                  </span>
                </div>
                <textarea
                  className="resize-y rounded border border-gray-300 w-full p-2 mb-4"
                  onChange={(e) => {
                    setBody(e.target.value);
                  }}
                  placeholder="Text (optional)"
                />
                <div className="border-b text-gray-300 mb-2"></div>
                <button
                  className={`${
                    community === null ||
                    title === null ||
                    (postType === 2 && imagesrc === null) ||
                    (postType === 3 && link === null)
                      ? "bg-gray-600/[0.5] hover:cursor-not-allowed"
                      : "bg-gray-600"
                  } mb-2 ml-auto rounded-2xl py-1 px-4 text-white font-semibold`}
                  type="submit"
                  disabled={community === null ||
                    title === null ||
                    (postType === 2 && imagesrc === null) ||
                    (postType === 3 && link === null)}
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Submit;
