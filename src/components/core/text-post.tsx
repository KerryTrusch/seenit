import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faMessage,
  faShare,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
interface PostDetails {
  subreddit: string;
  user: string;
  upvotes: number;
  title: string;
  numComments: number;
  isFrontPage: boolean;
}
function TextPost({
  subreddit,
  user,
  upvotes,
  title,
  numComments,
  isFrontPage
}: PostDetails) {
  return (
    <div className="w-full h-full mb-3">
      <div className="rounded shadow flex cursor-pointer hover:outline hover:outline-1 hover:outline-slate-400">
        <div className="flex w-full">
          <div className="flex flex-col bg-[#f8f9fa] pt-2 h-full rounded-l px-1">
            <FontAwesomeIcon className="hover:text-red-300" icon={faArrowUp} />
            <div className="font-bold text-xs py-1">{upvotes}</div>
            <FontAwesomeIcon
              className="hover:text-blue-300"
              icon={faArrowDown}
            />
          </div>
          <div className="flex flex-col bg-white w-full p-2">
            <div className="flex text-xs mb-2">
              <img
                className={`rounded-[99px] h-[18px] w-[18px] ${
                  isFrontPage ? "visible" : "hidden"
                }`}
                alt="Subseenit"
                src={`/default.png`}
              />
              <Link to={`/r/${subreddit}`} className="text-black font-bold ml-1 hover:underline">
                {`r/${subreddit}`}
              </Link>
              <div className="text-gray-500  ml-2">
                Posted by
                <span className="hover:underline">{` u/${user} `}</span>7 hours
                ago
              </div>
            </div>
            <div className="text-lg font-semibold mb-2">{title}</div>
            <div className="flex text-gray-500">
              <div className="flex hover:bg-gray-200 rounded justify-center p-1.5">
                <FontAwesomeIcon className="my-auto mr-1" icon={faMessage} />
                <div className="text-xs">{numComments} Comments</div>
              </div>
              <div className="flex hover:bg-gray-200 rounded justify-center p-1.5">
                <FontAwesomeIcon className="my-auto mr-1" icon={faShare} />
                <div className="text-xs">Share</div>
              </div>
              <div className="flex hover:bg-gray-200 rounded justify-center p-1.5">
                <FontAwesomeIcon className="my-auto mr-1" icon={faBookmark} />
                <div className="text-xs">Save</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextPost;
