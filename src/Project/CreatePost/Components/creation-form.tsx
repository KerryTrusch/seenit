import { useState } from "react";
import { faLink, faImage, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { createPost } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import CreationFormHeaderButton from "./creation-form-header-button";
import CreationFormSubmit from "./creation-form-submit";
import CreationFormBody from "./creation-form-body";
interface CreationFormDetails {
  community: string | null;
  user: any;
}
const CreationForm = ({ community, user }: CreationFormDetails) => {
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
          <CreationFormHeaderButton
            id={1}
            name={"Text"}
            icon={faKeyboard}
            currentPostID={postType}
            onClick={setPostType}
          />
          <CreationFormHeaderButton
            id={2}
            name={"Images & Video"}
            icon={faImage}
            currentPostID={postType}
            onClick={setPostType}
          />
          <CreationFormHeaderButton
            id={3}
            name={"Link"}
            icon={faLink}
            currentPostID={postType}
            onClick={setPostType}
          />
        </div>
        <div className="flex flex-col p-3 w-full">
          <CreationFormBody postType={postType} setBody={setBody} setTitle={setTitle} setTitleCharacter={setTitleCharacter} titleCharacters={titleCharacters} setImagesrc={setImagesrc} setLink={setLink} />
          <div className="border-b text-gray-300 mb-2"></div>
          <CreationFormSubmit
            disabled={
              community === null ||
              title === null ||
              (postType === 2 && imagesrc === null) ||
              (postType === 3 && link === null)
            }
          />
        </div>
      </div>
    </form>
  );
};

export default CreationForm;
