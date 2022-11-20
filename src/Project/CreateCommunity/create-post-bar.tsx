import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faLink } from "@fortawesome/free-solid-svg-icons";
const CreatePostBar = () => {
  return (
    <div className="shadow bg-white rounded mb-5">
      <div className="py-0.5 flex">
        <img className="mr-2 h-12 rounded-full" src={`/createpostpic.png`} alt="create post" />
        <Link className="my-auto w-[80%]" to={`/submit`}>
          <input
            className="background-input rounded text-sm p-2 shadow-sm w-full"
            placeholder="Create Post"
          />
        </Link>
        <FontAwesomeIcon className="my-auto text-gray-400 mr-2 ml-5" icon={faImage} />
        <FontAwesomeIcon className="my-auto text-gray-400 mx-1.5" icon={faLink} />
      </div>
    </div>
  );
}

export default CreatePostBar;
