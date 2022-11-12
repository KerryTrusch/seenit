import { useState, useEffect, useContext } from "react";
import React from "react";
import { getRepliedComments, createComment } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { UserContext } from "../../App";
interface CommentDetails {
  username: string;
  timestamp: number;
  body: string;
  upvotes: number;
  parentID: string;
  commentID: string;
  postID: string;
}
function Comment({
  username,
  timestamp,
  body,
  upvotes,
  parentID,
  commentID,
  postID,
}: CommentDetails) {
  const [childComments, setChildComments] = useState<object[]>([]);
  const [hideChildren, setHideChildren] = useState(false);
  const user = useContext<any>(UserContext);
  const [hideReply, setHideReply] = useState(true);
  const [thoughts, setThoughts] = useState("");
  const day = moment(timestamp);
  useEffect(() => {
    async function grabReplies() {
      const data = await getRepliedComments(commentID);
      setChildComments(data);
    }
    grabReplies();
  }, []);
  const postReply = () => {
    if (user !== null) {
      const timestamp = Date.now();
      const hash = timestamp.toString(36);
      createComment(user.email, thoughts, timestamp, commentID, postID, hash);
      setHideReply(true);
    }
  };
  return (
    <React.Fragment>
      <div className="flex flex-col w-full px-2 mb-2">
        <div className="flex">
          <span className="text-sm font-semibold">{username}</span>
          <div className="px-0.5">·</div>
          <span className="text-gray-500 text-sm">{day.fromNow()}</span>
        </div>
        <div className="text-black font-light my-2">{body}</div>
        <div className="flex text-gray-400 font-semibold">
          <FontAwesomeIcon
            className="hover:bg-gray-200 my-auto p-1 hover:cursor-pointer"
            icon={faArrowUp}
          />
          <span className="text-black text-sm my-auto">{upvotes}</span>
          <FontAwesomeIcon
            className="hover:bg-gray-200 my-auto p-1 mr-3 hover:cursor-pointer"
            icon={faArrowDown}
          />
          <div className="flex hover:bg-gray-200 hover:cursor-pointer" onClick={(e) => {setHideReply(false)}}>
            <FontAwesomeIcon className="my-auto" icon={faMessage} />
            <div className="my-auto pb-1 pl-1">Reply</div>
          </div>
        </div>
        <div className={`${!hideReply ? "visible" : "hidden"} px-8 w-full mt-8`}>
          <textarea
            className="px-4 py-2 resize-y rounded-t border border-gray-400 w-full focus:outline-none"
            placeholder="What are your thoughts?"
            onChange={(e) => {
              setThoughts(e.target.value);
            }}
          />
          <div className="bg-gray-300 p-1">
            <div className="flex">
                <button className=" ml-auto text-sm font-semibold text-red-500 px-5 py-0.5" onClick={(e) => {setHideReply(true)}}>
                    Cancel
                </button>
              <button
                className={`${
                  thoughts.length === 0 || user === null
                    ? "bg-gray-700/[0.4] hover:cursor-not-allowed"
                    : "bg-gray-700"
                } rounded-2xl text-sm font-semibold text-white px-5 py-0.5`}
                disabled={thoughts.length === 0 || user === null}
                onClick={postReply}
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
      {childComments.length > 0 && (
        <>
          <div className={`${hideChildren ? "hidden" : "visible"} flex`}>
            <button className="collapse-line ml-2"/>
            <div className="grow-1 pl-[0.5rem] w-full">
              {childComments.map((comment: any) => {
                return (
                  <div key={comment.commentID}>
                    <Comment
                      username={comment.user}
                      timestamp={comment.timestamp}
                      body={comment.body}
                      upvotes={comment.upvotes}
                      parentID={comment.parentID}
                      commentID={comment.commentID}
                      postID={postID}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
}

export default Comment;
