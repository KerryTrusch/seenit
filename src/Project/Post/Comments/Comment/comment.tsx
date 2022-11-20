import { useState, useEffect, useContext } from "react";
import React from "react";
import { getRepliedComments, createComment } from "../../../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { UserContext } from "../../../../App";
import BodyForm from "../BodyForm";
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
  const postReply = async () => {
    if (user !== null) {
      const timestamp = Date.now();
      const hash = timestamp.toString(36);
      await createComment(user.email, thoughts, timestamp, commentID, postID, hash);
      setHideReply(true);
      window.location.reload();
    }
  };

  const hideReplyForm = () => {
    setHideReply(true);
  }
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
          <BodyForm 
          value={thoughts}
          onChange={setThoughts}
          isWorking={false}
          onSubmit={postReply}
          onCancel={hideReplyForm}
          disabled={user === null || thoughts.length === 0}
          />
        </div>
      </div>
      {childComments.length > 0 && (
        <>
          <div className={`${hideChildren ? "hidden" : "visible"} flex`}>
            <button className="collapse-line ml-2" onClick={() => setHideChildren(true)}/>
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
