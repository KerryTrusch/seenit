import { useState } from "react";
import {
    faLink,
    faImage,
    faKeyboard,
  } from "@fortawesome/free-solid-svg-icons";
  import { createPost } from "../../../firebase";
import Icon from "../../../Shared/components/Icon";
import { useNavigate } from "react-router-dom";
interface CreationFormDetails {
    community: string | null;
    user: any;
}
const CreationForm = ({community, user}: CreationFormDetails) => {
  const [link, setLink] = useState(null);
  const [body, setBody] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [imagesrc, setImagesrc] = useState(null);
  const [postType, setPostType] = useState(1);
  const [titleCharacters, setTitleCharacter] = useState(0);
  const navigate = useNavigate();
  const handleCreatePost = (e: any) => {
    e.preventDefault();
    const timestamp = Date.now();
    const hash = timestamp.toString(36);
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
    navigate("/r/" + community + "/comments/" + hash);
  };

  return (
    <form
      onSubmit={(e) => {
        handleCreatePost(e);
      }}
    >
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
            <div className="flex my-auto mx-auto font-semibold">
              <Icon className="mr-2" icon={faKeyboard} />
              <span>Post</span>
            </div>
          </div>
          <div
            className={`${
              postType === 2
                ? "text-blue-600 border-b-blue-600"
                : "text-gray-500"
            } flex basis-1/3 py-2 border-b border-r hover:cursor-pointer hover:bg-blue-100 hover:cursor-not-allowed`}
            onClick={(e) => {
              //setPostType(2);
            }}
          >
            <div className="flex my-auto mx-auto font-semibold">
              <Icon className="mr-2" icon={faImage} />
              <span>Images & Video</span>
            </div>
          </div>
          <div
            className={`${
              postType === 3
                ? "text-blue-600 border-b-blue-600"
                : "text-gray-500"
            } flex basis-1/3 py-2 border-b border-r hover:cursor-pointer hover:bg-blue-100 hover:cursor-not-allowed`}
            onClick={(e) => {
              //setPostType(3);
            }}
          >
            <div className="flex mx-auto font-semibold my-auto">
              <Icon className="mr-2" icon={faLink} />
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
            disabled={
              community === null ||
              title === null ||
              (postType === 2 && imagesrc === null) ||
              (postType === 3 && link === null)
            }
          >
            Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreationForm;
