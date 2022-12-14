import Sortbar from "./Sidebar/sortbar";
import CommunitySidebar from "./Sidebar/community-sidebar";
import { getCommunityData, getTotalUsersInCommunity, getPostsFromCommunity } from "../firebase";
import {useState, useEffect, useContext} from 'react';
import { UserContext } from "../App";
import CreatePostBar from "./CreateCommunity/create-post-bar";
import { Routes, Route } from "react-router-dom";
import Comments from './Post/Comments/comments';
import { postsToJSXArray } from "../Shared/utils/renderPost";
import Spinner from "../Shared/components/Spinner";
function SeenitPage() {
    const [pageData, setPageData] = useState<any | null>({});
    const [numUsers, setNumUsers] = useState<number>(0);
    const [posts, setPosts] = useState<object[]>([]);
    const [showPost, setShowPost] = useState(false);
    const user = useContext(UserContext);
    const url = window.location.href;
    const splitUrl = url.split("/r/");
    const name = splitUrl[1].split("/")[0];
    useEffect(() => {
        async function pullData() {
            const data = await getCommunityData(name);
            setPageData(data);
            const num = await getTotalUsersInCommunity(name);
            setNumUsers(num);
            const fetchedPosts = await getPostsFromCommunity(name);
            setPosts(fetchedPosts);
        }
        pullData();
    }, [])
    if (pageData === null) {
        return (
            <div>
                404
            </div>
        )
    }
    const hidePost= () => {
      setShowPost(false);
      window.location.href = '../';
    }
    const showPostOnClick = () => {
      setShowPost(true);
    }
    return (
        <div className="min-h-screen w-full bg-[#dae0e6]">
          <div className="bg-blue-500 h-20"/>
          <div className="bg-white h-20">
            <div className="flex w-[948px] mx-auto">
              <img className="rounded-full outline outline-white mt-[-10px] h-16" src={`/default.png`} alt="logo" />
              <div className="flex flex-col ml-4">
                <div className="flex">
                  <h2 className="font-bold text-3xl p-1 mr-7">{name}</h2>
                  <button className={`${user === null ? "hidden" : "visible"} border border-blue-600 text-blue-600 rounded-2xl px-6 my-2 font-bold`}>Join</button>
                </div>
                <span className="text-sm text-gray-400 font-semibold p-1">r/{name}</span>
              </div>
            </div>
          </div>
          <div className="flex lg:p-3 h-full w-full">
            <div className="flex lg:w-auto lg:mx-auto w-full">
              <div className="w-full lg:w-[640px] flex flex-col justify-center lg:mx-7">
                <CreatePostBar />
                <Sortbar posts={posts} setPosts={setPosts} />
                {posts.length === 0 && <Spinner className="mx-auto" size={64} />}
                {postsToJSXArray(posts, false)}
              </div>
              <div className="hidden lg:block flex flex-col">
                <CommunitySidebar description={pageData.description} numUsers={numUsers}/>
              </div>
            </div>
          </div>
          <Routes>
            <Route path="comments/:id" element={<Comments show={showPost} hideModal={hidePost} display={showPostOnClick} numUsers={numUsers}/>} />
          </Routes>
        </div>
      );
}

export default SeenitPage;