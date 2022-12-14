import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faMessage,
  faShare,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { upvotePost, downvotePost } from "../../firebase";
import { useState } from "react";
import moment from "moment";
import LoadedImage from "../../Shared/components/LoadedImage";
interface PostDetails {
  subreddit: string;
  user: string;
  upvotes: number;
  title: string;
  numComments: number;
  isFrontPage: boolean;
  hash: string;
  isEmbeded: boolean;
  imagehash: string;
  timestamp: number;
}
function ImagePost({
  subreddit,
  user,
  upvotes,
  title,
  numComments,
  isFrontPage,
  hash,
  isEmbeded,
  imagehash,
  timestamp
}: PostDetails) {
  const [upordown, setUpordown] = useState(0);
  const day = moment(timestamp);
  return (
    <div className="w-full mb-3">
      <div className={`${isEmbeded ? "rounded-t" : "rounded shadow hover:outline hover:outline-1 hover:outline-slate-400"} flex cursor-pointer`}>
        <div className="flex w-full">
          <div className={`${isEmbeded ? "bg-white" : "bg-[#f8f9fa]"} flex flex-col pt-2 h-full rounded-l px-1`}>
            <FontAwesomeIcon
              className={`${
                upordown === 1 ? "text-red-600" : ""
              } hover:text-red-300`}
              icon={faArrowUp}
              onClick={(e) => {
                upvotePost(hash);
                setUpordown(1);
              }}
            />
            <div className="font-bold text-xs py-1 mx-auto">{upvotes}</div>
            <FontAwesomeIcon
              className={`${
                upordown === -1 ? "text-blue-600" : ""
              } hover:text-blue-300`}
              icon={faArrowDown}
              onClick={(e) => {
                downvotePost(hash);
                setUpordown(-1);
              }}
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
              <Link
                to={`/r/${subreddit}`}
                className={`${
                  isFrontPage ? "visible" : "hidden"
                } text-black font-bold ml-1 mr-2 hover:underline`}
              >
                {`r/${subreddit}`}
              </Link>
              <div className="text-gray-500">
                Posted by
                <span className="hover:underline mr-2">{` u/${user} `}</span>{day.fromNow()}
              </div>
            </div>
            <div className="text-lg font-semibold mb-2">{title}</div>
            <LoadedImage externalHash={imagehash} className="mx-auto"/>
            {/*<div className={`${isEmbeded ? "visible" : "hidden"} text-md text-black mb-2`}>{body}</div>*/}
            <div className="flex text-gray-500">
              <Link
                to={`${
                  isFrontPage
                    ? "r/" + subreddit + "/comments/" + hash
                    : "comments/" + hash
                }`}
              >
                <div className="flex hover:bg-gray-200 rounded justify-center p-1.5">
                  <FontAwesomeIcon className="my-auto mr-1" icon={faMessage} />
                  <div className="text-xs">{numComments} Comments</div>
                </div>
              </Link>
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

export default ImagePost;
