import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faMessage,
  faShare,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
interface PostDetails {
  subreddit: string;
  user: string;
  upvotes: number;
  title: string;
  numComments: number;
  isFrontPage: boolean;
  linksrc: string;
}
type IPreview = {
  img: string;
  description: string;
};
function ImagePost({
  subreddit,
  user,
  upvotes,
  title,
  numComments,
  isFrontPage,
  linksrc,
}: PostDetails) {
  return (
    <div className="w-full h-full mb-2">
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
              <div className="text-black font-bold ml-1 hover:underline">
                {`r/${subreddit}`}
              </div>
              <div className="text-gray-500  ml-2">
                Posted by
                <span className="hover:underline">{` u/${user} `}</span>7 hours
                ago
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col">
                <div className="text-lg font-semibold">{title}</div>
                <a
                  href={linksrc}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-600 mb-3 max-w-[75%] text-ellipsis whitespace-nowrap overflow-hidden hover:underline"
                >
                  {linksrc}
                </a>
              </div>
              <a
                href={linksrc}
                target="_blank"
                rel="noreferrer"
                className="bg-white p-2 ml-auto"
              >
                <img
                  className="rounded h-[100px] w-[150px]"
                  src={`/linkimagenotfound.png`}
                  alt="link preview"
                />
              </a>
            </div>
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

export default ImagePost;
