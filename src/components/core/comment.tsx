import { useState, useEffect } from "react";
import React from "react";
import { getRepliedComments } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
interface CommentDetails {
  username: string;
  timestamp: number;
  body: string;
  upvotes: number;
  parentID: string;
  commentID: string;
}
function Comment({
  username,
  timestamp,
  body,
  upvotes,
  parentID,
  commentID
}: CommentDetails) {
  const [childComments, setChildComments] = useState<object[]>([]);
  const [hideChildren, setHideChildren] = useState(false);
  const day = moment(timestamp);
  useEffect(() => {
    async function grabReplies() {
      const data = await getRepliedComments();
      setChildComments(data);
    }
  });
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
          <FontAwesomeIcon className="hover:bg-gray-200 my-auto p-1 hover:cursor-pointer" icon={faArrowUp} />
          <span className="text-black text-sm my-auto">{upvotes}</span>
          <FontAwesomeIcon className="hover:bg-gray-200 my-auto p-1 mr-3 hover:cursor-pointer" icon={faArrowDown} />
          <div className="flex hover:bg-gray-200 hover:cursor-pointer">
            <FontAwesomeIcon className="my-auto" icon={faMessage} />
            <div className="my-auto pb-1 pl-1">Reply</div>
          </div>
        </div>
      </div>
      {childComments.length > 0 && (
        <>
          <div>
            <button />
            <div>
              {childComments.map((comment: any) => {
                return (
                  <div>
                    <Comment
                      username={comment.user}
                      timestamp={comment.timestamp}
                      body={comment.body}
                      upvotes={comment.upvotes}
                      parentID={comment.parentID}
                      commentID={comment.commentID}
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
