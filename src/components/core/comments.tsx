import { useState, useEffect, useContext } from "react";
import {
  loadCommentsFromPost,
  createComment,
  getSinglePost,
} from "../../firebase";
import TextPost from "./text-post";
import LinkPost from "./link-post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import CommunitySidebar from "./community-sidebar";
import Comment from "./comment";
import { UserContext } from "../../App";
interface CommentsDetails {
  show: boolean;
  hideModal: any;
  display: any;
  numUsers: number;
}
function Comments({ show, hideModal, display, numUsers }: CommentsDetails) {
  const [rootComments, setRootComments] = useState<object[]>([]);
  const user = useContext<any>(UserContext);
  const [post, setPost] = useState<any>({});
  const [thoughts, setThoughts] = useState("");
  const url = window.location.href;
  const spliturl = url.split("/");
  const hash = spliturl[6];
  useEffect(() => {
    async function grabComments() {
      const data = await loadCommentsFromPost(hash);
      const postData = await getSinglePost(hash);
      display();
      setRootComments(data);
      setPost(postData);
    }
    grabComments();
  }, []);
  const postRootComment = () => {
    if (user !== null) {
      const timestamp = Date.now();
      const hash = timestamp.toString(36);
      createComment(user.email, thoughts, timestamp, null, post.hash, hash);
    }
  };
  function renderSwitch() {
    switch (post.type) {
      case "text":
        return (
          <TextPost
            subreddit={post.communityName}
            user={post.author}
            upvotes={post.upvotes}
            title={post.postTitle}
            numComments={0}
            isFrontPage={false}
            key={post.hash}
            hash={post.hash}
            isEmbeded={true}
            body={post.postBody}
          />
        );
      case "link":
        return (
          <LinkPost
            subreddit={post.communityName}
            user={post.author}
            upvotes={post.upvotes}
            title={post.postTitle}
            numComments={0}
            isFrontPage={false}
            linksrc={post.linksrc}
            key={post.hash}
            hash={post.hash}
            isEmbeded={true}
          />
        );
      default:
        return (
          <LinkPost
            subreddit={post.communityName}
            user={post.author}
            upvotes={post.upvotes}
            title={post.postTitle}
            numComments={0}
            isFrontPage={false}
            linksrc={post.linksrc}
            key={post.hash}
            hash={post.hash}
            isEmbeded={true}
          />
        );
    }
  }
  return (
    <div
      className={`${
        show ? "block" : "hidden"
      } fixed top-0 left-0 w-full h-full z-10 bg-black/[0.6]`}
      onClick={hideModal}
    >
      <div
        className="flex flex-col fixed top-[45px] left-[50%] lg:min-w-[1280px] bg-[#dae0e6] rounded h-auto translate-x-[-50%]  md:min-w-[600px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-black h-10">
          <div className="flex text-white text-xs px-10 h-full">
            <div
              className="ml-auto hover:cursor-pointer my-auto"
              onClick={(e) => {
                hideModal();
              }}
            >
              <FontAwesomeIcon className="ml-auto" icon={faX} />
              <span className="ml-2">Close</span>
            </div>
          </div>
        </div>
        <div className="px-20 py-5">
          <div className="flex flex-col">
            <div className="flex">
              <div className="flex flex-col w-full bg-white rounded">
                {renderSwitch()}
                <div className="px-8 w-full mt-8">
                  <textarea
                    className="px-4 py-2 resize-y rounded-t border border-gray-400 w-full focus:outline-none"
                    placeholder="What are your thoughts?"
                    onChange={(e) => {
                      setThoughts(e.target.value);
                    }}
                  />
                  <div className="bg-gray-300 p-1">
                    <div className="flex">
                      <button
                        className={`${
                          thoughts.length === 0 || user === null
                            ? "bg-gray-700/[0.4] hover:cursor-not-allowed"
                            : "bg-gray-700"
                        } ml-auto rounded-2xl text-sm font-semibold text-white px-5 py-0.5`}
                        disabled={thoughts.length === 0 || user === null}
                        onClick={postRootComment}
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                  <div className="border-b my-8" />
                </div>
                {rootComments.map((comment: any) => {
                  return (
                    <div key={comment.commentID}>
                      <Comment
                        username={comment.user}
                        timestamp={comment.timestamp}
                        body={comment.body}
                        upvotes={comment.upvotes}
                        parentID={comment.parentID}
                        commentID={comment.commentID}
                        postID={post.hash}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="hidden lg:block flex flex-col ml-4">
                <CommunitySidebar
                  description={post.description}
                  numUsers={numUsers}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comments;
